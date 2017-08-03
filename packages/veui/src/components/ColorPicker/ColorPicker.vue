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
    return {}
  },
  computed: {
    hsb () {
      return tinycolor(this.color).toHsv()
    }
  },
  methods: {
    updateColor (color) {
      this.$emit('update:color', tinycolor(color).toHslString())
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
