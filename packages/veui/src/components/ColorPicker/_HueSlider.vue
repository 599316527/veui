<template>
<div class="veui-color-hue-slider">
  <veui-slider :value="progress" @update:value="handleValueUpdate"
    :direction="direction" v-bind="sliderSize">
    <div :style="{
      width: '100%',
      height: '100%',
      background: `linear-gradient(to ${direction === 0 ? 'left' : 'right'}, #F00, #FF0, #0F0, #0FF, #00F, #F0F, #F00)`
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
      let val = Math.min(1, Math.max(0, this.value / 360))
      // 水平方向上色相是 360 -> 0，垂直方向上是 0 -> 360，所以要区别处理
      return this.direction === 0 ? 1 - val : val
    },
    sliderSize () {
      return this.direction === 0 ? horizonalSliderSize : verticalSliderSize
    }
  },
  methods: {
    handleValueUpdate (val) {
      let hue = (this.direction === 0 ? 1 - val : val) * 360
      this.$emit('update:value', hue)
    }
  }
}
</script>
