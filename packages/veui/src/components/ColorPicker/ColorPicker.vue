<template>
<div class="veui-color-picker">
<div>veui-color-picker</div>

<veui-color-swatch :color="`hsla(${hue}, ${saturation * 100}%, ${lightness * 100}%, ${alpha})`"></veui-color-swatch>

<veui-color-shade-field :width="200" :height="200" :hue="hue"
  :saturation="saturation" :lightness="lightness"
  @update:saturation="val => saturation = val"
  @update:lightness="val => lightness = val"
></veui-color-shade-field>

<div class="sliders">
  <veui-color-hue-slider :value="hue" @update:value="val => hue = val" :direction="0"></veui-color-hue-slider>
  <veui-color-hue-slider :value="hue" @update:value="val => hue = val" :direction="1"></veui-color-hue-slider>
  <veui-color-alpha-slider :value="alpha" @update:value="val => alpha = val" :direction="0"></veui-color-alpha-slider>
  <veui-color-alpha-slider :value="alpha" @update:value="val => alpha = val" :direction="1"></veui-color-alpha-slider>
</div>
</div>
</template>

<script>
import ColorSwatch from './ColorSwatch'
import HueSlider from './_HueSlider'
import AlphaSlider from './_AlphaSlider'
import ShadeField from './_ShadeField'

export default {
  name: 'ColorPicker',
  components: {
    'veui-color-swatch': ColorSwatch,
    'veui-color-hue-slider': HueSlider,
    'veui-color-alpha-slider': AlphaSlider,
    'veui-color-shade-field': ShadeField
  },
  props: {

  },
  data () {
    return {
      hue: 30,
      alpha: 0.1,
      saturation: 0.2,
      lightness: 0.4
    }
  },
  computed: {

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.sliders {
  position: relative;
}
.veui-color-alpha-slider {
  position: absolute;
  left: 4em;

  &:last-child {
    top: 8em;
  }
}
</style>
