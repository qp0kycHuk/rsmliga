const Vue = require('vue/dist/vue.esm-bundler');
import RootComponent from './App.vue'


window.addEventListener('DOMContentLoaded', () => {
    const app = Vue.createApp({
        components: { RootComponent },
        template: '<RootComponent></RootComponent>'
    })
    app.mount('#conference-map')

})