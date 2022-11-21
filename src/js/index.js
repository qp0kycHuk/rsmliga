import AirDatepicker from 'air-datepicker';
import Swiper, { Navigation, Pagination, Scrollbar, Autoplay, Grid, Thumbs, EffectFade, Lazy } from 'swiper';
import tab from 'npm-kit-tab';
import toggle from 'npm-kit-toggle';
import ripple from 'npm-kit-ripple';
import fancybox from "./fancybox";
import colorSelect from './color-select'
import showPass from "./show-pass";
import rangeSlider from './range-slider';
import theme from './theme';
// import conferenceMap from './conference-map';

import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import 'tippy.js/animations/perspective.css';
import 'swiper/css';
import 'npm-kit-ripple/index.css';
import 'air-datepicker/air-datepicker.css';
import '../ui/ui-reset.scss';
import '../ui/ui-core.scss';
import '../scss/frontend--fonts.scss';
import '../scss/frontend--style.scss';

window.AirDatepicker = AirDatepicker;
window.Swiper = Swiper;
window.ripple = ripple;
Swiper.use([Navigation, Pagination, Scrollbar, Autoplay, Grid, Thumbs, EffectFade, Lazy]);
Swiper.defaults.touchStartPreventDefault = false;


window.addEventListener('DOMContentLoaded', () => loadHandler())
document.addEventListener('toggleopen', menuOpenHandler)
document.addEventListener('toggleclose', menuCloseHandler)


// menu toggle handlers
function menuOpenHandler(event) {
    if (event.detail.target.id == 'mobile-menu') {
        document.body.classList.add('menu-opened')
    }
    if (event.detail.target.classList.contains('filter')) {
        document.body.classList.add('filter-open')
    }
}

function menuCloseHandler(event) {
    if (event.detail.target.id == 'mobile-menu') {
        document.body.classList.remove('menu-opened')
    }
    if (event.detail.target.classList.contains('filter')) {
        document.body.classList.remove('filter-open')
    }
}

function loadHandler() {
    fancybox.init();
    tab.init();
    toggle.init();
    ripple.init();
    colorSelect.init();
    showPass.init();
    rangeSlider.init()
    theme.init();

    ripple.attach('.btn')
    ripple.attach('.waved')
    ripple.attach('.news-card')
    ripple.attach('.slider-btn')
    ripple.deAttach('.btn--link')

    if (document.getElementById('conference-map')) {
        import('./conference-map').then((conferenceMap) => {
            conferenceMap.default.init()
        })
    }
}


document.addEventListener('click', (event) => {
    if (!event.target.closest('.-print-from-modal-')) return;

    const dialog = event.target.closest('.fancybox__container')
    dialog.classList.add('fancybox-print-modal')
    document.body.classList.add('body-print-modal')
    window.print()
    dialog.classList.remove('fancybox-print-modal')
    document.body.classList.remove('body-print-modal')
})

document.addEventListener('click', (event) => {
    if (!event.target.closest('.admin-select')) return;
    if (!event.target.closest('[data-value]')) return;

    const cover = event.target.closest('.admin-select')
    const input = cover.querySelector('.admin-select-input')
    const textNode = cover.querySelector('.admin-select-value')
    const value = event.target.closest('[data-value]').getAttribute('data-value')
    const text = event.target.closest('[data-text]')?.getAttribute('data-text') || value

    if (!input) return
    textNode.textContent = text
    input.value = value

})

document.addEventListener('input', (event) => {
    if (!event.target.closest('.admin-select')) return;

    const cover = event.target.closest('.admin-select')
    const input = cover.querySelector('.admin-select__select')
    const textNode = cover.querySelector('.admin-select-value')

    const option = input.options[input.options.selectedIndex]

    const value = input.value
    const text = option.text || value

    if (!input) return
    textNode.textContent = text
    input.value = value

})