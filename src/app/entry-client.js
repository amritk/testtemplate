import { createApp } from './app'
import config from 'src/libs/config.ts'

const { app, router, store } = createApp()

// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
// prevent restoring from these keys which load from client side local storage
// these persisted stores will get copied over from the server to the client store
const persisted = ['example']
const replace = {}
if (window.__INITIAL_STATE__) {
    persisted.forEach(key => {
        replace[key] = store.state[key]
    })
    store.replaceState(Object.assign({}, window.__INITIAL_STATE__, replace))
}

// wait until router has resolved all async before hooks
// and async components...
router.onReady(() => {
    // Add router hook for handling asyncData.
    // Doing it after initial route is resolved so that we don't double-fetch
    // the data that we already have. Using router.beforeResolve() so that all
    // async components are resolved.
    router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to)
        const prevMatched = router.getMatchedComponents(from)
        let diffed = false
        const activated = matched.filter((c, i) => {
            return diffed || (diffed = prevMatched[i] !== c)
        })
        if (!activated.length)
            return next()
        Promise.all(
            activated.map(c => {
                if (c.asyncData)
                    return c.asyncData({ store, route: to })
            })
        )
            .then(next)
            .catch(next)
    })

    // actually mount to DOM
    app.$mount('#app')
})
