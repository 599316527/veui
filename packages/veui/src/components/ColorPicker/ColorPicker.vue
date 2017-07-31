<template>
<div class="veui-color-picker">
<div>veui-color-picker</div>

<veui-color-hue-slider :value="hue" @update:value="val => hue = val" :direction="0"></veui-color-hue-slider>
<veui-color-alpha-slider :value="alpha" @update:value="val => alpha = val" :direction="1"></veui-color-alpha-slider>

</div>
</template>

<script>
import HueSlider from './HueSlider'
import AlphaSlider from './AlphaSlider'

export default {
  name: 'ColorPicker',
  components: {
    'veui-color-hue-slider': HueSlider,
    'veui-color-alpha-slider': AlphaSlider
  },
  props: {

  },
  data () {
    return {
      hue: 0.3,
      alpha: 0.1
    }
  },
  computed: {

  },
  methods: {

  }
}
</script>
