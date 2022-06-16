$(".-range-slider-").ionRangeSlider({
  hide_min_max: true,
  hide_from_to: true,
  skin: "round",
  extra_classes: 'form-range-slider',
  onChange: showRangeData,
  onStart: showRangeData
});

function showRangeData(data) {
  const input = data.input[0]
  const field = input.closest('.form-field')
  const fromNode = field.querySelector('.form-range-from')
  const toNode = field.querySelector('.form-range-to')
  const fromInput = field.querySelector('.form-range-from-input')
  const toInput = field.querySelector('.form-range-to-input')
  const from = data.from;
  let formatFrom = from;
  const to = data.to;
  let formatTo = to;

  if (input.getAttribute('data-format') === 'money') {
    formatFrom = Intl.NumberFormat('ru-RU').format(from)
    formatTo = Intl.NumberFormat('ru-RU').format(to)
  }


  fromNode && (fromNode.innerHTML = formatFrom)
  toNode && (toNode.innerHTML = formatTo)

  fromInput && (fromInput.value = from)
  toInput && (toInput.value = to)
}