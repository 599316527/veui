<template>
<div class="veui-color-value-hex">
  <div class="veui-color-value">
    <veui-input type="text" ref="hexValue" :value="hexValue" :readonly="readonly"
      @input="handleValueInput"
      @blur="handleValueBlur"
    ></veui-input>
  </div>
</div>
</template>

<script>
import tinycolor from 'tinycolor2'
import Input from '../Input'

export default {
  name: 'ColorValueHex',
  components: {
    'veui-input': Input
  },
  props: {
    hue: Number,
    saturation: Number,
    brightness: Number,
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {

    }
  },
  computed: {
    hexValue () {
      return tinycolor({
        h: this.hue,
        s: this.saturation,
        v: this.brightness
      }).toHexString()
    }
  },
  methods: {
    handleValueInput (val) {
      if (!/^#[0-9A-F]{6}$/i.test(val)) {
        return
      }
      this.$emit('update:hsb', tinycolor(val).toHsv())
    },
    handleValueBlur () {
      // 如果输入的值不合法就不触发事件，但希望能把输入框里的非法值改成当前的正确值，所以就这个处理下
      this.$refs.hexValue.$refs.input.value = this.hexValue
    }
  }
}
</script>
