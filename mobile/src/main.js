import { Capacitor } from '@capacitor/core'
import { renderSignIn } from './screens/signin.js'
import { renderInvitePartner } from './screens/invite-partner.js'
import { renderFeed } from './screens/feed.js'
import { renderCompose } from './screens/compose.js'
import { renderProfile } from './screens/profile.js'
import { getSession, onSessionChange } from './firebase/auth.js'

// ── App state ────────────────────────────────────
export const state = {
  user: null,
  partner: null,
  currentScreen: 'feed',  // feed | compose | profile
}

// ── Router ───────────────────────────────────────
const app = document.getElementById('app')

export function navigate(screen, params = {}) {
  state.currentScreen = screen
  render(screen, params)
}

function render(screen, params = {}) {
  app.innerHTML = ''
  const el = document.createElement('div')
  el.className = 'screen'
  app.appendChild(el)

  switch (screen) {
    case 'signin':         renderSignIn(el, params);        break
    case 'invite-partner': renderInvitePartner(el, params); break
    case 'feed':           renderFeed(el, params);           break
    case 'compose':        renderCompose(el, params);        break
    case 'profile':        renderProfile(el, params);        break
    default:               renderFeed(el, params)
  }
}

// ── Boot ─────────────────────────────────────────
async function boot() {
  // Show splash-ish empty state while checking auth
  app.innerHTML = `
    <div class="screen" style="display:flex;align-items:center;justify-content:center;flex-direction:column;gap:16px;">
      <div style="font-size:52px">✦</div>
      <div class="spinner"></div>
    </div>`

  const session = await getSession()
  if (!session) {
    navigate('signin')
    return
  }

  state.user = session

  // Check if partner is linked
  if (!session.partnerId) {
    navigate('invite-partner')
    return
  }

  navigate('feed')
}

// Re-render on auth changes
onSessionChange((user) => {
  if (!user && state.currentScreen !== 'signin') {
    state.user = null
    navigate('signin')
  }
})

boot()
