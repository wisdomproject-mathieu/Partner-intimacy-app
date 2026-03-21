import { navigate } from '../main.js'
import { bottomNav } from '../components/bottom-nav.js'

// ─── Content ──────────────────────────────────────────────────────────────────

const CONTENT = {
  tantra: {
    label: 'Tantra',
    color: '#c0415f',
    glyph: '☽',
    wisdom: [
      {
        quote: 'When two people meet in love, they create a third — an energy field that is greater than both. This is the true meaning of sacred union.',
        author: 'Osho',
      },
      {
        quote: 'Tantra says: do not suppress, do not fight — transform. Every energy in you is sacred if you know how to receive it.',
        author: 'Tantra teaching',
      },
      {
        quote: 'The breath is the bridge between body and soul. When lovers synchronize their breath, they synchronize their beings.',
        author: 'Tantric tradition',
      },
      {
        quote: 'Touch your partner as if touching the divine. Because you are.',
        author: 'Kashmir Shaivism',
      },
      {
        quote: 'In Tantra, the body is not an obstacle to awakening — it is the very temple in which awakening happens.',
        author: 'Abhinavagupta',
      },
    ],
    positions: [
      {
        name: 'Yab-Yum',
        glyph: '☽',
        duration: '10–20 min',
        level: 'Beginners',
        desc: 'The foundational posture of Tantric sacred union. Sit face to face, legs wrapped around each other. Synchronize breath and build a shared energy circuit through all seven chakras. The practice is stillness — not movement. Two beings becoming one field.',
      },
      {
        name: 'Shakti Wave',
        glyph: '✺',
        duration: '15–25 min',
        level: 'Intermediate',
        desc: 'The receptive partner lies back and breathes deeply into the belly, allowing energy to rise as waves through the body. The active partner places one hand on the heart, one on the womb, breathing in rhythm. No agenda — only witnessing.',
      },
      {
        name: 'Firebird',
        glyph: '✦',
        duration: '20–30 min',
        level: 'Intermediate',
        desc: 'Both partners sit facing each other, not touching. Eyes open. Breathe in unison for ten minutes. Let whatever arises — emotion, trembling, tears, laughter — move through without stopping it. This is the fire. You are both the bird.',
      },
    ],
  },

  tao: {
    label: 'Tao',
    color: '#e4b87a',
    glyph: 'ॐ',
    wisdom: [
      {
        quote: 'The Tao that can be spoken is not the eternal Tao. But it can be felt — between two bodies, in the space of surrender.',
        author: 'Lao Tzu, adapted',
      },
      {
        quote: 'Sexual energy is your life-force. The Tao teaches not suppression but refinement — drawing it upward to nourish the whole being.',
        author: 'Mantak Chia',
      },
      {
        quote: 'In gentleness lies great strength. The softest water carves the hardest stone. Let your union be water.',
        author: 'Tao Te Ching',
      },
      {
        quote: 'Nine shallow, one deep — the rhythm of the Tao in lovemaking. The shallow strokes build presence; the deep stroke completes the circuit.',
        author: 'Taoist sexology',
      },
      {
        quote: 'When you stop chasing the peak, you discover the valley — an ocean of pleasure that has no end.',
        author: 'Taoist teaching',
      },
    ],
    positions: [
      {
        name: 'Jade Garden',
        glyph: '✿',
        duration: '20–30 min',
        level: 'Beginners',
        desc: 'A gentle Taoist practice emphasizing slow, mindful connection. Nine shallow movements followed by one deep — a rhythm that builds presence and sensitivity. Between each set of nine, pause completely. Breathe. Feel. The counting becomes a shared meditation.',
      },
      {
        name: 'Valley Orgasm',
        glyph: 'ॐ',
        duration: '30–60 min',
        level: 'Advanced',
        desc: 'A practice of building and circulating energy without peak release. As arousal builds, draw energy upward from the pelvis using breath and PC muscle contractions. When close to peak, slow or stop all movement. Let the energy spread as warmth through the chest, hands, and crown. Repeat the cycle 3–9 times.',
      },
      {
        name: 'Taoist Cultivation',
        glyph: '☯',
        duration: '40–60 min',
        level: 'Advanced',
        desc: 'Begin with 10 minutes of synchronized breathing. Enter a position of minimal movement. Both partners visualize energy rising from the base of the spine, circulating through the microcosmic orbit — up the spine, over the crown, down the front of the body — completing the circuit with each breath cycle.',
      },
    ],
  },

  deida: {
    label: 'David Deida',
    color: '#9ab0e8',
    glyph: '✦',
    wisdom: [
      {
        quote: 'The feminine wants to be met — not managed, not fixed, not solved. She wants your presence to be so full that she can finally let go.',
        author: 'David Deida',
      },
      {
        quote: 'Your woman is a test of your capacity to remain present. Every emotion she moves through is an invitation — not a problem.',
        author: 'David Deida',
      },
      {
        quote: 'Masculine presence is not about doing. It is about being so fully here that nothing is needed. She can feel the difference.',
        author: 'David Deida',
      },
      {
        quote: 'The greatest gift you can give your partner is your full consciousness — not your comfort, your safety, or your approval.',
        author: 'David Deida',
      },
      {
        quote: 'Love is not enough. You must also show up with your full depth — your direction, your presence, your willingness to be destroyed and reformed by love.',
        author: 'David Deida',
      },
    ],
    positions: [
      {
        name: 'Edge of Surrender',
        glyph: '✦',
        duration: '20–35 min',
        level: 'Advanced',
        desc: 'The masculine partner sits or stands — grounded, still, fully present, eyes open. The feminine moves, breathes, expresses — completely, without holding back. Masculine: do not try to fix, manage, or match. Simply witness with complete love. After 15 minutes, come together in stillness. Eyes open. Three minutes of silence.',
      },
      {
        name: 'The Gift of Full Desire',
        glyph: '❁',
        duration: '15–25 min',
        level: 'Intermediate',
        desc: 'Both partners speak their deepest desire aloud — not the safe version, the true one. Then act on it without apology. This is a practice in removing the layer of performance and meeting each other at the level of actual want. Deida: "The suppression of desire is the suppression of love."',
      },
      {
        name: 'Fire and Surrender',
        glyph: '⊹',
        duration: '25–40 min',
        level: 'Intermediate',
        desc: 'The masculine partner leads the entire experience — every transition, every touch, every moment of stillness — while remaining utterly attuned to the feminine\'s responses. The feminine practices full surrender: no directing, no planning, only receiving. Afterward, roles are acknowledged and discussed.',
      },
    ],
  },

  richardson: {
    label: 'Diana Richardson',
    color: '#c09ae0',
    glyph: '❧',
    wisdom: [
      {
        quote: 'Softness is not the absence of power — it is the fullest expression of trust. In softness, the deepest union becomes possible.',
        author: 'Diana Richardson',
      },
      {
        quote: 'We are taught to perform in lovemaking — to reach a peak. But the body is not a machine. It is a garden. It needs time, stillness, and presence.',
        author: 'Diana Richardson',
      },
      {
        quote: 'When you stop moving and simply rest inside each other, something extraordinary begins. The body starts to speak in its own language.',
        author: 'Diana Richardson',
      },
      {
        quote: 'The penis and vagina are polar opposites. When they meet in stillness — not in effort — they create a natural electric circuit. Presence does the work.',
        author: 'Diana Richardson',
      },
      {
        quote: 'The goal is not orgasm. The goal is union. When you stop chasing, you arrive — and what you find there has no name.',
        author: 'Diana Richardson',
      },
    ],
    positions: [
      {
        name: 'Soft Middle Union',
        glyph: '❧',
        duration: '15–20 min',
        level: 'Beginners',
        desc: 'Come together very slowly and softly, with no expectation of arousal or performance. Lie completely still in whatever position feels natural. Close your eyes. Focus attention inward — on warmth, aliveness, the subtle sensation of contact. If the mind wanders, return to breath and body warmth. Stay for at least 15 minutes.',
      },
      {
        name: 'Scissors of Stillness',
        glyph: '⊹',
        duration: '15–30 min',
        level: 'Beginners',
        desc: 'Lie on your sides, bodies interlaced, legs gently woven like scissors. Neither partner exerts effort. Enter softly and rest — no thrusting, no agenda. Both partners breathe deeply, relaxing every muscle with each exhale. Focus entirely on warmth and subtle inner movement. There is no goal. If you fall asleep, that is the practice working.',
      },
      {
        name: 'The Melting Breath',
        glyph: '☽',
        duration: '20–30 min',
        level: 'Beginners',
        desc: 'Begin lying front to back, in a spooning position, not yet joined. Simply breathe together for 10 minutes — the giver breathing warmth into the receiver\'s upper back. When union happens, it is the breath that initiates it, not intention. Continue breathing in this rhythm throughout. Richardson: "Let the breath make love, not the will."',
      },
    ],
  },
}

// ─── Main render ──────────────────────────────────────────────────────────────
export function renderPositions(el) {
  el.innerHTML = `
    <div class="px-wrap">
      <div class="px-header pt-safe">
        <div class="px-top-tabs">
          <button class="px-top-tab active" data-page="paths">Paths</button>
          <button class="px-top-tab" data-page="teachers">Teachers</button>
        </div>
      </div>

      <div class="px-body" id="px-body">
        ${renderPage('paths')}
      </div>
    </div>

    ${bottomNav('positions')}
  `

  injectStyles()
  bindEvents(el)
}

// ─── Page renderer ────────────────────────────────────────────────────────────
function renderPage(page) {
  const traditions = page === 'paths'
    ? [CONTENT.tantra, CONTENT.tao]
    : [CONTENT.deida, CONTENT.richardson]

  return `<div class="px-page">${traditions.map(t => renderTradition(t)).join('')}</div>`
}

function renderTradition(t) {
  return `
    <div class="trad-section">
      <!-- Tradition header -->
      <div class="trad-header" style="border-color:${t.color}44">
        <span class="trad-glyph" style="color:${t.color}">${t.glyph}</span>
        <h2 class="trad-name" style="color:${t.color}">${t.label}</h2>
      </div>

      <!-- 5 wisdom blocks -->
      <div class="wisdom-list">
        ${t.wisdom.map(w => `
          <div class="wisdom-block" style="border-left-color:${t.color}">
            <p class="wisdom-quote">"${w.quote}"</p>
            <p class="wisdom-author" style="color:${t.color}">— ${w.author}</p>
          </div>
        `).join('')}
      </div>

      <!-- Positions sub-tab (accordion) -->
      <div class="pos-subtab">
        <button class="pos-subtab-toggle" data-open="false" style="--accent:${t.color}">
          <span>Positions &amp; Rituals</span>
          <svg class="subtab-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" width="18" height="18">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
        <div class="pos-subtab-body" style="display:none">
          ${t.positions.map(p => `
            <div class="pos-block" style="border-color:${t.color}33">
              <div class="pos-block-head">
                <span class="pos-block-glyph" style="color:${t.color}">${p.glyph}</span>
                <div>
                  <div class="pos-block-meta">
                    <span class="pos-tag" style="color:${t.color};background:${t.color}18;border-color:${t.color}30">${p.level}</span>
                    <span class="pos-dur-small">⏱ ${p.duration}</span>
                  </div>
                  <h3 class="pos-block-name">${p.name}</h3>
                </div>
              </div>
              <p class="pos-block-desc">${p.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `
}

// ─── Events ───────────────────────────────────────────────────────────────────
function bindEvents(el) {
  // Top tabs: Paths ↔ Teachers
  el.querySelector('#px-body').parentElement.addEventListener('click', e => {
    const tab = e.target.closest('.px-top-tab')
    if (!tab) return
    el.querySelectorAll('.px-top-tab').forEach(t => t.classList.remove('active'))
    tab.classList.add('active')
    el.querySelector('#px-body').innerHTML = renderPage(tab.dataset.page)
    bindAccordions(el)
  })

  bindAccordions(el)

  // Bottom nav
  el.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => navigate(item.dataset.screen))
  })
}

function bindAccordions(el) {
  el.querySelectorAll('.pos-subtab-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const isOpen = btn.dataset.open === 'true'
      const body   = btn.nextElementSibling
      btn.dataset.open = String(!isOpen)
      body.style.display = isOpen ? 'none' : 'flex'
      btn.querySelector('.subtab-chevron').style.transform = isOpen ? '' : 'rotate(180deg)'
    })
  })
}

// ─── Styles ───────────────────────────────────────────────────────────────────
function injectStyles() {
  if (document.getElementById('positions-css')) return
  const s = document.createElement('style')
  s.id = 'positions-css'
  s.textContent = `
    /* Wrap */
    .px-wrap { flex:1; display:flex; flex-direction:column; overflow:hidden; }

    /* Header + top tabs */
    .px-header {
      flex-shrink: 0;
      border-bottom: 1px solid var(--border);
    }
    .px-top-tabs {
      display: flex;
    }
    .px-top-tab {
      flex: 1; padding: 14px;
      background: none; border: none; border-bottom: 2px solid transparent;
      color: var(--text-muted); font-size: 15px; font-weight: 600;
      cursor: pointer; transition: color .15s, border-color .15s;
      -webkit-tap-highlight-color: transparent;
    }
    .px-top-tab.active {
      color: var(--purple); border-bottom-color: var(--purple);
    }

    /* Scrollable body */
    .px-body {
      flex: 1; overflow-y: auto; padding: 0 0 24px;
      -webkit-overflow-scrolling: touch;
    }
    .px-body::-webkit-scrollbar { display: none; }
    .px-page { display: flex; flex-direction: column; }

    /* Tradition section */
    .trad-section {
      padding: 24px 20px 8px;
      border-bottom: 1px solid var(--border);
    }
    .trad-section:last-child { border-bottom: none; }
    .trad-header {
      display: flex; align-items: center; gap: 10px;
      margin-bottom: 18px;
      padding-bottom: 14px;
      border-bottom: 1px solid;
    }
    .trad-glyph { font-size: 26px; line-height: 1; }
    .trad-name  { font-size: 20px; font-weight: 700; }

    /* Wisdom blocks */
    .wisdom-list { display: flex; flex-direction: column; gap: 14px; margin-bottom: 20px; }
    .wisdom-block {
      border-left: 3px solid;
      padding: 10px 14px;
      background: rgba(255,255,255,0.03);
      border-radius: 0 10px 10px 0;
    }
    .wisdom-quote {
      font-family: Georgia, serif;
      font-size: 14px; font-style: italic;
      color: var(--text); line-height: 1.75;
      margin-bottom: 7px;
    }
    .wisdom-author {
      font-size: 11px; font-weight: 600;
      letter-spacing: 0.08em; text-transform: uppercase;
    }

    /* Positions sub-tab */
    .pos-subtab { margin-bottom: 16px; }
    .pos-subtab-toggle {
      width: 100%; display: flex; align-items: center;
      justify-content: space-between;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 12px; padding: 13px 16px;
      color: var(--text); font-size: 14px; font-weight: 600;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }
    .subtab-chevron { transition: transform .22s ease; flex-shrink: 0; }

    .pos-subtab-body {
      flex-direction: column; gap: 12px;
      margin-top: 10px;
    }

    /* Position block */
    .pos-block {
      background: var(--bg-card);
      border: 1px solid;
      border-radius: 16px; padding: 16px;
    }
    .pos-block-head {
      display: flex; gap: 12px; align-items: flex-start;
      margin-bottom: 10px;
    }
    .pos-block-glyph { font-size: 26px; line-height: 1; flex-shrink: 0; }
    .pos-block-meta  { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
    .pos-tag {
      font-size: 11px; font-weight: 600; letter-spacing: 0.04em;
      padding: 3px 9px; border-radius: 50px; border: 1px solid;
    }
    .pos-dur-small { font-size: 11px; color: var(--text-muted); }
    .pos-block-name { font-size: 16px; font-weight: 700; }
    .pos-block-desc {
      font-size: 13px; color: var(--text-muted); line-height: 1.7;
    }
  `
  document.head.appendChild(s)
}
