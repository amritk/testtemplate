declare module 'vuetify' { export default any }
declare module 'vuetify/es5/components/Vuetify' { export default any }
declare module 'vuetify/es5/components/VApp' { export default any }
declare module 'vuetify/es5/components/VAvatar' { export default any }
declare module 'vuetify/es5/components/VBtn' { export default any }
declare module 'vuetify/es5/components/VBtnToggle' { export default any }
declare module 'vuetify/es5/components/VCard' { export default any }
declare module 'vuetify/es5/components/VDialog' { export default any }
declare module 'vuetify/es5/components/VForm' { export default any }
declare module 'vuetify/es5/components/VGrid' { export default any }
declare module 'vuetify/es5/components/VIcon' { export default any }
declare module 'vuetify/es5/components/VProgressLinear' { export default any }
declare module 'vuetify/es5/components/VSelect' { export default any }
declare module 'vuetify/es5/components/VSnackbar' { export default any }
declare module 'vuetify/es5/components/VTextField' { export default any }
declare module 'vuetify/es5/components/VToolbar' { export default any }
declare module 'vuetify/es5/components/VTooltip' { export default any }
declare module 'vuetify/es5/components/transitions' { export default any }
declare module 'lodash.debounce' { export default any }
declare module 'raven-js/plugins/vue' { export default any }
declare module '@panter/vue-i18next' { export default any }
declare module '*.json' { export default any }
declare module 'google-maps-infobox' { export default any }
declare module 'vuex-persistedstate' { export default any }
declare module 'vue-async-computed'
declare module 'sweet-scroll' { export default any }
declare module '*.vue' {
    import Vue from 'vue'
    export default Vue
}
declare var ImageViewer: Function

// Google Analytics
declare namespace UniversalAnalytics {
    interface ga {
        trackView (page: string): void;
        trackEvent (category: string, action: string, label: string, value?: number): void;
    }
}

// Cordova
interface CordovaPlugins {
    permissions: any
    SecureStorage: any
}
interface Cordova {
    file: any
}
declare var device: any
