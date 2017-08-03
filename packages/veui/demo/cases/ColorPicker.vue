<template>
  <article>
    <h1><code>&lt;veui-color-picker&gt;</code></h1>

    <h2>色样</h2>
    <section class="color-swatches">
      <veui-color-swatch :color="color" ui="hex"></veui-color-swatch>
      <veui-color-swatch :color="color" ui="rgb"></veui-color-swatch>
      <veui-color-swatch :color="color" ui="hsl"></veui-color-swatch>
    </section>

    <h2>取色器</h2>
    <p>
      <label style="float: right">
        <input type="checkbox" v-model="showPalette" /> 带调色板？
      </label>
    </p>
    <section class="color-pickers">
      <veui-color-picker v-model="color" ui="barren">
        <!-- 色板作为 slot 传入 -->
        <veui-color-palette :colors="colors" v-if="showPalette"
          @select="handlePaletteColorSelect"
          @remove="handlePaletteColorRemove"
          @add="handlePaletteColorAdd"
        ></veui-color-palette>
      </veui-color-picker>
    </section>
    <section class="color-pickers">
      <!-- v-model="color" OR :color.sync OR @update:color="val => color = val" -->
      <veui-color-picker v-model="color" ui="luxuriant">
        <veui-color-palette :colors="colors" v-if="showPalette"
          @select="handlePaletteColorSelect"
          @remove="handlePaletteColorRemove"
          @add="handlePaletteColorAdd"
        ></veui-color-palette>
      </veui-color-picker>
    </section>
    <section class="color-pickers">
      <veui-color-picker v-model="color">
        <veui-color-palette :colors="colors" ui="slim" v-if="showPalette"
          @select="handlePaletteColorSelect"
          @remove="handlePaletteColorRemove"
          @add="handlePaletteColorAdd"
        ></veui-color-palette>
      </veui-color-picker>
    </section>

  </article>
</template>

<script>
import bus from '../bus'
import { ColorSwatch, ColorPicker, ColorPalette } from 'veui'

export default {
  name: 'color-picker-demo',
  components: {
    'veui-color-swatch': ColorSwatch,
    'veui-color-picker': ColorPicker,
    'veui-color-palette': ColorPalette
  },
  data () {
    return {
      showPalette: true,
      color: 'hsla(123, 54%, 43%, 0.9)',
      colors: [
        '#D0021B',
        '#F5A623',
        '#F8E71C',
        '#8B572A',
        '#7ED322',
        '#417505',
        '#BD10E0',
        '#9014FE',
        '#4A90E2',
        '#50E3C2',
        '#B8E986'
      ]
    }
  },
  methods: {
    handlePaletteColorSelect (i) {
      this.color = this.colors[i]
    },
    handlePaletteColorRemove (i) {
      this.colors.splice(i, 1)
    },
    handlePaletteColorAdd () {
      this.colors.push(this.color)
    }
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
.color-swatches {
  width: 340px;
}
.veui-color-swatch {
  margin: 10px 0;
}
</style>
