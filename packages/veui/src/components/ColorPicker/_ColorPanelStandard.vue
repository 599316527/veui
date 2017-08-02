<template>
<div class="veui-color-panel-standard">
  <veui-color-shade-field :width="200" :height="200" :hue="hue"
    :saturation="saturation" :lightness="lightness"
    @update:satlig="handleSatligValueUpdate"
  ></veui-color-shade-field>

  <div class="veui-color-panel-standard-swatch">
    <veui-color-swatch :color="color" :width="40" :height="40"></veui-color-swatch>
    <div class="veui-color-panel-standard-sliders">
      <veui-color-hue-slider :value="hue" :direction="0"
        @update:value="handleHueValueUpdate"
      ></veui-color-hue-slider>
      <veui-color-alpha-slider :value="alpha" :direction="0"
        @update:value="handleAlphaValueUpdate"
      ></veui-color-alpha-slider>
    </div>
  </div>

  <veui-color-value-alpha-group
    :hue="hue"
    :saturation="saturation"
    :lightness="lightness"
    :alpha="alpha"
    @update:hsl="handleHslValueUpdate"
    @update:alpha="handleAlphaValueUpdate"
  ></veui-color-value-alpha-group>
</div>
</template>

<script>
import {hsla2color} from './color-converter'
import ColorSwatch from './ColorSwatch'
import HueSlider from './_HueSlider'
import AlphaSlider from './_AlphaSlider'
import ShadeField from './_ShadeField'
import ValueAlphaGroup from './_ValueAlphaGroup'

export default {
  name: 'ColorPanelStandard',
  components: {
    'veui-color-swatch': ColorSwatch,
    'veui-color-hue-slider': HueSlider,
    'veui-color-alpha-slider': AlphaSlider,
    'veui-color-shade-field': ShadeField,
    'veui-color-value-alpha-group': ValueAlphaGroup
  },
  props: {
    hue: Number,
    saturation: Number,
    lightness: Number,
    alpha: Number
  },
  data () {
    return {

    }
  },
  computed: {
    color () {
      return hsla2color(this.hue, this.saturation, this.lightness, this.alpha)
    }
  },
  methods: {
    handleHueValueUpdate (hue) {
      this.$emit('update:hsl', hue, this.saturation, this.lightness)
    },
    handleAlphaValueUpdate (val) {
      this.$emit('update:alpha', val)
    },
    handleHslValueUpdate (...hsl) {
      this.$emit('update:hsl', ...hsl)
    },
    handleSatligValueUpdate (...sl) {
      this.$emit('update:hsl', this.hue, ...sl)
    }
  }
}
</script>
