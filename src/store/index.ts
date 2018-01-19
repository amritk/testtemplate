import Vue from 'vue'
import Vuex from 'vuex'
import config from 'src/libs/config'
import createPersistedState from 'vuex-persistedstate'
import example, { IExampleState } from './example'

Vue.use(Vuex)

export interface IRootState {
    example: IExampleState
}

// Persist state into local storage
const plugins = []
const persistedstateOptions = {
    paths: [
        'example'
    ]
}
if (process.env.VUE_ENV === 'client')
    plugins.push(createPersistedState(persistedstateOptions))

const storeOptions = {
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        example
    },
    plugins,
    strict: config.debug
}

// Factory for SSR new instances
export function createStore () {
    return new Vuex.Store(storeOptions)
}

// Singleton for Client side store
export const clientStore = new Vuex.Store(storeOptions)
