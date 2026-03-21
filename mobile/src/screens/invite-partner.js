import { Share } from '@capacitor/share'
import { Haptics, ImpactStyle } from '@capacitor/haptics'
import { navigate, state } from '../main.js'
import { generateInviteCode, listenForPartnerLink, linkWithCode } from '../firebase/partner.js'
import { showToast } from '../components/toast.js'

export async function renderInvitePartner(el) {
  el.innerHTML = `
    <div class="invite-wrap pt-safe pb-safe">
      <!-- Top -->
      <div class="invite-header">
        <div class="invite-icon">☽</div>
        <h2 class="invite-title">Invite your partner</h2>
        <p class="invite-sub">Share your invite code. Once they join, you'll be connected — and can leave notes on each other's home screen.</p>
      </div>

      <!-- Code card -->
      <div class="code-card" id="code-card">
        <div class="spinner" style="margin:24px auto"></div>
      </div>

      <!-- Actions -->
      <div class="invite-actions">
        <button id="btn-share" class="btn btn-primary btn-full">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="18" height="18">
            <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/>
            <polyline points="16 6 12 2 8 6"/>
            <line x1="12" y1="2" x2="12" y2="15"/>
          </svg>
          Share invite link
        </button>
        <button id="btn-copy" class="btn btn-ghost btn-full">Copy code</button>
      </div>

      <!-- Divider -->
      <div class="divider"></div>

      <!-- Enter partner code -->
      <div class="enter-section">
        <p class="section-label">Have a code from your partner?</p>
        <div class="enter-row">
          <input id="partner-code-input" class="input-field" placeholder="e.g. MOON-7842"
            maxlength="12" autocapitalize="characters" autocomplete="off" spellcheck="false" />
          <button id="btn-join" class="btn btn-primary" style="padding:14px 20px;flex-shrink:0">Join</button>
        </div>
      </div>

      <!-- Waiting indicator (shown after sharing) -->
      <div id="waiting-row" class="waiting-row" style="display:none">
        <div class="pulse-dot"></div>
        <span>Waiting for your partner to join…</span>
      </div>
    </div>
  `

  injectStyles()

  // Generate + display invite code
  let inviteCode = ''
  try {
    inviteCode = await generateInviteCode(state.user.uid)
    el.querySelector('#code-card').innerHTML = `
      <p class="code-label">Your invite code</p>
      <p class="code-text" id="code-display">${inviteCode}</p>
      <p class="code-hint">Valid for 48 hours</p>
    `
  } catch {
    el.querySelector('#code-card').innerHTML = `<p style="color:var(--text-muted);text-align:center">Couldn't generate code — check your connection</p>`
  }

  bindEvents(el, inviteCode)

  // Listen for partner accepting invite
  listenForPartnerLink(state.user.uid, (partnerId) => {
    state.partner = { uid: partnerId }
    showToast('✦ Partner connected!')
    setTimeout(() => navigate('feed'), 1000)
  })
}

function bindEvents(el, inviteCode) {
  const shareBtn       = el.querySelector('#btn-share')
  const copyBtn        = el.querySelector('#btn-copy')
  const joinBtn        = el.querySelector('#btn-join')
  const partnerInput   = el.querySelector('#partner-code-input')
  const waitingRow     = el.querySelector('#waiting-row')

  shareBtn.addEventListener('click', async () => {
    try {
      await Haptics.impact({ style: ImpactStyle.Light })
    } catch {}

    const deepLink = `https://sacredpath.app/join?code=${inviteCode}`
    try {
      await Share.share({
        title: 'Join me on Sacred Path',
        text: `I'm inviting you to Sacred Path — a space for us. Use my code: ${inviteCode}`,
        url: deepLink,
        dialogTitle: 'Invite your partner',
      })
      waitingRow.style.display = 'flex'
    } catch (err) {
      if (err.message !== 'Share canceled') showToast('Could not open share sheet')
    }
  })

  copyBtn.addEventListener('click', async () => {
    if (!inviteCode) return
    try {
      await navigator.clipboard.writeText(inviteCode)
      showToast('Code copied!')
      await Haptics.impact({ style: ImpactStyle.Light })
    } catch {
      showToast('Code: ' + inviteCode)
    }
  })

  joinBtn.addEventListener('click', async () => {
    const code = partnerInput.value.trim().toUpperCase()
    if (!code) { showToast('Enter your partner\'s code'); return }

    joinBtn.disabled = true
    joinBtn.textContent = '...'

    try {
      await linkWithCode(state.user.uid, code)
      showToast('✦ Connected!')
      setTimeout(() => navigate('feed'), 800)
    } catch (err) {
      showToast(err.message || 'Invalid code')
      joinBtn.disabled = false
      joinBtn.textContent = 'Join'
    }
  })
}

function injectStyles() {
  if (document.getElementById('invite-css')) return
  const s = document.createElement('style')
  s.id = 'invite-css'
  s.textContent = `
    .invite-wrap {
      flex: 1; display: flex; flex-direction: column;
      padding: 0 24px; overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
    .invite-header {
      text-align: center; padding: 40px 0 28px;
    }
    .invite-icon {
      font-size: 48px; line-height: 1; margin-bottom: 14px;
    }
    .invite-title {
      font-size: 26px; font-weight: 700;
      background: linear-gradient(135deg, var(--lavender), var(--rose));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      margin-bottom: 10px;
    }
    .invite-sub {
      font-size: 14px; color: var(--text-muted);
      line-height: 1.6; max-width: 300px; margin: 0 auto;
    }
    .code-card {
      background: var(--bg-card);
      border: 1.5px solid var(--border);
      border-radius: 20px; padding: 24px;
      text-align: center; margin-bottom: 20px;
    }
    .code-label {
      font-size: 11px; font-weight: 600; letter-spacing: 0.08em;
      text-transform: uppercase; color: var(--text-muted); margin-bottom: 10px;
    }
    .code-text {
      font-size: 34px; font-weight: 800; letter-spacing: 0.12em;
      background: linear-gradient(90deg, var(--purple), var(--rose));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      font-variant-numeric: tabular-nums;
    }
    .code-hint {
      font-size: 12px; color: var(--text-muted); margin-top: 8px;
    }
    .invite-actions {
      display: flex; flex-direction: column; gap: 10px; margin-bottom: 4px;
    }
    .enter-section { display: flex; flex-direction: column; gap: 10px; }
    .enter-row { display: flex; gap: 10px; }
    .waiting-row {
      margin-top: 16px; display: flex; align-items: center; gap: 10px;
      font-size: 14px; color: var(--text-muted);
    }
    .pulse-dot {
      width: 10px; height: 10px; border-radius: 50%;
      background: var(--purple); flex-shrink: 0;
      animation: pulse 1.4s ease infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50%       { opacity: 0.4; transform: scale(0.7); }
    }
  `
  document.head.appendChild(s)
}
