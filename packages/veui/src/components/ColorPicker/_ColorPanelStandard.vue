<template>
<div class="veui-color-panel-standard">
  <veui-color-shade-field :width="200" :height="200" :hue="hue"
    :saturation="saturation" :brightness="brightness"
    @update:satbri="handleSatbriValueUpdate"
  ></veui-color-shade-field>

  <div class="veui-color-panel-standard-swatch">
    <veui-color-swatch :color="color"></veui-color-swatch>
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
    :brightness="brightness"
    :alpha="alpha"
    @update:hsb="handleHsbValueUpdate"
    @update:alpha="handleAlphaValueUpdate"
  ></veui-color-value-alpha-group>
</div>
</template>

<script>
import tinycolor from 'tinycolor2'
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
    brightness: Number,
    alpha: Number
  },
  data () {
    return {

    }
  },
  computed: {
    color () {
      return tinycolor({
        h: this.hue,
        s: this.saturation,
        v: this.brightness,
        a: this.alpha
      }).toHslString()
    }
  },
  methods: {
    handleHueValueUpdate (h) {
      this.$emit('update:hsb', {
        h,
        s: this.saturation,
        v: this.brightness
      })
    },
    handleAlphaValueUpdate (val) {
      this.$emit('update:alpha', val)
    },
    handleHsbValueUpdate (hsb) {
      this.$emit('update:hsb', hsb)
    },
    handleSatbriValueUpdate (s, v) {
      this.$emit('update:hsb', {
        h: this.hue,
        s,
        v
      })
    }
  }
}
</script>
