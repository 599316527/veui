<template>
<div class="veui-color-hue-slider">
  <veui-slider :value="progress" @update:value="handleValueUpdate"
    :direction="direction" v-bind="sliderSize">
    <div :style="{
      width: '100%',
      height: '100%',
      background: `linear-gradient(to ${direction === 0 ? 'left' : 'right'}, #F00, #FF0, #0F0, #0FF, #00F, #F0F, #FF0004)`
    }"></div>
  </veui-slider>
</div>
</template>

<script>
import {horizonalSliderSize, verticalSliderSize} from './slider-sizes'
import Slider from './Slider'

export default {
  name: 'ColorHueSlider',
  components: {
    'veui-slider': Slider
  },
  props: {
    value: Number,
    direction: Number
  },
  data () {
    return {}
  },
  computed: {
    progress () {
      let val = Math.min(1, Math.max(0, this.value / 359))
      // 水平方向上色相是 359 -> 0，垂直方向上是 0 -> 359，所以要区别处理
      return this.direction === 0 ? 1 - val : val
    },
    sliderSize () {
      return this.direction === 0 ? horizonalSliderSize : verticalSliderSize
    }
  },
  methods: {
    handleValueUpdate (val) {
      // 终点应该是 360, 但是 format 的时候 360 -> 0，再回来的时候就变成了 0，导致滑块回到了头部
      // 所以这里就把终点改成 359
      let hue = (this.direction === 0 ? 1 - val : val) * 359
      this.$emit('update:value', hue)
    }
  }
}
</script>
