<template>
<div class="veui-color-swatch" :ui="ui">
  <div class="veui-color-swatch-box">
    <div class="veui-color-swatch-box-bg">
      <div :style="{'background-color': color}"></div>
    </div>
  </div>
  <div class="veui-color-swatch-color" v-if="colorFormatVariant">
    <component :is="'veui-color-value-' + colorFormatVariant"
      :hue="hsb.h"
      :saturation="hsb.s"
      :brightness="hsb.v"
      :readonly="readonly"
      @update:hsb="handleHsbValueUpdate"
    ></component>
  </div>
  <div class="veui-color-swatch-alpha" v-if="hasAlphaValue">
    <div>透明度</div>
    <veui-color-value-alpha
      :value="hsb.a"
      :readonly="readonly"
      @update:alpha="handleAlphaValueUpdate"
    ></veui-color-value-alpha>
    <div>%</div>
  </div>
</div>
</template>

<script>
import tinycolor from 'tinycolor2'
import ValueHsl from './_ValueHsl'
import ValueRgb from './_ValueRgb'
import ValueHex from './_ValueHex'
import ValueAlpha from './_ValueAlpha'
import {formatHsla} from './_color-util'

export default {
  name: 'color-swatch',
  components: {
    'veui-color-value-hsl': ValueHsl,
    'veui-color-value-rgb': ValueRgb,
    'veui-color-value-hex': ValueHex,
    'veui-color-value-alpha': ValueAlpha
  },
  model: {
    prop: 'color',
    event: 'update:color'
  },
  props: {
    width: {
      type: Number,
      default: 36
    },
    height: {
      type: Number,
      default: 36
    },
    color: {
      type: String,
      default: '#fff'
    },
    ui: {
      type: String,
      // (small|normal)[ (hex|rgb|hsl)[ alpha]]
      default: 'normal'
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {

    }
  },
  computed: {
    hsb () {
      let colors = tinycolor(this.color).toHsv()
      return Object.keys(colors).reduce(function (obj, key) {
        obj[key] = Math.round(colors[key] * 100) / 100
        return obj
      }, {})
    },
    realUi () {
      return this.ui.split(' ')
    },
    swatchSize () {
      return this.readUi[0]
    },
    colorFormatVariant () {
      return this.realUi[1]
    },
    hasAlphaValue () {
      return this.realUi[2]
    }
  },
  methods: {
    updateColor (color) {
      this.$emit('update:color', formatHsla(tinycolor(color).toHsl()))
    },
    handleAlphaValueUpdate (alpha) {
      this.updateColor(Object.assign({}, this.hsb, {a: alpha}))
    },
    handleHsbValueUpdate (hsb) {
      this.updateColor(Object.assign({}, this.hsb, hsb))
    }
  }
}
</script>
