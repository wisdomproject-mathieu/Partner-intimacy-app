import { signInWithEmail, signInWithGoogle } from '../firebase/auth.js'
import { navigate } from '../main.js'
import { showToast } from '../components/toast.js'

export function renderSignIn(el) {
  el.innerHTML = `
    <div class="signin-wrap pt-safe">
      <!-- Header glyph -->
      <div class="signin-hero">
        <div class="hero-glyph">✦</div>
        <h1 class="hero-title">Sacred Path</h1>
        <p class="hero-sub">A sacred space for you and your partner</p>
      </div>

      <!-- Form -->
      <div class="signin-form">
        <div class="field-group">
          <label class="section-label">Email</label>
          <input id="si-email" class="input-field" type="email" placeholder="you@example.com" autocomplete="email" />
        </div>

        <div class="field-group" style="margin-top:14px">
          <label class="section-label">Password</label>
          <div class="pw-wrap">
            <input id="si-pw" class="input-field" type="password" placeholder="••••••••" autocomplete="current-password" />
            <button id="si-pw-toggle" class="pw-eye" aria-label="Toggle password">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </button>
          </div>
        </div>

        <button id="si-submit" class="btn btn-primary btn-full" style="margin-top:24px">
          Enter the path
        </button>

        <div class="divider" style="display:flex;align-items:center;gap:12px">
          <span style="flex:1;height:1px;background:var(--border)"></span>
          <span style="color:var(--text-muted);font-size:13px">or</span>
          <span style="flex:1;height:1px;background:var(--border)"></span>
        </div>

        <button id="si-google" class="btn btn-ghost btn-full" style="gap:10px">
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
            <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"/>
            <path fill="#FBBC05" d="M3.964 10.706A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.038l3.007-2.332z"/>
            <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z"/>
          </svg>
          Continue with Google
        </button>

        <p class="signin-footer">
          No account? <button id="si-signup-link" class="link-btn">Create one</button>
        </p>
      </div>
    </div>
  `

  injectStyles()
  bindEvents(el)
}

function bindEvents(el) {
  const emailInput = el.querySelector('#si-email')
  const pwInput    = el.querySelector('#si-pw')
  const pwToggle   = el.querySelector('#si-pw-toggle')
  const submitBtn  = el.querySelector('#si-submit')
  const googleBtn  = el.querySelector('#si-google')
  const signupLink = el.querySelector('#si-signup-link')

  pwToggle.addEventListener('click', () => {
    const isText = pwInput.type === 'text'
    pwInput.type = isText ? 'password' : 'text'
  })

  submitBtn.addEventListener('click', async () => {
    const email = emailInput.value.trim()
    const pw    = pwInput.value

    if (!email || !pw) { showToast('Enter your email and password'); return }

    submitBtn.disabled = true
    submitBtn.textContent = 'Entering...'

    try {
      const user = await signInWithEmail(email, pw)
      afterSignIn(user)
    } catch (err) {
      showToast(friendlyError(err.code))
      submitBtn.disabled = false
      submitBtn.textContent = 'Enter the path'
    }
  })

  googleBtn.addEventListener('click', async () => {
    try {
      const user = await signInWithGoogle()
      afterSignIn(user)
    } catch (err) {
      showToast(friendlyError(err.code))
    }
  })

  signupLink.addEventListener('click', () => {
    // Switch to create-account mode (toggle form)
    showToast('Sign-up coming next — use Google for now')
  })
}

function afterSignIn(user) {
  if (!user.partnerId) {
    navigate('invite-partner')
  } else {
    navigate('feed')
  }
}

function friendlyError(code) {
  const map = {
    'auth/invalid-credential':   'Wrong email or password',
    'auth/user-not-found':       'No account with that email',
    'auth/wrong-password':       'Incorrect password',
    'auth/too-many-requests':    'Too many attempts — try later',
    'auth/network-request-failed': 'No connection',
  }
  return map[code] || 'Something went wrong'
}

function injectStyles() {
  if (document.getElementById('signin-css')) return
  const s = document.createElement('style')
  s.id = 'signin-css'
  s.textContent = `
    .signin-wrap {
      flex: 1; display: flex; flex-direction: column;
      padding: 0 28px 40px;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
    .signin-hero {
      flex: 1; display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      text-align: center; padding: 40px 0 32px;
    }
    .hero-glyph {
      font-size: 56px; line-height: 1;
      background: linear-gradient(135deg, var(--purple), var(--rose));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      margin-bottom: 16px;
    }
    .hero-title {
      font-size: 32px; font-weight: 700;
      background: linear-gradient(135deg, var(--lavender), var(--rose));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      margin-bottom: 8px;
    }
    .hero-sub {
      font-size: 15px; color: var(--text-muted); line-height: 1.5; max-width: 240px;
    }
    .signin-form { display: flex; flex-direction: column; }
    .field-group { display: flex; flex-direction: column; gap: 6px; }
    .pw-wrap { position: relative; }
    .pw-wrap .input-field { padding-right: 48px; }
    .pw-eye {
      position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
      background: none; border: none; color: var(--text-muted); cursor: pointer;
      display: flex; align-items: center;
    }
    .pw-eye svg { width: 20px; height: 20px; stroke-width: 1.8; }
    .signin-footer {
      text-align: center; font-size: 14px; color: var(--text-muted);
      margin-top: 20px;
    }
    .link-btn {
      background: none; border: none;
      color: var(--purple); font-size: 14px; cursor: pointer;
      text-decoration: underline; text-underline-offset: 2px;
    }
  `
  document.head.appendChild(s)
}
