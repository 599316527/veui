<template>
<div class="veui-color-value-alpha">
  <div class="veui-color-value">
    <veui-input type="text" ref="alphaValue" v-numeric
      :value="alphaPercentage"
      :readonly="readonly"
      @input="handleValueInput"
      @keyup.up.down.native="handleValueInput($event.target.value)"
      @blur="handleValueBlur"
    ></veui-input>
  </div>
</div>
</template>

<script>
import Input from '../Input'
import {clamp} from 'lodash'
import { numeric } from '../../directives'

export default {
  name: 'ColorValueAlpha',
  components: {
    'veui-input': Input
  },
  directives: {
    numeric
  },
  props: {
    value: Number,
    percentage: Boolean,
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
    alphaPercentage () {
      return Math.round(this.value * 100) + (this.percentage ? '%' : '')
    },
    matchRegexp () {
      return this.percentage ? /^\d+(\.\d+)?%$/ : /^\d+(\.\d+)?$/
    }
  },
  methods: {
    handleValueInput (val) {
      console.log(val)
      if (!this.matchRegexp.test(val)) {
        return
      }
      val = clamp(parseFloat(val) / 100 || 1, 0, 1)
      this.$emit('update:alpha', val)
    },
    handleValueBlur () {
      // 如果输入的值不合法就不触发事件，但希望能把输入框里的非法值改成当前的正确值，所以就这个处理下
      this.$refs.alphaValue.$refs.input.value = this.alphaPercentage
    }
  }
}
</script>
