import { navigate, state } from '../main.js'
import { listenToNotes } from '../firebase/notes.js'
import { timeAgo } from '../components/time.js'
import { bottomNav } from '../components/bottom-nav.js'

const NOTE_COLORS = {
  rose:   { bg: 'var(--note-rose)',   accent: '#f472b6' },
  purple: { bg: 'var(--note-purple)', accent: '#c084fc' },
  gold:   { bg: 'var(--note-gold)',   accent: '#fbbf24' },
  teal:   { bg: 'var(--note-teal)',   accent: '#2dd4bf' },
  indigo: { bg: 'var(--note-indigo)', accent: '#818cf8' },
}

export function renderFeed(el) {
  el.innerHTML = `
    <div class="feed-wrap">
      <!-- Header -->
      <div class="feed-header pt-safe">
        <div>
          <h2 class="feed-title">Sacred Notes</h2>
          <p class="feed-sub" id="feed-sub">from your partner</p>
        </div>
        <button class="avatar" id="feed-avatar" aria-label="Profile">
          ${state.user?.displayName?.[0]?.toUpperCase() || '✦'}
        </button>
      </div>

      <!-- Tabs: received / sent -->
      <div class="feed-tabs">
        <button class="tab active" data-tab="received">Received</button>
        <button class="tab" data-tab="sent">Sent</button>
      </div>

      <!-- List -->
      <div class="scroll-list" id="notes-list">
        <div style="margin:auto"><div class="spinner"></div></div>
      </div>
    </div>

    <!-- FAB -->
    <button class="fab" id="fab-compose" aria-label="Write a note">✦</button>

    ${bottomNav('feed')}
  `

  injectStyles()
  bindEvents(el)
  loadNotes(el, 'received')
}

let unsubscribe = null

function bindEvents(el) {
  el.querySelector('#fab-compose').addEventListener('click', () => navigate('compose'))
  el.querySelector('#feed-avatar').addEventListener('click', () => navigate('profile'))

  el.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      el.querySelectorAll('.tab').forEach(t => t.classList.remove('active'))
      tab.classList.add('active')
      loadNotes(el, tab.dataset.tab)
    })
  })

  // Bottom nav clicks
  el.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => navigate(item.dataset.screen))
  })
}

function loadNotes(el, tab) {
  const list = el.querySelector('#notes-list')
  list.innerHTML = '<div style="margin:auto"><div class="spinner"></div></div>'

  if (unsubscribe) { unsubscribe(); unsubscribe = null }

  const uid = state.user?.uid
  if (!uid) return

  const isReceived = tab === 'received'
  const targetId   = isReceived ? uid : state.user?.partnerId

  unsubscribe = listenToNotes(targetId, uid, isReceived, (notes) => {
    if (!notes.length) {
      list.innerHTML = emptyState(isReceived)
      return
    }
    list.innerHTML = ''
    notes.forEach((note, i) => {
      const card = buildNoteCard(note, i)
      list.appendChild(card)
    })
  })
}

function buildNoteCard(note, idx) {
  const col   = NOTE_COLORS[note.color] || NOTE_COLORS.purple
  const delay = idx * 0.04

  const card = document.createElement('div')
  card.className = 'note-card'
  card.style.cssText = `
    background: ${col.bg};
    border: 1px solid ${col.accent}33;
    animation-delay: ${delay}s;
  `
  card.innerHTML = `
    <span class="note-glyph">${note.glyph || '✦'}</span>
    <p class="note-text">${escapeHtml(note.text)}</p>
    <div class="note-meta">
      <span>${timeAgo(note.createdAt)}</span>
      <span style="color:${col.accent}">${note.starred ? '★' : ''}</span>
    </div>
  `
  return card
}

function emptyState(isReceived) {
  return `
    <div style="
      flex:1; display:flex; flex-direction:column;
      align-items:center; justify-content:center;
      padding:40px; text-align:center; gap:16px;
    ">
      <div style="font-size:48px; opacity:0.3">${isReceived ? '☽' : '✦'}</div>
      <p style="color:var(--text-muted); font-size:14px; line-height:1.6; max-width:220px">
        ${isReceived
          ? 'Notes from your partner will appear here'
          : 'Notes you send will appear here — tap ✦ to write one'}
      </p>
    </div>
  `
}

function escapeHtml(str = '') {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
}

function injectStyles() {
  if (document.getElementById('feed-css')) return
  const s = document.createElement('style')
  s.id = 'feed-css'
  s.textContent = `
    .feed-wrap {
      flex: 1; display: flex; flex-direction: column;
      overflow: hidden;
    }
    .feed-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 16px 20px 12px;
      border-bottom: 1px solid var(--border);
    }
    .feed-title {
      font-size: 22px; font-weight: 700;
      background: linear-gradient(90deg, var(--lavender), var(--rose));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    }
    .feed-sub {
      font-size: 13px; color: var(--text-muted); margin-top: 2px;
    }
    .feed-tabs {
      display: flex; border-bottom: 1px solid var(--border);
    }
    .tab {
      flex: 1; padding: 12px; background: none; border: none;
      color: var(--text-muted); font-size: 14px; font-weight: 500;
      cursor: pointer; border-bottom: 2px solid transparent;
      transition: color 0.15s, border-color 0.15s;
      -webkit-tap-highlight-color: transparent;
    }
    .tab.active {
      color: var(--purple);
      border-bottom-color: var(--purple);
    }
  `
  document.head.appendChild(s)
}
