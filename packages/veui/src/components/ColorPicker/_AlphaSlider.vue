<template>
<div class="veui-color-alpha-slider">
  <veui-slider :value="value" :direction="direction" v-bind="sliderSize"
    @update:value="handleValueUpdate"
    @dragstart="$emit('dragstart')"
    @dragend="$emit('dragend')">
    <div :style="{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,1))'
    }"></div>
  </veui-slider>
</div>
</template>

<script>
import {horizonalSliderSize, verticalSliderSize} from './slider-sizes'
import Slider from './Slider'

export default {
  name: 'ColorAlphaSlider',
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
    sliderSize () {
      return this.direction === 0 ? horizonalSliderSize : verticalSliderSize
    }
  },
  methods: {
    handleValueUpdate (val) {
      this.$emit('update:value', val)
    }
  }
}
</script>
