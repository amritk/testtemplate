import Vue, { ComponentOptions } from 'vue'
import AcceptLanguage from 'accept-language'
import appComponent from 'src/app/app.vue'
import config from 'src/libs/config'
import translations from 'base/locales/translations.json'
import i18next from 'i18next'
import VueI18Next from '@panter/vue-i18next'
import { clientRouter, createRouter } from 'src/routes'
import { clientStore, createStore } from 'src/store'
import { sync } from 'vuex-router-sync'
import { IOptions as IMetaOptions } from 'src/libs/meta'
import 'src/plugins'
import 'src/components'

// Config
Vue.config.devtools = config.debug
Vue.config.performance = config.debug
Vue.config.productionTip = config.debug
Vue.config.silent = !config.debug

// Globally include any filters here
// filters.forEach(filter => {
//     Vue.filter(filter.name, filter.filter)
// })

// Figure out locale
let langs = [] as string[]
const translated = Object.keys(translations)
if (process.env.VUE_ENV === 'client') {
    if (navigator.languages) langs = langs.concat(navigator.languages)
    if (navigator.language) langs = langs.concat(navigator.language)
}
// Add accepted langs
else
    AcceptLanguage.languages(translated)

// Make sure languages are in correct format
langs = langs.map((lang) => {
    return lang.replace(/_[^_]+$/, ($1: string) => {
        return $1.toUpperCase()
    })
})

// Grab the first one in the list that we have translated
let locale = langs.find(lang => translated.find(t => lang === t) !== undefined)
if (typeof locale === 'undefined') locale = 'en-CA'

// Set fallbacks
let fallbacks = ['en-CA']
if (locale === 'fr-FR')
    fallbacks = ['fr-CA', 'en-CA']
if (locale === 'fr-CA')
    fallbacks = ['fr-FR', 'en-CA']

// Translations ya'll
Vue.use(VueI18Next)
i18next.init({
    lng: locale,
    debug: config.debug,
    fallbackLng: fallbacks,
    ns: ['generic'],
    defaultNS: 'generic',
    resources: translations
})
const i18n = new VueI18Next(i18next)

export interface ISSRContext {
    meta: IMetaOptions
    cookies: {
        authToken: string
        locale: string
    },
    fullUrl: string,
    rawLanguage: string,
    url: string
}
interface IComponentOptions extends ComponentOptions<Vue> {
    ssrContext: ISSRContext
}

// Expose a factory function that creates a fresh set of store, router,
// app instances on each call (which is called for each SSR request)
export function createApp (ssrContext?: ISSRContext) {
    // Check for meta
    if (ssrContext && typeof ssrContext.meta === 'undefined')
        ssrContext.meta = {}

    // Set language server side per session
    if (process.env.VUE_ENV === 'server' && ssrContext && ssrContext.rawLanguage)
        i18next.changeLanguage(AcceptLanguage.get(ssrContext.rawLanguage))

    let router
    let store
    if (process.env.VUE_ENV === 'server') {
        router = createRouter()
        store = createStore()
    }
    else {
        router = clientRouter
        store = clientStore
    }

    // sync the router with the vuex store.
    // this registers `store.state.route`
    sync(store, router)

    // create the app instance.
    // here we inject the router, store and ssr context to all child components,
    // making them available everywhere as `this.$router` and `this.$store`.
    const app = new Vue({
        router,
        store,
        ssrContext,
        i18n,
        render: h => h(appComponent)
    } as IComponentOptions)

    // expose the app, the router and the store.
    // note we are not mounting the app here, since bootstrapping will be
    // different depending on whether we are in a browser or on the server.
    return { app, router, store }
}
