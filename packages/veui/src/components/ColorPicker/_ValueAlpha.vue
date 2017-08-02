<template>
<div class="veui-color-value-alpha">
  <div class="veui-color-value">
    <veui-input type="text" ref="alphaValue"
      :value="alphaPercentage"
      @input="handleValueInput"
      @blur="handleValueBlur"
    ></veui-input>
  </div>
</div>
</template>

<script>
import Input from '../Input'

export default {
  name: 'ColorValueHex',
  components: {
    'veui-input': Input
  },
  props: {
    alpha: Number
  },
  data () {
    return {

    }
  },
  computed: {
    alphaPercentage () {
      return this.alpha * 100 + '%'
    }
  },
  methods: {
    handleValueInput (val) {
      val = parseFloat(val) / 100 || 1
      val = Math.min(1, Math.max(0, val))
      this.$emit('update:alpha', val)
    },
    handleValueBlur () {
      // 如果输入的值不合法就不触发事件，但希望能把输入框里的非法值改成当前的正确值，所以就这个处理下
      this.$refs.alphaValue.$refs.input.value = this.alphaPercentage
    }
  }
}
</script>
