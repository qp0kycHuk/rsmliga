document.addEventListener('click', (event) => {
  if (!event.target.closest('[data-show-pass]')) return
  const id = event.target.closest('[data-show-pass]').getAttribute('data-show-pass')
  const input = document.getElementById(id)
  if (!input) return
  if (input.type === 'password') { 
    input.type = 'text'
    event.target.closest('[data-show-pass]').classList.add('active')
  }else{
    input.type = 'password'
    event.target.closest('[data-show-pass]').classList.remove('active')
  }
})