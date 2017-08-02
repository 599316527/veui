<template>
<div class="veui-color-value-hex">
  <div class="veui-color-value">
    <veui-input type="text" ref="hexValue" :value="hexValue"
      @input="handleValueInput"
      @blur="handleValueBlur"
    ></veui-input>
  </div>
</div>
</template>

<script>
import {hsl2rgb, rgb2hsl, rgb2hex, hex2rgb} from './color-converter'
import Input from '../Input'

export default {
  name: 'ColorValueHex',
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
    hexValue () {
      let rgbValue = hsl2rgb(this.hue, this.saturation, this.lightness)
      return rgb2hex(...rgbValue)
    }
  },
  methods: {
    handleValueInput (val) {
      if (!/^#[0-9A-F]{6}$/i.test(val)) {
        return
      }
      this.$emit('update:hsl', ...rgb2hsl(...hex2rgb(val)))
    },
    handleValueBlur () {
      // 如果输入的值不合法就不触发事件，但希望能把输入框里的非法值改成当前的正确值，所以就这个处理下
      this.$refs.hexValue.$refs.input.value = this.hexValue
    }
  }
}
</script>
