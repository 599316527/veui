<template>
<div class="veui-color-value-alpha-group" :class="{
  ['veui-color-value-alpha-group-' + variant]: true
}">
  <div class="veui-color-value-alpha-group-values">
    <div class="veui-color-value-alpha-group-color">
      <component :is="'veui-color-value-' + variant"
        :hue="hue" :saturation="saturation" :lightness="lightness"
        @update:hsl="handleHslValueUpdate"
      ></component>
    </div>
    <div class="veui-color-value-alpha-group-separator"></div>
    <div class="veui-color-value-alpha-group-alpha">
      <veui-color-value-alpha :alpha="alpha"
        @update:alpha="handleAlphaValueUpdate"
      ></veui-color-value-alpha>
    </div>
  </div>
  <div class="veui-color-value-alpha-group-text">
    <div class="veui-color-value-alpha-group-text-rgb" v-if="variant === 'rgb'">
      <div>R</div><div>G</div><div>B</div>
    </div>
    <div class="veui-color-value-alpha-group-text-hsl" v-else-if="variant === 'hsl'">
      <div>H</div><div>S</div><div>L</div>
    </div>
    <div class="veui-color-value-alpha-group-text-hex" v-else-if="variant === 'hex'">
      <div>HEX</div>
    </div>
    <div class="veui-color-value-alpha-group-text-alpha">
      <div>A</div>
    </div>
  </div>
</div>
</template>

<script>
import ValueHsl from './_ValueHsl'
import ValueRgb from './_ValueRgb'
import ValueHex from './_ValueHex'
import ValueAlpha from './_ValueAlpha'

const variants = ['hex', 'rgb', 'hsl']

export default {
  name: 'ColorValueAlphaGroup',
  components: {
    'veui-color-value-hsl': ValueHsl,
    'veui-color-value-rgb': ValueRgb,
    'veui-color-value-hex': ValueHex,
    'veui-color-value-alpha': ValueAlpha
  },
  props: {
    hue: Number,
    saturation: Number,
    lightness: Number,
    alpha: Number
  },
  data () {
    return {
      variant: 'rgb'
    }
  },
  computed: {

  },
  methods: {
    handleHslValueUpdate (...hsl) {
      this.$emit('update:hsl', ...hsl)
    },
    handleAlphaValueUpdate (val) {
      this.$emit('update:alpha', val)
    }
  }
}
</script>
