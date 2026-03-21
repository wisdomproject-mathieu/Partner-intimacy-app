import { Haptics, ImpactStyle } from '@capacitor/haptics'
import { navigate, state } from '../main.js'
import { sendNote } from '../firebase/notes.js'
import { showToast } from '../components/toast.js'
import { DEMO_MODE } from '../firebase/demo.js'

const GLYPHS = ['✦', '☽', 'ॐ', '❧', '⊹', '♡', '✿', '☯', '⌖', '⋆', '✺', '❁', '☀', '♾', '✙', '⚘', '❋', '◈']

const COLORS = [
  { key: 'rose',   bg: '#3b1128', swatch: '#f472b6' },
  { key: 'purple', bg: '#1e0f3a', swatch: '#c084fc' },
  { key: 'gold',   bg: '#2d1f04', swatch: '#fbbf24' },
  { key: 'teal',   bg: '#052e2e', swatch: '#2dd4bf' },
  { key: 'indigo', bg: '#0f0c3b', swatch: '#818cf8' },
]

export function renderCompose(el, params = {}) {
  let selectedGlyph = params.glyph || '✦'
  let selectedColor = params.color || 'purple'

  el.innerHTML = `
    <div class="compose-wrap pt-safe pb-safe">
      <!-- Nav bar -->
      <div class="compose-nav">
        <button class="compose-cancel" id="cmp-cancel">Cancel</button>
        <h2 class="compose-nav-title">New note</h2>
        <button class="compose-send" id="cmp-send">
          Send
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>

      <!-- Preview card -->
      <div class="preview-card" id="cmp-preview" style="background:${COLORS.find(c=>c.key===selectedColor)?.bg}">
        <span class="preview-glyph" id="cmp-preview-glyph">${selectedGlyph}</span>
        <p class="preview-text" id="cmp-preview-text">Your message will appear here…</p>
        <p class="preview-ts">✦ now</p>
      </div>

      <!-- Textarea -->
      <div class="compose-field-wrap">
        <label class="section-label">Message</label>
        <textarea id="cmp-text" class="compose-textarea" maxlength="280"
          placeholder="Write something tender…" rows="4"></textarea>
        <p class="char-count"><span id="cmp-count">0</span>/280</p>
      </div>

      <!-- Color picker -->
      <div class="compose-section">
        <p class="section-label">Background Color</p>
        <div class="color-row" id="cmp-colors">
          ${COLORS.map(c => `
            <button class="color-swatch ${c.key === selectedColor ? 'selected' : ''}"
              data-key="${c.key}" style="background:${c.swatch}"
              aria-label="${c.key}"></button>
          `).join('')}
        </div>
      </div>

      <!-- Glyph picker -->
      <div class="compose-section">
        <p class="section-label">Choose Symbol</p>
        <div class="glyph-grid" id="cmp-glyphs">
          ${GLYPHS.map(g => `
            <button class="glyph-btn ${g === selectedGlyph ? 'selected' : ''}"
              data-glyph="${g}">${g}</button>
          `).join('')}
        </div>
      </div>
    </div>
  `

  injectStyles()
  bindEvents(el, () => selectedGlyph, () => selectedColor,
    (g) => { selectedGlyph = g }, (c) => { selectedColor = c })
}

function bindEvents(el, getGlyph, getColor, setGlyph, setColor) {
  const textarea     = el.querySelector('#cmp-text')
  const previewText  = el.querySelector('#cmp-preview-text')
  const previewGlyph = el.querySelector('#cmp-preview-glyph')
  const previewCard  = el.querySelector('#cmp-preview')
  const charCount    = el.querySelector('#cmp-count')
  const sendBtn      = el.querySelector('#cmp-send')
  const cancelBtn    = el.querySelector('#cmp-cancel')

  // Textarea → preview
  textarea.addEventListener('input', () => {
    const val = textarea.value
    previewText.textContent = val || 'Your message will appear here…'
    charCount.textContent = val.length
  })

  // Color swatches
  el.querySelectorAll('.color-swatch').forEach(sw => {
    sw.addEventListener('click', async () => {
      setColor(sw.dataset.key)
      el.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'))
      sw.classList.add('selected')
      const col = COLORS.find(c => c.key === sw.dataset.key)
      previewCard.style.background = col.bg
      try { await Haptics.impact({ style: ImpactStyle.Light }) } catch {}
    })
  })

  // Glyph buttons
  el.querySelectorAll('.glyph-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      setGlyph(btn.dataset.glyph)
      el.querySelectorAll('.glyph-btn').forEach(b => b.classList.remove('selected'))
      btn.classList.add('selected')
      previewGlyph.textContent = btn.dataset.glyph
      try { await Haptics.impact({ style: ImpactStyle.Light }) } catch {}
    })
  })

  // Cancel
  cancelBtn.addEventListener('click', () => navigate('feed'))

  // Send
  sendBtn.addEventListener('click', async () => {
    const text = textarea.value.trim()
    if (!text) { showToast('Write something first'); return }

    const partnerId = state.user?.partnerId
    if (!partnerId) { showToast('No partner linked yet'); return }

    sendBtn.disabled = true
    sendBtn.textContent = '…'

    try {
      if (!DEMO_MODE) {
        await sendNote({
          fromUid:   state.user.uid,
          toUid:     partnerId,
          text,
          glyph:     getGlyph(),
          color:     getColor(),
          createdAt: Date.now(),
          starred:   false,
        })
      }
      try { await Haptics.impact({ style: ImpactStyle.Medium }) } catch {}
      showToast('✦ Note sent')
      setTimeout(() => navigate('feed'), 600)
    } catch (err) {
      showToast('Could not send — try again')
      sendBtn.disabled = false
      sendBtn.innerHTML = 'Send <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>'
    }
  })
}

function injectStyles() {
  if (document.getElementById('compose-css')) return
  const s = document.createElement('style')
  s.id = 'compose-css'
  s.textContent = `
    .compose-wrap {
      flex: 1; display: flex; flex-direction: column;
      padding: 0 20px; overflow-y: auto;
      -webkit-overflow-scrolling: touch; gap: 20px;
    }
    .compose-nav {
      display: flex; align-items: center; justify-content: space-between;
      padding: 14px 0 4px;
    }
    .compose-nav-title {
      font-size: 17px; font-weight: 600; color: var(--text);
    }
    .compose-cancel {
      background: none; border: none;
      color: var(--text-muted); font-size: 16px; cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }
    .compose-send {
      display: flex; align-items: center; gap: 6px;
      background: linear-gradient(135deg, var(--purple-dim), var(--rose-dim));
      color: #fff; border: none; border-radius: 50px;
      padding: 8px 16px; font-size: 15px; font-weight: 600;
      cursor: pointer; -webkit-tap-highlight-color: transparent;
    }
    .compose-send:disabled { opacity: 0.5; }

    /* Preview card */
    .preview-card {
      border-radius: 22px; padding: 22px;
      border: 1px solid rgba(192,132,252,0.2);
      min-height: 140px; display: flex; flex-direction: column;
      transition: background 0.3s;
    }
    .preview-glyph {
      font-size: 28px; line-height: 1; margin-bottom: 10px;
    }
    .preview-text {
      flex: 1; font-size: 16px; line-height: 1.6;
      color: rgba(255,255,255,0.88); white-space: pre-wrap;
    }
    .preview-ts {
      margin-top: 12px; font-size: 12px;
      color: rgba(255,255,255,0.35);
    }

    /* Textarea */
    .compose-field-wrap { display: flex; flex-direction: column; gap: 8px; }
    .compose-textarea {
      width: 100%; background: var(--bg-card);
      border: 1.5px solid var(--border);
      border-radius: 16px; padding: 14px 16px;
      color: var(--text); font-size: 16px; line-height: 1.55;
      resize: none; outline: none; font-family: inherit;
      transition: border-color 0.2s;
    }
    .compose-textarea:focus { border-color: var(--purple); }
    .compose-textarea::placeholder { color: var(--text-muted); }
    .char-count {
      text-align: right; font-size: 12px; color: var(--text-muted);
    }

    .compose-section { display: flex; flex-direction: column; gap: 10px; }
  `
  document.head.appendChild(s)
}
