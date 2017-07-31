<template>
  <article>
    <h1><code>&lt;veui-color-picker&gt;</code></h1>
    <section class="color-swatches">
      <veui-color-swatch color="#4a90e2"></veui-color-swatch>
      <veui-color-swatch color="rgba(74, 144, 226, .7)"></veui-color-swatch>
      <veui-color-swatch color="rgba(74, 144, 226, .3)"></veui-color-swatch>
    </section>
    <section class="color-pickers">
      <veui-color-picker color="#4a90e2"></veui-color-picker>
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

  .veui-color-swatch {
    margin-right: 2em;
  }
}
</style>
