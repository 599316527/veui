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
    transform: `translate(${aperturePosition.x - 6}px, ${aperturePosition.y - 6}px)`
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
    aperturePosition () {
      let saturation = this.saturation
      let brightness = this.brightness
      return {
        x: saturation * this.width,
        y: (1 - brightness) * this.height
      }
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
      this.$emit('dragend')
    },
    updateSatbri (saturation, brightness) {
      saturation = clamp(saturation, 0, 1)
      brightness = clamp(brightness, 0, 1)
      this.$emit('update:satbri', saturation, brightness)
    }
  },
  mounted () {
    this.$on('dragstart', () => {
      this.isDragging = true
      this.dragInitX = this.aperturePosition.x
      this.dragInitY = this.aperturePosition.y
    })
    this.$on('dragend', () => {
      this.isDragging = false
    })
    this.$on('drag', ({distanceX, distanceY}) => {
      let x = this.dragInitX + distanceX
      let y = this.dragInitY + distanceY
      // 得合在一起传出去(satlig=saturation+brightness)。因为要冒泡到 ColorPicker format成字符串再传回来
      // 如果分开的话，后一个到达 ColorPicker 的时候前一个还没生效，所以使用原来的值，导致前一个无法改变
      this.updateSatbri(x / this.width, 1 - y / this.height)
    })
  }
}
</script>
