<template>
<div class="veui-color-value-alpha-group" :ui="variant">
  <div class="veui-color-value-alpha-group-values">
    <div class="veui-color-value-alpha-group-color">
      <component :is="'veui-color-value-' + variant" :readonly="readonly"
        :hue="hue" :saturation="saturation" :brightness="brightness"
        @update:hsb="handleHsbValueUpdate"
      ></component>
    </div>
    <div class="veui-color-value-alpha-group-separator" @click="toggleColorFormatVariant">
      <div class="veui-color-value-alpha-group-separator-dot"></div>
      <div class="veui-color-value-alpha-group-separator-dot"></div>
      <div class="veui-color-value-alpha-group-separator-dot"></div>
    </div>
    <div class="veui-color-value-alpha-group-alpha">
      <veui-color-value-alpha :value="alpha" :percentage="true" :readonly="readonly"
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
    brightness: Number,
    alpha: Number,
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      variant: 'rgb'
    }
  },
  computed: {

  },
  methods: {
    handleHsbValueUpdate (hsb) {
      this.$emit('update:hsb', hsb)
    },
    handleAlphaValueUpdate (val) {
      this.$emit('update:alpha', val)
    },
    toggleColorFormatVariant () {
      let i = variants.indexOf(this.variant)
      i = (i + 1) % variants.length
      this.variant = variants[i]
    }
  }
}
</script>
