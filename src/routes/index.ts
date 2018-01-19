/**
 * Wire up all the routes, they all reside in separate grouped files
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import main from './main.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: main
    }
]

// Factory for SSR new instances
export function createRouter () {
    const router = new VueRouter({
        mode: 'history',
        routes
    })
    return router
}

// Singleton for Client side store
export const clientRouter = new VueRouter({
    mode: 'history',
    routes
})
