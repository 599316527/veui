<template>
  <article>
    <h1><code>&lt;veui-color-picker&gt;</code></h1>

    <h2>色样</h2>
    <section class="color-swatches">
      <veui-color-swatch :color="color" ui="hex"></veui-color-swatch>
      <!-- <div class="color-text">{{ color }}</div> -->
    </section>

    <h2>取色器</h2>
    <section class="color-pickers">
      <veui-color-picker v-model="color" ui="barren"></veui-color-picker>
    </section>
    <section class="color-pickers">
      <!-- v-model="color" OR :color.sync OR @update:color="val => color = val" -->
      <veui-color-picker v-model="color" ui="luxuriant"></veui-color-picker>
    </section>
    <section class="color-pickers">
      <veui-color-picker v-model="color"></veui-color-picker>
    </section>

  </article>
</template>

<script>
import bus from '../bus'
import { ColorSwatch, ColorPicker } from 'veui'

export default {
  name: 'color-picker-demo',
  components: {
    'veui-color-swatch': ColorSwatch,
    'veui-color-picker': ColorPicker
  },
  data () {
    return {
      color: 'hsla(123, 54%, 43%, 0.9)'
    }
  },
  methods: {

  },
  mounted () {
    this.$children.forEach(child => {
      child.$on('click', () => {
        bus.$emit('log', child.$el.getAttribute('ui'))
      })
    })
  }
}
</script>

<style lang="less" scoped>
section {
  margin-bottom: 3em;
}
</style>
