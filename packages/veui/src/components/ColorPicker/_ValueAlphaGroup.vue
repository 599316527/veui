<template>
<div class="veui-color-value-alpha-group">
  <div class="veui-color-value-alpha-group-color">

  </div>
  <div class="veui-color-value-alpha-group-alpha">

  </div>
</div>
</template>

<script>
import ValueHsl from './_ValueHsl'
import ValueRgb from './_ValueRgb'
import ValueHex from './_ValueHex'

export default {
  name: 'ColorValueAlphaGroup',
  components: {
    'veui-color-value-hsl': ValueHsl,
    'veui-color-value-rgb': ValueRgb,
    'veui-color-value-hex': ValueHex
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
    handleHueValueUpdate (val) {
      this.$emit('update:hue', val)
    },
    handleSaturationValueUpdate (val) {
      this.$emit('update:saturation', val)
    },
    handleLightnessValueUpdate (val) {
      this.$emit('update:lightness', val)
    },
    handleAlphaValueUpdate (val) {
      this.$emit('update:alpha', val)
    }
  }
}
</script>
