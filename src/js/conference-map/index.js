const Vue = require('vue/dist/vue.esm-bundler');
import RootComponent from './App.vue'




function init() {
    const app = Vue.createApp({
        components: { RootComponent },
        template: '<RootComponent></RootComponent>'
    })
    app.mount('#conference-map')

    return app
}



export default { init }