<template>
<div class="veui-color-shade-field" :style="{
  width: width + 'px',
  height: height + 'px'
}">
  <div class="veui-color-shade-field-shade" ref="field" @click="handleShadeFieldClick">
    <div class="veui-color-shade-field-saturation" :style="{
      'background-image': `linear-gradient(to right, #fff, hsl(${hue}, 100%, 50%))`
    }"></div>
    <div class="veui-color-shade-field-brightness" :style="{
      'background-image': `linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1))`
    }"></div>
  </div>
  <div class="veui-color-shade-field-aperture" v-drag :style="{
    'background-color': currentColor,
    transform: `translate(${apertureX - 6}px, ${apertureY - 6}px)`
  }" @click.stop></div>
</div>
</template>

<script>
import tinycolor from 'tinycolor2'
import {drag} from '../../directives'
import {clamp} from 'lodash'

export default {
  name: 'ColorShadeField',
  directives: {
    drag
  },
  props: {
    width: Number,
    height: Number,
    hue: Number,

    saturation: Number,
    brightness: Number
  },
  data () {
    return {
      isDragging: false,
      dragInitX: 0,
      dragInitY: 0
    }
  },
  computed: {
    apertureX () {
      return this.saturation * this.width
    },
    apertureY () {
      return (1 - this.brightness) * this.height
    },
    currentColor () {
      return tinycolor({
        h: this.hue,
        s: this.saturation,
        v: this.brightness
      }).toHslString()
    }
  },
  methods: {
    handleShadeFieldClick ({clientX, clientY, offsetX, offsetY}) {
      this.updateSatbri(offsetX / this.width, 1 - offsetY / this.height)
    },
    updateSatbri (saturation, brightness) {
      this.$emit('update:satbri', clamp(saturation, 0, 1), clamp(brightness, 0, 1))
    }
  },
  mounted () {
    this.$on('dragstart', () => {
      this.isDragging = true
      this.dragInitX = this.apertureX
      this.dragInitY = this.apertureY
    })
    this.$on('dragend', () => {
      this.isDragging = false
    })
    this.$on('drag', ({distanceX, distanceY}) => {
      // 得合在一起传出去(satlig=saturation+brightness)。因为要冒泡到 ColorPicker format成字符串再传回来
      // 如果分开的话，后一个到达 ColorPicker 的时候前一个还没生效，所以使用原来的值，导致前一个无法改变
      this.updateSatbri(
        (this.dragInitX + distanceX) / this.width,
        1 - (this.dragInitY + distanceY) / this.height
      )
    })
  }
}
</script>
