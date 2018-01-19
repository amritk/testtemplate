<template lang="pug">
    button(@click="clicked") shoot
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class BaseButton extends Vue {
    clicked () {
        alert('You miss 100% of the shots you don\'t take')
    }
}
</script>

<style lang="stylus" scoped>
button
    background-color red
</style>
