<template>
<div class="veui-color-value-rgb">
  <div class="veui-color-value">
    <veui-input type="text" ref="redValue" :value="rgbValue[0]"
      @input="handleRedValueInput"
      @blur="handleValueBlur"
    ></veui-input>
  </div>
  <div class="veui-color-value">
    <veui-input type="text" ref="greenValue" :value="rgbValue[1]"
      @input="handleGreenValueInput"
      @blur="handleValueBlur"
    ></veui-input>
  </div>
  <div class="veui-color-value">
    <veui-input type="text" ref="blueValue" :value="rgbValue[2]"
      @input="handleBlueValueInput"
      @blur="handleValueBlur"
    ></veui-input>
  </div>
</div>
</template>

<script>
import {hsl2rgb, rgb2hsl} from './color-converter'
import Input from '../Input'

export default {
  name: 'ColorValueRgb',
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
  computed: {
    rgbValue () {
      return hsl2rgb(this.hue, this.saturation, this.lightness)
    }
  },
  methods: {
    handleRedValueInput (val) {
      val = parseInt(val, 10)
      val = Math.min(255, Math.max(0, val))
      if (isNaN(val)) {
        return
      }
      // 跟 ShadeField 一样的问题，要一起往外传
      this.$emit('update:hsl', ...rgb2hsl(val, ...this.rgbValue.slice(1)))
    },
    handleGreenValueInput (val) {
      val = parseInt(val, 10)
      val = Math.min(255, Math.max(0, val))
      if (isNaN(val)) {
        return
      }
      this.$emit('update:hsl', ...rgb2hsl(this.rgbValue[0], val, this.rgbValue[2]))
    },
    handleBlueValueInput (val) {
      val = parseInt(val, 10)
      val = Math.min(255, Math.max(0, val))
      if (isNaN(val)) {
        return
      }
      this.$emit('update:hsl', ...rgb2hsl(...this.rgbValue.slice(0, 2), val))
    },
    handleValueBlur () {
      this.$refs.redValue.$refs.input.value = this.rgbValue[0]
      this.$refs.greenValue.$refs.input.value = this.rgbValue[1]
      this.$refs.blueValue.$refs.input.value = this.rgbValue[2]
    }
  }
}
</script>
