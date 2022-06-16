document.addEventListener('click', (event) => {
  if (event.target.closest('.color-select-item')) {
    const value = event.target.closest('.color-select-item').getAttribute('data-color')
    const cover = event.target.closest('.color-select')
    const input = cover.querySelector('.color-select-input')
    const titleItem = cover.querySelector('.color-select-title .color-select-item')
    titleItem.innerHTML = event.target.closest('.color-select-item').innerHTML
    input.value = value
  }
})