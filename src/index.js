import AirDatepicker from 'air-datepicker';
import Swiper, { Navigation, Pagination, Scrollbar, Autoplay, Grid, Thumbs, EffectFade, Lazy } from 'swiper';
import tab from 'npm-kit-tab';
import toggle from 'npm-kit-toggle';
import ripple from 'npm-kit-ripple';
import fancybox from "./js/fancybox";
import colorSelect from './js/color-select'
import showPass from "./js/show-pass";

import 'swiper/css';
import 'npm-kit-ripple/index.css';
import 'air-datepicker/air-datepicker.css';
import './ui/ui-reset.scss';
import './ui/ui-core.scss';
import './scss/frontend--fonts.scss';
import './scss/frontend--style.scss';

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
}
function menuCloseHandler(event) {
    if (event.detail.target.id == 'mobile-menu') {
        document.body.classList.remove('menu-opened')
    }
}

function loadHandler() {
    fancybox.init();
    tab.init();
    toggle.init();
    ripple.init();
    colorSelect.init();
    showPass.init();

    ripple.attach('.btn')
    ripple.attach('.waved')
    ripple.attach('.news-card')
    ripple.attach('.slider-btn')
    ripple.deAttach('.btn--link')
}