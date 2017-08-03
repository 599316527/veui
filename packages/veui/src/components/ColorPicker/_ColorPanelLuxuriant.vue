<template>
<div class="veui-color-panel-luxuriant">

  <veui-color-shade-field :width="220" :height="220" :hue="hue"
    :saturation="saturation" :brightness="brightness"
    @update:satbri="handleSatbriValueUpdate"
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
  ></veui-color-shade-field>

  <veui-color-alpha-slider :value="alpha" :direction="1"
    @update:value="handleAlphaValueUpdate"
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
  ></veui-color-alpha-slider>

  <veui-color-hue-slider :value="hue" :direction="1"
    @update:value="handleHueValueUpdate"
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
  ></veui-color-hue-slider>

  <div class="veui-color-panel-luxuriant-color-diff">
    <div class="veui-color-panel-luxuriant-color-diff-text">新的</div>
    <div class="veui-color-panel-luxuriant-color-diff-color">
      <div :style="{
        'background-color': currentColor
      }"></div>
      <div :style="{
        'background-color': previousColor || currentColor
      }"></div>
    </div>
    <div class="veui-color-panel-luxuriant-color-diff-text">当前</div>
  </div>

  <veui-color-value-group :hue="hue" :saturation="saturation" :brightness="brightness"
    @update:hsb="handleHsbValueUpdate"
  ></veui-color-value-group>
</div>
</template>

<script>
import tinycolor from 'tinycolor2'
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
    brightness: Number,
    alpha: Number
  },
  data () {
    return {
      previousColor: ''
    }
  },
  computed: {
    currentColor () {
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
    },
    handleDragStart () {
      this.previousColor = this.currentColor
    },
    handleDragEnd () {
      this.$nextTick(() => {
        this.previousColor = this.currentColor
      })
    }
  }
}
</script>
