import { navigate, state } from '../main.js'
import { signOut } from '../firebase/auth.js'
import { bottomNav } from '../components/bottom-nav.js'
import { showToast } from '../components/toast.js'

export function renderProfile(el) {
  const user = state.user || {}
  const initials = (user.displayName?.[0] || user.email?.[0] || '✦').toUpperCase()

  el.innerHTML = `
    <div class="profile-wrap">
      <!-- Header -->
      <div class="profile-header pt-safe">
        <button class="back-btn" id="pr-back">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="22" height="22">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <h2 class="profile-nav-title">Profile</h2>
        <div style="width:36px"></div>
      </div>

      <div class="scroll-list" style="padding-top:24px;gap:20px">
        <!-- Avatar + name -->
        <div style="display:flex;flex-direction:column;align-items:center;gap:12px;padding:8px">
          <div class="avatar" style="width:72px;height:72px;font-size:30px">${initials}</div>
          <p style="font-size:18px;font-weight:600">${user.displayName || 'Sacred traveller'}</p>
          <p style="font-size:13px;color:var(--text-muted)">${user.email || ''}</p>
        </div>

        <!-- Partner status -->
        <div class="profile-card">
          <p class="section-label" style="margin-bottom:12px">Partner connection</p>
          ${state.user?.partnerId
            ? `<div style="display:flex;align-items:center;gap:12px">
                <div class="avatar">☽</div>
                <div>
                  <p style="font-size:15px;font-weight:600">Connected ✦</p>
                  <p style="font-size:12px;color:var(--text-muted)">Your partner is linked</p>
                </div>
               </div>
               <button class="btn btn-ghost btn-full" id="pr-unlink" style="margin-top:14px;font-size:14px">
                 Unlink partner
               </button>`
            : `<p style="font-size:14px;color:var(--text-muted);margin-bottom:12px">No partner linked yet</p>
               <button class="btn btn-primary btn-full" id="pr-invite">Invite partner</button>`
          }
        </div>

        <!-- Widget hint -->
        <div class="profile-card">
          <p class="section-label" style="margin-bottom:8px">Home Screen Widget</p>
          <p style="font-size:13px;color:var(--text-muted);line-height:1.6">
            After installing on iPhone, long-press your home screen → tap + → search "Sacred Path" to add the Love Notes widget.
          </p>
        </div>

        <!-- Sign out -->
        <button class="btn btn-ghost btn-full" id="pr-signout" style="margin-top:8px;color:var(--rose-dim)">
          Sign out
        </button>

        <div style="height:20px"></div>
      </div>
    </div>

    ${bottomNav('profile')}
  `

  injectStyles()
  bindEvents(el)
}

function bindEvents(el) {
  el.querySelector('#pr-back')?.addEventListener('click', () => navigate('feed'))

  el.querySelector('#pr-signout')?.addEventListener('click', async () => {
    await signOut()
    navigate('signin')
  })

  el.querySelector('#pr-invite')?.addEventListener('click', () => navigate('invite-partner'))

  el.querySelector('#pr-unlink')?.addEventListener('click', () => {
    showToast('Unlink partner — coming soon')
  })

  el.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => navigate(item.dataset.screen))
  })
}

function injectStyles() {
  if (document.getElementById('profile-css')) return
  const s = document.createElement('style')
  s.id = 'profile-css'
  s.textContent = `
    .profile-wrap {
      flex: 1; display: flex; flex-direction: column; overflow: hidden;
    }
    .profile-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 14px 16px 12px;
      border-bottom: 1px solid var(--border);
    }
    .profile-nav-title {
      font-size: 17px; font-weight: 600;
    }
    .back-btn {
      background: none; border: none; color: var(--text);
      cursor: pointer; padding: 4px;
      -webkit-tap-highlight-color: transparent;
    }
    .profile-card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 18px; padding: 18px;
    }
  `
  document.head.appendChild(s)
}
