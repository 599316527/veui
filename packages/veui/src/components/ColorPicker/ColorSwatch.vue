<template>
<div class="veui-color-swatch" :ui="ui" :style="{
  height: height + 'px',
  'line-height': height + 'px'
}">
  <div class="veui-color-swatch-box" :style="{
    width: width + 'px',
    height: height + 'px'
  }">
    <div class="veui-color-swatch-box-bg">
      <div :style="{'background-color': color}"></div>
    </div>
  </div>
  <div class="veui-color-swatch-color" v-if="ui">
    <component :is="'veui-color-value-' + ui"
      :hue="hsb.h"
      :saturation="hsb.s"
      :brightness="hsb.v"
    ></component>
  </div>
  <div class="veui-color-swatch-alpha" v-if="ui">
    <div>透明度</div>
    <veui-color-value-alpha :value="hsb.a"></veui-color-value-alpha>
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

export default {
  name: 'color-swatch',
  components: {
    'veui-color-value-hsl': ValueHsl,
    'veui-color-value-rgb': ValueRgb,
    'veui-color-value-hex': ValueHex,
    'veui-color-value-alpha': ValueAlpha
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
    ui: String
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
    }

  },
  methods: {

  }
}
</script>
