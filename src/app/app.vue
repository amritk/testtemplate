<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'

@Component
export default class Explore extends Vue {
    transitionName = 'slide-right'

    @Watch('$route')
    function (_to: Route, _from: Route) {
        // Do something on every route change
    }

    created () {
        // Do something on the first route change
    }
}
</script>

<style lang="stylus">
@import '~styles/general'
</style>
