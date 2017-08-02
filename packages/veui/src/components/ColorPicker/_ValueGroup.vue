<template>
<div class="veui-color-value-group">
  <div class="veui-color-value-group-item veui-color-value-group-item-hex">
    <div class="veui-color-value-group-name">Hex</div>
    <veui-color-value-hex :hue="hue" :saturation="saturation" :lightness="lightness"
      @update:hsl="handleHslValueUpdate"
    ></veui-color-value-hex>
  </div>
  <div class="veui-color-value-group-item veui-color-value-group-item-rgb">
    <div class="veui-color-value-group-name">RGB</div>
    <veui-color-value-rgb :hue="hue" :saturation="saturation" :lightness="lightness"
      @update:hsl="handleHslValueUpdate"
    ></veui-color-value-rgb>
  </div>
</div>
</template>

<script>
import ValueRgb from './_ValueRgb'
import ValueHex from './_ValueHex'

export default {
  name: 'ColorValueGroup',
  components: {
    'veui-color-value-rgb': ValueRgb,
    'veui-color-value-hex': ValueHex
  },
  props: {
    hue: Number,
    saturation: Number,
    lightness: Number
  },
  data () {
    return {}
  },
  computed: {},
  methods: {
    handleHslValueUpdate (...hsl) {
      this.$emit('update:hsl', ...hsl)
    }
  }
}
</script>
