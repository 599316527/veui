<template>
<div class="veui-color-hue-slider">
  <veui-slider :value="value" @update:value="handleValueUpdate"
    :direction="direction" v-bind="direction === 0 ? horizonalSliderSize : verticalSliderSize">
    <div :style="{
      width: '100%',
      height: '100%',
      background: `linear-gradient(to right, #F00, #FF0, #0F0, #0FF, #00F, #F0F, #F00)`
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
    return {
      horizonalSliderSize,
      verticalSliderSize
    }
  },
  computed: {

  },
  methods: {
    handleValueUpdate (val) {
      this.$emit('update:value', val)
    }
  }
}
</script>
