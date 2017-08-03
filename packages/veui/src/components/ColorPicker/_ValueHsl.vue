<template>
<div class="veui-color-value-hsl">
  <div class="veui-color-value">
    <veui-input type="text" ref="hueValue" :value="hsl.h"
      @input="handleHueValueInput"
      @blur="handleValueBlur"
    ></veui-input>
  </div>
  <div class="veui-color-value">
    <veui-input type="text" ref="saturationValue" :value="hsl.s"
      @input="handleSaturationValueInput"
      @blur="handleValueBlur"
    ></veui-input>
  </div>
  <div class="veui-color-value">
    <veui-input type="text" ref="lightnessValue" :value="hsl.l"
      @input="handleLightnessValueInput"
      @blur="handleValueBlur"
    ></veui-input>
  </div>
</div>
</template>

<script>
import Input from '../Input'
import tinycolor from 'tinycolor2'
import {clamp} from 'lodash'

export default {
  name: 'ColorValueHsl',
  components: {
    'veui-input': Input
  },
  props: {
    hue: Number,
    saturation: Number,
    brightness: Number
  },
  data () {
    return {

    }
  },
  computed: {
    hsl () {
      let hsl = tinycolor({
        h: this.hue,
        s: this.saturation,
        v: this.brightness
      }).toHsl()
      hsl.h = Math.round(hsl.h)
      hsl.s = Math.round(hsl.s * 100) + '%'
      hsl.l = Math.round(hsl.l * 100) + '%'
      return hsl
    }
  },
  methods: {
    handleHueValueInput (val) {
      val = clamp(parseFloat(val) % 360, 0, 360)
      if (isNaN(val)) {
        return
      }
      this.$emit('update:hsb', {
        h: val,
        s: this.saturation,
        v: this.brightness
      })
    },
    handleSaturationValueInput (val) {
      val = clamp(parseFloat(val) / 100, 0, 1)
      if (isNaN(val)) {
        return
      }
      this.$emit('update:hsb', {
        h: this.hue,
        s: val,
        v: this.brightness
      })
    },
    handleLightnessValueInput (val) {
      val = clamp(parseFloat(val) / 100, 0, 1)
      if (isNaN(val)) {
        return
      }
      this.$emit('update:hsb', tinycolor({
        h: this.hue,
        s: this.saturation,
        l: val
      }).toHsv())
    },
    handleValueBlur () {
      this.$refs.hueValue.$refs.input.value = this.hsl.h
      this.$refs.saturationValue.$refs.input.value = this.hsl.s
      this.$refs.lightnessValue.$refs.input.value = this.hsl.l
    }
  }
}
</script>
