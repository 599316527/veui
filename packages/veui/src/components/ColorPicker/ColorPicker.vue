<template>
<div class="veui-color-picker" :ui="ui">
  <div class="veui-color-picker-main">
    <div v-if="ui === 'luxuriant'">
      <veui-color-panel-luxuriant
        :hue="hsb.h"
        :saturation="hsb.s"
        :brightness="hsb.v"
        :alpha="hsb.a"
        @update:hsb="handleHsbValueUpdate"
        @update:alpha="handleAlphaValueUpdate"
      ></veui-color-panel-luxuriant>
    </div>
    <div v-else-if="ui === 'standard'">
      <veui-color-panel-standard
        :hue="hsb.h"
        :saturation="hsb.s"
        :brightness="hsb.v"
        :alpha="hsb.a"
        @update:hsb="handleHsbValueUpdate"
        @update:alpha="handleAlphaValueUpdate"
      ></veui-color-panel-standard>
    </div>
    <div v-else-if="ui === 'barren'">
      <veui-color-value-group
        :hue="hsb.h"
        :saturation="hsb.s"
        :brightness="hsb.v"
        :alpha="hsb.a"
        @update:hsb="handleHsbValueUpdate"
      ></veui-color-value-group>
    </div>
    <div v-else>Oops!</div>
  </div>
  <div class="veui-color-picker-extra">
    <slot></slot>
  </div>
</div>
</template>

<script>
import tinycolor from 'tinycolor2'
import ColorSwatch from './ColorSwatch'
import ValueGroup from './_ValueGroup'
import ColorPanelLuxuriant from './_ColorPanelLuxuriant'
import ColorPanelStandard from './_ColorPanelStandard'

const colorValuePrecision = 1e4

export default {
  name: 'ColorPicker',
  components: {
    'veui-color-swatch': ColorSwatch,
    'veui-color-panel-standard': ColorPanelStandard,
    'veui-color-panel-luxuriant': ColorPanelLuxuriant,
    'veui-color-value-group': ValueGroup
  },
  props: {
    color: String,
    ui: {
      type: String,
      default: 'standard'
    }
  },
  model: {
    prop: 'color',
    event: 'update:color'
  },
  data () {
    return {
      previousHsb: {}
    }
  },
  computed: {
    hsb () {
      let prevHsb = this.previousHsb
      let hsb = tinycolor(this.color).toHsv()

      // fix
      if (prevHsb.h % 360 === hsb.h % 360) {
        // 因为色相是 360度循环的，360 被 tinycolor 转换成了 0，直接用的话会导致滑块跳变，所以这个特殊处理下
        hsb.h = prevHsb.h
      }
      if (tinycolor.equals(hsb, prevHsb)) {
        // 纯黑色情况下，传出再传入的 hsv 不一样，导致信息丢失，这里恢复一下，不然取色圈会跳变
        // hsv(40, 0.001, 0.001) -> rgb(0, 0, 0) -> hsv(0, 0, 0)
        hsb.h = prevHsb.h
        hsb.s = prevHsb.s
      }

      return hsb
    }
  },
  methods: {
    updateColor (color) {
      // console.log(color)
      this.previousHsb = color
      let {h, s, l, a} = tinycolor(color).toHsl()
      h = Math.round(h % 360 * colorValuePrecision) / colorValuePrecision
      s = Math.round(s * 100 * colorValuePrecision) / colorValuePrecision
      l = Math.round(l * 100 * colorValuePrecision) / colorValuePrecision
      a = Math.round(a * colorValuePrecision) / colorValuePrecision
      color = a === 1 ? `hsl(${h}, ${s}%, ${l}%)` : `hsla(${h}, ${s}%, ${l}%, ${a})`
      this.$emit('update:color', color)
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
