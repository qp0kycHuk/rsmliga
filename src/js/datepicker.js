
import AirDatepicker from 'air-datepicker';
import localeRu from 'air-datepicker/locale/ru';


function isTouchDevice() {
  return (('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0) ||
    (navigator.msMaxTouchPoints > 0));
}

const init = (root, options = {}) => {

  const pickers = Array.from(root.querySelectorAll('[data-datepicker]'))
  const minEnd = new Date()
  minEnd.setDate(minEnd.getDate() + 2)

  const pickerOptions = {
    locale: localeRu,
    maxDate: new Date(),
    dateFormat: 'dd.MM.yyyy',
    isMobile: isTouchDevice(),
    autoClose: true,
    ...options
  }



  pickers.forEach(picker => {
    new AirDatepicker(picker, {
      ...pickerOptions,
      position: picker.getAttribute('data-position') || 'bottom center',
    })

  });



}

export default { init }