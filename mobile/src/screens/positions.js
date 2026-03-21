import { navigate, state } from '../main.js'
import { bottomNav } from '../components/bottom-nav.js'
import { showToast } from '../components/toast.js'

// 6 curated positions for mobile (reduced from ~18 in the web app)
const POSITIONS = [
  {
    id: 'yab-yum',
    name: 'Yab-Yum',
    tradition: 'Tantra',
    level: 'beginners',
    duration: '10–20 min',
    glyph: '☽',
    color: '#c0415f',
    desc: 'The foundational posture of Tantric sacred union. Sit face to face, legs wrapped around each other. Synchronize breath and build a shared energy circuit through all seven chakras.',
    steps: [
      'Active partner sits cross-legged, spine tall. Take 5 deep breaths alone first.',
      'Receptive partner faces them, legs around the waist, arms over the shoulders. Foreheads touch.',
      'Let your chests meet. Feel the warmth between your hearts. Stay one full minute before breathing together.',
      'Synchronize breath: inhale 4 counts, exhale 4 counts together. Let nothing else exist.',
      'With each inhale, visualize light rising from the base of the spine to the crown.',
      'Continue 10–20 minutes. End with 5 minutes of complete silence.',
    ],
    tip: 'Play Tibetan singing bowl recordings — no lyrics. Soundscapes allow presence.',
  },
  {
    id: 'scissors',
    name: 'Scissors of Stillness',
    tradition: 'Richardson',
    level: 'beginners',
    duration: '15–30 min',
    glyph: '⊹',
    color: '#c09ae0',
    desc: 'Lie on your sides, bodies interlaced. Neither partner exerts effort. Let energy move by itself in the space of complete rest.',
    steps: [
      'Lie facing each other on your sides. Legs interweave gently like scissors.',
      'Enter softly and rest in complete stillness — no thrusting, no agenda.',
      'Both partners breathe deeply, relaxing every muscle with each exhale.',
      'Focus entirely on warmth and subtle inner movement.',
      'Stay for as long as feels right. There is no goal here.',
    ],
    tip: 'This is the deepest rest position. If you fall asleep, that is the practice working.',
  },
  {
    id: 'valley-orgasm',
    name: 'Valley Orgasm',
    tradition: 'Tao',
    level: 'advanced',
    duration: '30–60 min',
    glyph: 'ॐ',
    color: '#e4b87a',
    desc: 'A Taoist practice of building and circulating sexual energy without release. Energy is drawn upward through the body in waves rather than discharged.',
    steps: [
      'Begin in any still position. Breathe together slowly for 5 minutes.',
      'As arousal builds, both partners consciously draw energy upward from the pelvis.',
      'Use the PC muscle contraction on the inhale — imagine pulling energy up the spine.',
      'When close to peak, slow down or stop all movement. Breathe through the wave.',
      'Let the energy spread as warmth through the chest, hands, and crown.',
      'Repeat this cycle 3–9 times. The "valley" is the space between peaks.',
    ],
    tip: 'Mantak Chia: "The valley orgasm lasts for hours. The peak orgasm lasts for seconds."',
  },
  {
    id: 'jade-garden',
    name: 'Jade Garden',
    tradition: 'Tao',
    level: 'beginners',
    duration: '20–30 min',
    glyph: '✿',
    color: '#5db88a',
    desc: 'A gentle Taoist practice emphasising slow, mindful connection. Nine shallow movements followed by one deep — a rhythm that builds presence and sensitivity.',
    steps: [
      'Begin lying down, face to face or in any comfortable position.',
      'Establish a rhythm: nine slow, shallow movements followed by one deep.',
      'Both partners count silently together — the counting becomes a shared meditation.',
      'Between each set of nine, pause completely. Breathe. Feel.',
      'After 9 sets, rest in stillness for several minutes.',
    ],
    tip: 'The Tao Te Ching: "In gentleness lies great strength."',
  },
  {
    id: 'edge-surrender',
    name: 'Edge of Surrender',
    tradition: 'Deida',
    level: 'advanced',
    duration: '20–35 min',
    glyph: '✦',
    color: '#9ab0e8',
    desc: 'A Deida practice of polarity and full presence. The masculine holds unwavering stillness while the feminine moves through all her emotions freely — neither collapsing into the other.',
    steps: [
      'Masculine partner sits or stands — grounded, still, fully present. Eyes open.',
      'Feminine partner moves, breathes, expresses — fully, without holding back.',
      'Masculine: do not try to fix, manage, or match. Simply witness with complete love.',
      'Feminine: feel into every wave of sensation, emotion, or sound. Nothing is too much.',
      'After 10–15 minutes, switch or come together in stillness.',
      'Sit facing each other. Look into each other\'s eyes without speaking for 3 minutes.',
    ],
    tip: 'Deida: "The feminine wants to be met — not managed."',
  },
  {
    id: 'soft-middle',
    name: 'Soft Middle Union',
    tradition: 'Richardson',
    level: 'beginners',
    duration: '15–20 min',
    glyph: '❧',
    color: '#c09ae0',
    desc: 'A Diana Richardson practice for connecting without performance. Union happens softly, with no goal of arousal. The aim is pure energetic exchange.',
    steps: [
      'Come together very slowly and softly, with no expectation of arousal.',
      'Lie still in whatever position feels natural. Close your eyes.',
      'Focus attention inward — on warmth, aliveness, subtle sensation.',
      'If the mind wanders, return to breath and body contact.',
      'Stay for at least 15 minutes. The longer, the more profound.',
    ],
    tip: '"Softness is not the absence of power — it is the fullest expression of trust."',
  },
]

// ─── Main render ──────────────────────────────────────────────────────────────
export function renderPositions(el) {
  el.innerHTML = `
    <div class="pos-wrap">
      <div class="pos-header pt-safe">
        <h2 class="pos-title">Sacred Positions</h2>
        <p class="pos-subtitle">6 practices across 4 traditions</p>
      </div>

      <!-- Tradition filter -->
      <div class="trad-filter" id="trad-filter">
        <button class="trad-btn active" data-trad="all">All</button>
        <button class="trad-btn" data-trad="Tantra">Tantra</button>
        <button class="trad-btn" data-trad="Tao">Tao</button>
        <button class="trad-btn" data-trad="Richardson">Richardson</button>
        <button class="trad-btn" data-trad="Deida">Deida</button>
      </div>

      <div class="scroll-list" id="pos-list">
        ${POSITIONS.map(p => posCard(p)).join('')}
      </div>
    </div>

    ${bottomNav('positions')}
  `

  injectStyles()
  bindEvents(el)
}

// ─── Position card (list view) ────────────────────────────────────────────────
function posCard(p) {
  return `
    <div class="pos-card" data-id="${p.id}" data-trad="${p.tradition}" style="border-color:${p.color}33">
      <div class="pos-card-top">
        <div class="pos-glyph" style="color:${p.color}">${p.glyph}</div>
        <div class="pos-info">
          <div class="pos-tags">
            <span class="pos-tag" style="color:${p.color};background:${p.color}18;border-color:${p.color}30">${p.tradition}</span>
            <span class="pos-level">${p.level}</span>
          </div>
          <h3 class="pos-name">${p.name}</h3>
          <p class="pos-dur">⏱ ${p.duration}</p>
        </div>
      </div>
      <p class="pos-desc">${p.desc}</p>
      <button class="pos-open-btn" data-id="${p.id}">View practice →</button>
    </div>
  `
}

// ─── Detail overlay ───────────────────────────────────────────────────────────
function showDetail(p) {
  const overlay = document.createElement('div')
  overlay.className = 'pos-detail-overlay'
  overlay.innerHTML = `
    <div class="pos-detail" style="--accent:${p.color}">
      <div class="pos-detail-header pt-safe">
        <button class="pos-detail-back" id="det-back">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="22" height="22">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <div></div>
      </div>

      <div class="pos-detail-scroll">
        <div class="pos-detail-hero">
          <span class="pos-detail-glyph" style="color:${p.color}">${p.glyph}</span>
          <div class="pos-tag" style="color:${p.color};background:${p.color}18;border-color:${p.color}30;margin-bottom:8px">${p.tradition} · ${p.level}</div>
          <h2 class="pos-detail-name">${p.name}</h2>
          <p class="pos-detail-dur">⏱ ${p.duration}</p>
        </div>

        <p class="pos-detail-desc">${p.desc}</p>

        <div class="pos-steps-label">Practice steps</div>
        <ol class="pos-steps">
          ${p.steps.map((s, i) => `
            <li class="pos-step">
              <span class="pos-step-n" style="background:${p.color}22;color:${p.color}">${i + 1}</span>
              <p>${s}</p>
            </li>
          `).join('')}
        </ol>

        <div class="pos-tip">
          <span>💡</span>
          <p>${p.tip}</p>
        </div>

        <div style="height:32px"></div>
      </div>
    </div>
  `

  document.body.appendChild(overlay)
  requestAnimationFrame(() => overlay.classList.add('visible'))

  overlay.querySelector('#det-back').addEventListener('click', () => {
    overlay.classList.remove('visible')
    setTimeout(() => overlay.remove(), 280)
  })
}

// ─── Events ───────────────────────────────────────────────────────────────────
function bindEvents(el) {
  // Tradition filter
  el.querySelector('#trad-filter').addEventListener('click', e => {
    const btn = e.target.closest('.trad-btn')
    if (!btn) return
    el.querySelectorAll('.trad-btn').forEach(b => b.classList.remove('active'))
    btn.classList.add('active')
    const trad = btn.dataset.trad
    el.querySelectorAll('.pos-card').forEach(card => {
      card.style.display = (trad === 'all' || card.dataset.trad === trad) ? '' : 'none'
    })
  })

  // Open detail
  el.querySelector('#pos-list').addEventListener('click', e => {
    const btn = e.target.closest('.pos-open-btn, .pos-card')
    if (!btn) return
    const id = btn.dataset.id || btn.closest('.pos-card')?.dataset.id
    const pos = POSITIONS.find(p => p.id === id)
    if (pos) showDetail(pos)
  })

  // Bottom nav
  el.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => navigate(item.dataset.screen))
  })
}

// ─── Styles ───────────────────────────────────────────────────────────────────
function injectStyles() {
  if (document.getElementById('positions-css')) return
  const s = document.createElement('style')
  s.id = 'positions-css'
  s.textContent = `
    .pos-wrap { flex:1; display:flex; flex-direction:column; overflow:hidden; }

    .pos-header {
      padding: 16px 20px 10px;
      border-bottom: 1px solid var(--border);
    }
    .pos-title {
      font-size: 22px; font-weight: 700;
      background: linear-gradient(90deg, var(--lavender), var(--rose));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    }
    .pos-subtitle { font-size: 13px; color: var(--text-muted); margin-top: 2px; }

    /* Filter */
    .trad-filter {
      display: flex; gap: 8px; padding: 12px 16px;
      overflow-x: auto; border-bottom: 1px solid var(--border);
      -webkit-overflow-scrolling: touch; flex-shrink: 0;
    }
    .trad-filter::-webkit-scrollbar { display: none; }
    .trad-btn {
      flex-shrink: 0; padding: 6px 14px;
      border-radius: 50px; border: 1.5px solid var(--border);
      background: none; color: var(--text-muted); font-size: 13px;
      cursor: pointer; white-space: nowrap;
      transition: color .15s, border-color .15s, background .15s;
      -webkit-tap-highlight-color: transparent;
    }
    .trad-btn.active {
      background: rgba(192,132,252,0.12);
      border-color: var(--purple); color: var(--purple);
    }

    /* Card */
    .pos-card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 18px; padding: 18px;
      cursor: pointer;
      transition: transform .12s;
      -webkit-tap-highlight-color: transparent;
    }
    .pos-card:active { transform: scale(0.98); }
    .pos-card-top { display: flex; gap: 14px; align-items: flex-start; margin-bottom: 10px; }
    .pos-glyph { font-size: 32px; line-height: 1; flex-shrink: 0; }
    .pos-info { flex: 1; }
    .pos-tags { display: flex; align-items: center; gap: 7px; margin-bottom: 5px; }
    .pos-tag {
      font-size: 11px; font-weight: 600; letter-spacing: 0.05em;
      padding: 3px 9px; border-radius: 50px; border: 1px solid;
    }
    .pos-level { font-size: 11px; color: var(--text-muted); }
    .pos-name { font-size: 17px; font-weight: 700; margin-bottom: 3px; }
    .pos-dur { font-size: 12px; color: var(--text-muted); }
    .pos-desc {
      font-size: 13px; color: var(--text-muted); line-height: 1.6;
      margin-bottom: 12px;
      display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .pos-open-btn {
      background: none; border: none;
      color: var(--purple); font-size: 14px; font-weight: 500;
      cursor: pointer; padding: 0;
      -webkit-tap-highlight-color: transparent;
    }

    /* Detail overlay */
    .pos-detail-overlay {
      position: fixed; inset: 0; z-index: 500;
      background: var(--bg);
      opacity: 0; transform: translateY(24px);
      transition: opacity .26s ease, transform .26s ease;
      pointer-events: none;
    }
    .pos-detail-overlay.visible {
      opacity: 1; transform: translateY(0); pointer-events: all;
    }
    .pos-detail { height: 100%; display: flex; flex-direction: column; }
    .pos-detail-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 14px 16px 8px;
    }
    .pos-detail-back {
      background: none; border: none; color: var(--text);
      cursor: pointer; padding: 4px;
      -webkit-tap-highlight-color: transparent;
    }
    .pos-detail-scroll {
      flex: 1; overflow-y: auto; padding: 0 22px 40px;
      -webkit-overflow-scrolling: touch;
    }
    .pos-detail-hero { text-align: center; padding: 16px 0 24px; }
    .pos-detail-glyph { font-size: 52px; line-height: 1; display: block; margin-bottom: 14px; }
    .pos-detail-name {
      font-size: 28px; font-weight: 800;
      background: linear-gradient(135deg, var(--lavender), var(--rose));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      margin: 6px 0 4px;
    }
    .pos-detail-dur { font-size: 13px; color: var(--text-muted); }
    .pos-detail-desc {
      font-size: 15px; color: var(--text-muted); line-height: 1.7;
      margin-bottom: 24px;
    }
    .pos-steps-label {
      font-size: 11px; font-weight: 600; letter-spacing: .08em;
      text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px;
    }
    .pos-steps { list-style: none; display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; }
    .pos-step {
      display: flex; gap: 12px; align-items: flex-start;
    }
    .pos-step-n {
      width: 26px; height: 26px; border-radius: 50%; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      font-size: 13px; font-weight: 700;
    }
    .pos-step p { font-size: 14px; line-height: 1.65; color: var(--text); padding-top: 3px; }
    .pos-tip {
      display: flex; gap: 12px;
      background: rgba(192,132,252,0.07);
      border: 1px solid rgba(192,132,252,0.18);
      border-radius: 14px; padding: 14px;
      font-size: 13px; color: var(--text-muted); line-height: 1.6;
    }
  `
  document.head.appendChild(s)
}
