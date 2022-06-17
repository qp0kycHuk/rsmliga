import { Fancybox } from "@fancyapps/ui";
import ru from "@fancyapps/ui/src/Fancybox/l10n/ru"
import "@fancyapps/ui/dist/fancybox.css";

const init = () => {
  Fancybox.defaults.trapFocus = false
  Fancybox.defaults.autoFocus = false
  Fancybox.defaults.placeFocusBack = false
  Fancybox.defaults.l10n = ru
  Fancybox.defaults.template.spinner = '<div class="progress progress-circle"> </div>'

  Fancybox.bind('[data-fancybox-modal]', {
    type: 'ajax',
    dragToClose: false,
    mainClass: 'fancybox-custom-modal',
    
  })


  Fancybox.modal = {}
  Fancybox.modal.open = (src, options) => {
    Fancybox.show([{
      src: src,
      ...options
    }], {
      type: 'ajax',
      dragToClose: false,
      mainClass: 'fancybox-custom-modal',
      ...options
    })
  }
  
  window.Fancybox = Fancybox
}

export default { init }