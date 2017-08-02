<template>
  <article>
    <h1><code>&lt;veui-color-picker&gt;</code></h1>
    <section class="color-swatches">
      <veui-color-swatch :color="color"></veui-color-swatch>
      <div class="color-text">{{ color }}</div>
    </section>
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
  margin-bottom: 2em;
}
.color-swatches {
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  .color-text {
    margin-left: 1.2em;
    font-size: 1.2em;
    font-family: monospace;
  }
}
</style>
