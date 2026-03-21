export function bottomNav(active) {
  const items = [
    {
      key: 'feed',
      label: 'Notes',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      </svg>`,
    },
    {
      key: 'positions',
      label: 'Practices',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>`,
    },
    {
      key: 'compose',
      label: 'Write',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>`,
    },
    {
      key: 'profile',
      label: 'Profile',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>`,
    },
  ]

  return `
    <nav class="bottom-nav pb-safe">
      ${items.map(item => `
        <button class="nav-item ${item.key === active ? 'active' : ''}" data-screen="${item.key}">
          ${item.icon}
          ${item.label}
        </button>
      `).join('')}
    </nav>
  `
}
