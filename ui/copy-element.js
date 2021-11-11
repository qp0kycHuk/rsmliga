(() => {

  const covers = [...document.querySelectorAll('.-copy-child-')]

  covers.map((cover) => {
    const copyBtn = document.createElement('button')
    copyBtn.classList.add('copy-element-btn')
    copyBtn.textContent = 'Копировать html'

    cover.classList.add('copy-element-wrap')
    cover.appendChild(copyBtn)

    copyBtn.addEventListener('click', (event) => {
      const copyElement = cover.cloneNode(true)
      copyElement.removeChild(copyElement.querySelector('.copy-element-btn'))

      const html = copyElement.innerHTML

      navigator.clipboard.writeText(html)
        .then(() => {
          copyBtn.classList.add('active')
          copyBtn.textContent = 'Скопировано!'
          setTimeout(() => copyBtn.classList.remove('active'), 600)
          setTimeout(() => copyBtn.textContent = 'Копировать html', 600)
        })




    })
  })




})()