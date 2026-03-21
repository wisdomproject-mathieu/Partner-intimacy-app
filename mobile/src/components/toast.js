let toastTimer = null

export function showToast(message, duration = 2400) {
  const existing = document.querySelector('.toast')
  if (existing) existing.remove()
  if (toastTimer) clearTimeout(toastTimer)

  const toast = document.createElement('div')
  toast.className = 'toast'
  toast.textContent = message
  document.body.appendChild(toast)

  toastTimer = setTimeout(() => {
    toast.style.opacity = '0'
    toast.style.transition = 'opacity 0.3s'
    setTimeout(() => toast.remove(), 300)
  }, duration)
}
