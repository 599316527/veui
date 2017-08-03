<template>
<div class="veui-color-value-rgb">
  <div class="veui-color-value">
    <veui-input type="text" ref="redValue" :value="rgb.r"
      @input="handleRedValueInput"
      @blur="handleValueBlur"
    ></veui-input>
  </div>
  <div class="veui-color-value">
    <veui-input type="text" ref="greenValue" :value="rgb.g"
      @input="handleGreenValueInput"
      @blur="handleValueBlur"
    ></veui-input>
  </div>
  <div class="veui-color-value">
    <veui-input type="text" ref="blueValue" :value="rgb.b"
      @input="handleBlueValueInput"
      @blur="handleValueBlur"
    ></veui-input>
  </div>
</div>
</template>

<script>
import tinycolor from 'tinycolor2'
import {clamp} from 'lodash'
import Input from '../Input'

export default {
  name: 'ColorValueRgb',
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
    rgb () {
      return tinycolor({
        h: this.hue,
        s: this.saturation,
        v: this.brightness
      }).toRgb()
    }
  },
  methods: {
    handleRedValueInput (val) {
      val = clamp(parseInt(val, 10), 0, 255)
      if (isNaN(val)) {
        return
      }
      // 跟 ShadeField 一样的问题，要一起往外传
      this.$emit('update:hsb', tinycolor(Object.assign({}, this.rgb, {r: val})).toHsv())
    },
    handleGreenValueInput (val) {
      val = clamp(parseInt(val, 10), 0, 255)
      if (isNaN(val)) {
        return
      }
      this.$emit('update:hsb', tinycolor(Object.assign({}, this.rgb, {g: val})).toHsv())
    },
    handleBlueValueInput (val) {
      val = clamp(parseInt(val, 10), 0, 255)
      if (isNaN(val)) {
        return
      }
      this.$emit('update:hsb', tinycolor(Object.assign({}, this.rgb, {b: val})).toHsv())
    },
    handleValueBlur () {
      this.$refs.redValue.$refs.input.value = this.rgb.r
      this.$refs.greenValue.$refs.input.value = this.rgb.g
      this.$refs.blueValue.$refs.input.value = this.rgb.b
    }
  }
}
</script>
