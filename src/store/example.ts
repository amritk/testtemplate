import { GetterTree, MutationTree, ActionTree, Module } from 'vuex'
import { IRootState } from '.'

export interface IExampleState {
    stuff: string
}

const state: IExampleState = {
    stuff: null
}

const getters: GetterTree<IExampleState, IRootState> = {
    stuff: state => state.stuff
}

const mutations: MutationTree<IExampleState> = {
    clearStuff: (state: IExampleState) => state.stuff = null,
    setStuff: (state: IExampleState, stuff: string) => state.stuff = stuff
}

const actions: ActionTree<IExampleState, IRootState> = {
    clearSet ({ commit }, stuff) {
        commit('clearStuff')
        commit('setStuff', stuff)
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
} as Module<IExampleState, IRootState>
