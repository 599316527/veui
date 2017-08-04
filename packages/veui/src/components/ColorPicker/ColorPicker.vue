<template>
<div class="veui-color-picker" :ui="ui">
  <div class="veui-color-picker-main">
    <div v-if="ui === 'large'">
      <veui-color-panel-large
        :hue="hsb.h"
        :saturation="hsb.s"
        :brightness="hsb.v"
        :alpha="hsb.a"
        @update:hsb="handleHsbValueUpdate"
        @update:alpha="handleAlphaValueUpdate"
      ></veui-color-panel-large>
    </div>
    <div v-else-if="ui === 'normal'">
      <veui-color-panel-standard
        :hue="hsb.h"
        :saturation="hsb.s"
        :brightness="hsb.v"
        :alpha="hsb.a"
        @update:hsb="handleHsbValueUpdate"
        @update:alpha="handleAlphaValueUpdate"
      ></veui-color-panel-standard>
    </div>
    <div v-else-if="ui === 'small'">
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
import ColorPanelLarge from './_ColorPanelLarge'
import ColorPanelStandard from './_ColorPanelStandard'
import {formatHsla} from './_color-util'

export default {
  name: 'ColorPicker',
  components: {
    'veui-color-swatch': ColorSwatch,
    'veui-color-panel-standard': ColorPanelStandard,
    'veui-color-panel-large': ColorPanelLarge,
    'veui-color-value-group': ValueGroup
  },
  props: {
    color: String,
    format: {
      type: String,
      default: 'hsl'
    },
    ui: {
      type: String,
      default: 'normal'
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
        // 连续纯黑色情况下(SaturationBrightnessField底部区域)，
        // 传出再传入的 hsv 不一样，导致信息丢失，这里恢复一下，不然取色圈会跳变
        // hsv(40, 0.001, 0.001) -> rgb(0, 0, 0) -> hsv(0, 0, 0)
        hsb.h = prevHsb.h
        hsb.s = prevHsb.s
      }

      return hsb
    }
  },
  methods: {
    formatColor (color) {
      color = tinycolor(color)
      switch (this.format) {
        case 'rgb':
          return color.toRgbString()
        case 'hex':
          return color.toHexString()
        case 'hsl':
          // 因为 tinycolor 的 toHslString() 得到的颜色没有小数
          // 精度丢失会导致数字修改时突变，所以自己实现一个format保留4位小数
          return formatHsla(color.toHsl())
      }
    },
    updateColor (color) {
      this.previousHsb = color
      this.$emit('update:color', this.formatColor(color))
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
