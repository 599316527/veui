<template>
<div class="veui-color-value-hsl">
  <div class="veui-color-value">
    <veui-input type="text" ref="hueValue" :value="hue"
      @input="handleHueValueInput"
      @blur="handleValueBlur"
    ></veui-input>
  </div>
  <div class="veui-color-value">
    <veui-input type="text" ref="saturationValue" :value="saturation"
      @input="handleSaturationValueInput"
      @blur="handleValueBlur"
    ></veui-input>
  </div>
  <div class="veui-color-value">
    <veui-input type="text" ref="lightnessValue" :value="lightness"
      @input="handleLightnessValueInput"
      @blur="handleValueBlur"
    ></veui-input>
  </div>
</div>
</template>

<script>
import Input from '../Input'

export default {
  name: 'ColorValueHsl',
  components: {
    'veui-input': Input
  },
  props: {
    hue: Number,
    saturation: Number,
    lightness: Number
  },
  data () {
    return {

    }
  },
  computed: {},
  methods: {
    handleHueValueInput (val) {
      val = parseInt(val, 10)
      val = Math.min(359, Math.max(0, val % 360))
      if (isNaN(val)) {
        return
      }
      this.$emit('update:hsl', val, this.saturation, this.lightness)
    },
    handleSaturationValueInput (val) {
      val = parseFloat(val, 10)
      val = Math.min(1, Math.max(0, val))
      if (isNaN(val)) {
        return
      }
      this.$emit('update:hsl', this.hue, val, this.lightness)
    },
    handleLightnessValueInput (val) {
      val = parseFloat(val, 10)
      val = Math.min(1, Math.max(0, val))
      if (isNaN(val)) {
        return
      }
      this.$emit('update:hsl', this.hue, this.saturation, val)
    },
    handleValueBlur () {
      this.$refs.hueValue.$refs.input.value = this.hue
      this.$refs.saturationValue.$refs.input.value = this.saturation
      this.$refs.lightnessValue.$refs.input.value = this.lightness
    }
  }
}
</script>
