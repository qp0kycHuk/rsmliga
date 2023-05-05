const Vue = require('vue/dist/vue.esm-bundler');
import RootComponent from './App.vue'


window.addEventListener('DOMContentLoaded', () => {
    const app = Vue.createApp({
        components: { RootComponent },
        template: '<RootComponent></RootComponent>'
    })
    if (document.getElementById('conference-map')) {
        app.mount('#conference-map')
    }

})