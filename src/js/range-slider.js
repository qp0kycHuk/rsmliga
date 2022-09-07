import getSupportedEvents from './functions/getSupportedEvents';

function Range(selector, params) {
  const covers = document.querySelectorAll(selector);

  Array.from(covers).map((cover) => {
    const options = {}
    options.$el = cover
    options.min = +cover.getAttribute('data-min') ?? 0
    options.max = +cover.getAttribute('data-max') ?? 100
    options.from = +cover.getAttribute('data-from') ?? options.min
    options.to = +cover.getAttribute('data-to') ?? options.max
    options.type = cover.getAttribute('data-type') ?? 'single'
    options.floor = +cover.getAttribute('data-floor') ?? 2
    options.inner = cover.querySelector('.range-inner') || cover
    options.renderValue = cover.querySelector('.range-value')
    options.renderSign = cover.querySelector('.range-sign')
    options.inputFrom = cover.querySelector('.range-input-from')
    options.inputTo = cover.querySelector('.range-input-to')
    if (!!params.onChange && typeof params.onChange == 'function') {
      options.onChange = params.onChange
    }

    if (options.type == 'single') options.from = options.min
    if (options.from < options.min) options.from = options.min
    if (options.to > options.max) options.to = options.max



    addElements(options)
    addListeners(options)
    setFromTo(options)
    render(options)

    if (options.onChange) {
      options.onChange({
        target: options.$el,
        from: options.from,
        to: options.to
      })
    }




  })

  function addElements(options) {
    const line = document.createElement('div')
    line.classList.add('range-line')
    options.inner.appendChild(line)
    options.line = line

    const progress = document.createElement('div')
    progress.classList.add('range-progress')
    options.inner.appendChild(progress)
    options.progress = progress

    const nextBtn = document.createElement('button')
    nextBtn.classList.add('range-btn')
    nextBtn.type = 'button'
    options.inner.appendChild(nextBtn)
    options.nextBtn = nextBtn

    if (options.type == 'double') {
      const prevBtn = document.createElement('button')
      prevBtn.classList.add('range-btn')
      prevBtn.type = 'button'
      options.inner.appendChild(prevBtn)
      options.prevBtn = prevBtn
    }
  }

  var eventsUnify = function (e) {
    return e.changedTouches ? e.changedTouches[0] : e;
  };

  function addListeners(options) {
    options.inner.addEventListener(getSupportedEvents().start, (e) => {
      const event = eventsUnify(e)
      if (getSupportedEvents().type == 'mouse' && event.button !== 0) return

      const left = options.inner.getBoundingClientRect().left
      const currentValue = ((event.clientX - left) / options.inner.getBoundingClientRect().width) * (options.max - options.min) + options.min
      const key = setFromTo(options, currentValue)
      render(options)

      document.body.style.userSelect = 'none'


      let timerFlag = true

      const moveHandler = (e) => {
        if (!timerFlag) return
        timerFlag = false

        setTimeout(() => timerFlag = true, 1000 / 60)

        const event = eventsUnify(e)

        const left = options.inner.getBoundingClientRect().left
        const moveValue = ((event.clientX - left) / options.inner.getBoundingClientRect().width) * (options.max - options.min) + options.min

        setFromTo(options, moveValue, key)
        requestAnimationFrame(() => render(options))



        options.progress && (options.progress.style.transition = '0s')
        options.nextBtn && (options.nextBtn.style.transition = '0s')
        options.prevBtn && (options.prevBtn.style.transition = '0s')
        options.renderSign && (options.renderSign.style.transition = '0s')

      }
      document.addEventListener(getSupportedEvents().move, moveHandler)
      document.addEventListener(getSupportedEvents().end, () => {
        document.body.style.userSelect = ''

        options.progress && (options.progress.style.transition = '')
        options.nextBtn && (options.nextBtn.style.transition = '')
        options.prevBtn && (options.prevBtn.style.transition = '')
        options.renderSign && (options.renderSign.style.transition = '')

        document.removeEventListener(getSupportedEvents().move, moveHandler)
      })
    })

    options.inputFrom?.addEventListener('input', (event) => {
      if (!event.target.value || isNaN(parseFloat(event.target.value))) {
        return
      }
      const key = setFromTo(options, event.target.value, 'from')
      render(options)
    })

    options.inputTo?.addEventListener('input', (event) => {
      if (!event.target.value || isNaN(parseFloat(event.target.value))) {
        return
      }
      const key = setFromTo(options, event.target.value, 'to')
      render(options)
    })

    window.addEventListener('resize', () => {
      setTimeout(() => {
        render(options)
      }, 100)
    })
  }

  function setFromTo(options, value, key) {
    let result = ''

    if (value ?? false) {
      if (key) {
        options[key] = value
        result = key
      } else if (value >= options.to || options.type == 'single') {
        options.to = value
        result = 'to'
      } else if (value <= options.from) {
        options.from = value
        result = 'from'
      } else {
        if ((options.to - value) < -(options.from - value)) {
          options.to = value
          result = 'to'
        } else {
          options.from = value
          result = 'from'
        }
      }
    }

    if (options.to <= options.from && result == 'from') options.to = options.from
    if (options.to <= options.from && result == 'to') options.from = options.to
    if (options.to > options.max) options.to = options.max
    if (options.to < options.min) options.to = options.min
    if (options.from < options.min) options.from = options.min
    if (options.from > options.max) options.from = options.max

    let fromValue = options.from
    let toValue = options.to


    fromValue = parseFloat(fromValue)
    toValue = parseFloat(toValue)

    fromValue = +fromValue.toFixed(options.floor)
    toValue = +toValue.toFixed(options.floor)

    options.from = fromValue
    options.to = toValue

    options.inputFrom.value = options.from
    options.inputTo.value = options.to

    if (options.onChange) {
      options.onChange({
        target: options.$el,
        from: options.from,
        to: options.to
      })
    }
    return result
  }

  function render(options) {
    const innerWidth = options.inner.getBoundingClientRect().width
    const left = (options.from - options.min) / (options.max - options.min) * innerWidth
    const right = (options.to - options.min) / (options.max - options.min) * innerWidth
    options.nextBtn.style.left = right + 'px'
    options.progress.style.left = left + 'px'
    options.progress.style.width = right - left + 'px'

    if (options.type == 'double') {
      options.prevBtn.style.left = left + 'px'
    }

    if (options.type == 'double' && options.renderValue) options.renderValue.innerHTML = Math.floor(options.from) + ' — ' + Math.floor(options.to)
    if (options.type == 'single' && options.renderValue) options.renderValue.innerHTML = Math.floor(options.to)

    if (options.renderSign) {
      const sign = options.renderSign
      const signWidth = sign.getBoundingClientRect().width
      let signLeft = 0

      if (options.type == 'single') {
        signLeft = right - signWidth / 2

      } else if (options.type == 'double') {
        signLeft = left + (right - left) / 2 - signWidth / 2

      }

      if (signLeft < 0) signLeft = 0
      if ((signLeft + signWidth) > innerWidth) signLeft = innerWidth - signWidth
      sign.style.left = signLeft + 'px'
    }


  }




}


const init = () => {
  const range = Range('.form-range', {
    onChange: (options) => {
      const field = options.target.closest('.form-field')
      const from = field.querySelector('.form-range-from')
      const to = field.querySelector('.form-range-to')
      const formatter = new Intl.NumberFormat('ru-RU')

      let fromValue = options.from
      let toValue = options.to

      fromValue = parseInt(fromValue)
      toValue = parseInt(toValue)

      if (from) from.innerHTML = formatter.format(fromValue)
      if (to) to.innerHTML = formatter.format(toValue)
    }
  })


}

export default {
  init
}
