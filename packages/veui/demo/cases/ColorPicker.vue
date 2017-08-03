<template>
  <article>
    <h1><code>&lt;veui-color-picker&gt;</code></h1>

    <section class="color-text" :style="{
      color,
      'text-shadow': `1px 1px 1px ${kolor}`
    }">{{ color }}</section>

    <h2>色样</h2>
    <section class="color-swatches">
      <veui-color-swatch v-model="color" ui="small hex alpha"></veui-color-swatch>
      <veui-color-swatch :color="color" ui="normal rgb alpha"></veui-color-swatch>
      <veui-color-swatch :color="color" ui="normal hsl" :readonly="true"></veui-color-swatch>
    </section>

    <h2>取色器</h2>
    <p>
      <label style="float: right">
        <input type="checkbox" v-model="showPalette" /> 带调色板？
      </label>
    </p>
    <section class="color-pickers">
      <veui-color-picker v-model="color" ui="small">
        <!-- 色板作为 slot 传入 -->
        <veui-color-palette :colors="colors" v-if="showPalette"
          @select="handlePaletteColorSelect"
          @remove="handlePaletteColorRemove"
          @add="handlePaletteColorAdd"
        >
          <div style="margin: 10px 5px 5px 5px;">
            <veui-button ui="aux small" style="width: 100%">高级选项</veui-button>
          </div>
        </veui-color-palette>
      </veui-color-picker>
    </section>
    <section class="color-pickers">
      <!-- v-model="color" OR :color.sync OR @update:color="val => color = val" -->
      <veui-color-picker v-model="color" ui="large">
        <veui-color-palette :colors="colors" v-if="showPalette"
          @select="handlePaletteColorSelect"
          @remove="handlePaletteColorRemove"
          @add="handlePaletteColorAdd"
        ></veui-color-palette>
      </veui-color-picker>
    </section>
    <section class="color-pickers">
      <veui-color-picker v-model="color">
        <veui-color-palette :colors="colors" ui="small" v-if="showPalette"
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
import tinycolor from 'tinycolor2'
import { ColorSwatch, ColorPicker, ColorPalette, Button } from 'veui'

export default {
  name: 'color-picker-demo',
  components: {
    'veui-button': Button,
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
  computed: {
    kolor () {
      let {r, g, b} = tinycolor(this.color).toRgb()
      return tinycolor({
        r: 0xFF - r,
        g: 0xFF - g,
        b: 0xFF - b
      }).toRgbString()
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
.color-text {
  font-family: monospace;
  font-size: 1.4em;
}
.color-swatches {
  width: 340px;
}
.veui-color-swatch {
  margin: 10px 0;
}
</style>
