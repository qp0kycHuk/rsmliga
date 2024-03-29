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
import phonemask from './phonemask';
import teamLkTable from './team-lk-table';
import copy from 'copy-to-clipboard'
import * as Vue from 'vue/dist/vue.esm-bundler.js'
window.Vue = Vue
// import conferenceMap from './conference-map';
import tippy, { animateFill } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import 'tippy.js/animations/perspective.css';
import 'tippy.js/dist/backdrop.css';
import 'tippy.js/animations/shift-away.css';
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
fancybox.init();

function loadHandler() {
    tab.init();
    toggle.init();
    ripple.init();
    colorSelect.init();
    showPass.init();
    phonemask.init('[type="tel"]');
    phonemask.init('#soa-property-3');
    rangeSlider.init()
    theme.init();
    teamLkTable.init();

    ripple.attach('.btn')
    ripple.attach('.waved')
    ripple.attach('.news-card')
    ripple.attach('.slider-btn')
    ripple.deAttach('.btn--link')

    document.querySelectorAll('[data-copy]').forEach((item) => item.addEventListener('click', copyСlickHandler))

    tippy('[data-tippy-content]', {
        placement: 'bottom-end',
        animateFill: true,
        plugins: [animateFill],
    });

    const typpies = document.querySelectorAll('[data-tippy-content]')
    typpies.forEach((item) => {
        item.addEventListener('click', (e) => e.preventDefault())
    })
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
    if (event.target.closest('.admin-select')) {

        const cover = event.target.closest('.admin-select')
        const input = cover.querySelector('.admin-select__select')
        const textNode = cover.querySelector('.admin-select-value')

        const option = input.options[input.options.selectedIndex]

        const value = input.value
        const text = option.text || value

        if (!input) return
        textNode.textContent = text
        input.value = value
    }

})


function copyСlickHandler(event) {
    event.stopPropagation()
    const target = event.target

    const item = target?.closest('[data-copy]')

    if (item) {
        const text = item.getAttribute('data-copy')
        const textContent = item.getAttribute('data-text') || item.innerHTML

        if (text) {
            copy(text)
            item.innerHTML = 'Скопировано!'
            item.classList.add('color-green')

            setTimeout(() => {
                item.classList.remove('color-green')
                item.innerHTML = textContent
            }, 2000)
        }
    }
}
