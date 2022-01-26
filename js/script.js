document.addEventListener('toggleopen', (event) => {
  if (event.detail.target.id == 'mobile-menu') {
    document.body.classList.add('menu-opened')
  }
})
document.addEventListener('toggleclose', (event) => {
  if (event.detail.target.id == 'mobile-menu') {
    document.body.classList.remove('menu-opened')
  }
})