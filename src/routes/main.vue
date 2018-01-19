<template lang="pug">
    div.main
        I went to a fight the other night, and a hockey game broke out.
        base-button
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import meta from 'src/libs/meta'

@Component
export default class MainComponent extends Vue {
    created () {
        // Meta has to be called to get access to the ssr context, or we can pass it in
        meta.setTags(this.$ssrContext, {
            title: 'Dynamic',
            desc: 'Dynamically set SSR meta tag'
        })
    }

    mounted () {
        console.log('This component has loaded, congrats! This is only available on the client.')
    }
}
</script>

<style lang="stylus" scoped>
.main
    font-size 1.2rem
    color red
</style>
