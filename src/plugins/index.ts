/**
 * Plugins added here will be available globally
 */
import Vue, { PluginObject } from 'vue'

const EventBus = new Vue()
const GlobalPlugins = {
    // The install method is all that needs to exist on the plugin object.
    // It takes the global Vue object as well as user-defined options.
    install (Vue, _options: {}) {
        // We call Vue.mixin() here to inject functionality into all components.
        Vue.mixin({
            // Anything added to a mixin will be injected into all components.
            // In this case, the mounted() method runs when the component is added to the DOM.
            // beforeMount () {
            //     const { asyncData } = this.$options
            //     if (asyncData) {
            //         // assign the fetch operation to a promise
            //         // so that in components we can do `this.dataPromise.then(...)` to
            //         // perform other tasks after data is ready
            //         this.dataPromise = asyncData({
            //             store: this.$store,
            //             route: this.$route
            //         })
            //     }
            // }
            // beforeRouteUpdate (to, _from, next) {
            //     const { asyncData } = this.$options
            //     if (asyncData) {
            //         asyncData({
            //             store: this.$store,
            //             route: to
            //         }).then(next).catch(next)
            //     } else {
            //         next()
            //     }
            // }
        })

        // Event bus
        Vue.prototype.$bus = EventBus
    }
} as PluginObject<{}>

// Register globally
Vue.use(GlobalPlugins)
