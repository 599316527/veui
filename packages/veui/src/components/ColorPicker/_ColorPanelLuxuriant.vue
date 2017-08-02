<template>
<div class="veui-color-panel-luxuriant">

  <veui-color-shade-field :width="220" :height="220" :hue="hue"
    :saturation="saturation" :lightness="lightness"
    @update:satlig="handleSatligValueUpdate"
  ></veui-color-shade-field>

  <veui-color-alpha-slider :value="alpha" :direction="1"
    @update:value="handleAlphaValueUpdate"
  ></veui-color-alpha-slider>

  <veui-color-hue-slider :value="hue" :direction="1"
    @update:value="handleHueValueUpdate"
  ></veui-color-hue-slider>

  <div class="veui-color-panel-luxuriant-color-diff">
    <div class="veui-color-panel-luxuriant-color-diff-text">新的</div>
    <div class="veui-color-panel-luxuriant-color-diff-color">
      <div :style="{
        'background-color': `hsla(${hue}, ${saturation * 100}%, ${lightness * 100}%, ${alpha})`
      }"></div>
      <div :style="{
        'background-color': `hsla(${hue}, ${saturation * 100}%, ${lightness * 100}%, ${alpha})`
      }">TODO</div>
    </div>
    <div class="veui-color-panel-luxuriant-color-diff-text">当前</div>
  </div>

  <veui-color-value-group :hue="hue" :saturation="saturation" :lightness="lightness"
    @update:hsl="handleHslValueUpdate"
  ></veui-color-value-group>
</div>
</template>

<script>
import HueSlider from './_HueSlider'
import AlphaSlider from './_AlphaSlider'
import ShadeField from './_ShadeField'
import ValueGroup from './_ValueGroup'

export default {
  name: 'ColorPanelLuxuriant',
  components: {
    'veui-color-hue-slider': HueSlider,
    'veui-color-alpha-slider': AlphaSlider,
    'veui-color-shade-field': ShadeField,
    'veui-color-value-group': ValueGroup
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
