<template>
<div class="veui-color-picker" :ui="ui">
  <div class="veui-color-picker-main">
    <div v-if="ui === 'luxuriant'">
      <veui-color-panel-luxuriant
        :hue="parsedColor.hue"
        :saturation="parsedColor.saturation"
        :lightness="parsedColor.lightness"
        :alpha="parsedColor.alpha"
        @update:hsl="handleHslValueUpdate"
        @update:alpha="handleAlphaValueUpdate"
      ></veui-color-panel-luxuriant>
    </div>
    <div v-else-if="ui === 'standard'">
      <veui-color-panel-standard
        :hue="parsedColor.hue"
        :saturation="parsedColor.saturation"
        :lightness="parsedColor.lightness"
        :alpha="parsedColor.alpha"
        @update:hsl="handleHslValueUpdate"
        @update:alpha="handleAlphaValueUpdate"
      ></veui-color-panel-standard>
    </div>
    <div v-else-if="ui === 'barren'">
      <veui-color-value-group
        :hue="parsedColor.hue"
        :saturation="parsedColor.saturation"
        :lightness="parsedColor.lightness"
        @update:hsl="handleHslValueUpdate"
      ></veui-color-value-group>
    </div>
    <div v-else>☹️</div>
  </div>
  <div class="veui-color-picker-extra">
    <slot></slot>
  </div>
</div>
</template>

<script>
import {color2hsla, hsla2color} from './color-converter'
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
    parsedColor () {
      return color2hsla(this.color)
    }
  },
  methods: {
    updateColor ({hue, saturation, lightness, alpha}) {
      this.$emit('update:color', hsla2color(hue, saturation, lightness, alpha))
    },
    handleAlphaValueUpdate (alpha) {
      this.updateColor(Object.assign({}, this.parsedColor, {alpha}))
    },
    handleHslValueUpdate (hue, saturation, lightness) {
      this.updateColor(Object.assign({}, this.parsedColor, {hue, saturation, lightness}))
    }
  }
}
</script>
