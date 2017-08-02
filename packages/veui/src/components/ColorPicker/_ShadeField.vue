<template>
<div class="veui-color-shade-field" :style="{
  width: width + 'px',
  height: height + 'px'
}">
  <div class="veui-color-shade-field-shade" ref="field" @click="handleShadeFieldClick">
    <div class="veui-color-shade-field-saturation" :style="{
      'background-image': `linear-gradient(to right, #fff, hsl(${hue}, 100%, 50%))`
    }"></div>
    <div class="veui-color-shade-field-lightness" :style="{
      'background-image': `linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1))`
    }"></div>
  </div>
  <div class="veui-color-shade-field-aperture" v-drag :style="{
    'background-color': `hsl(${hue}, ${saturation * 100}%, ${lightness * 100}%)`,
    transform: `translate(${apertureX - 6}px, ${apertureY - 6}px)`
  }" @click.stop></div>
</div>
</template>

<script>
import { drag } from '../../directives'

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
    lightness: Number
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
      let a = 1 - this.apertureX / this.width / 2
      return (a - this.lightness) * this.height / a
    }
  },
  methods: {
    handleShadeFieldClick ({clientX, clientY, offsetX, offsetY}) {
      // console.log('offsetX', offsetX, offsetY)
      let {saturation, lightness} = calculateSaturationLightness(offsetX, offsetY, this.width, this.height)
      this.$emit('update:satlig', saturation, lightness)
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
      let {saturation, lightness} = calculateSaturationLightness(
        this.dragInitX + distanceX, this.dragInitY + distanceY,
        this.width, this.height
      )
      // 得合在一起传出去(satlig=saturation+lightness)。因为要冒泡到 ColorPicker format成字符串再传回来
      // 如果分开的话，后一个到达 ColorPicker 的时候前一个还没生效，所以使用原来的值，导致前一个无法改变
      this.$emit('update:satlig', saturation, lightness)
    })
  }
}

function calculateSaturationLightness (x, y, width, height) {
  let saturation = Math.min(1, Math.max(0, x / width))
  y = Math.min(1, Math.max(0, y / height))
  // lightness 在 shade 平面上同时由 x, y 决定，满足函数 f(x, y)
  // f(0,0)=1   f(1,0)=.5   f(0,1)=0  f(1,1)=0
  // 得到 f(x,y)=(1-x/2)(1-y)
  let lightness = (1 - saturation / 2) * (1 - y)
  return {saturation, lightness}
}
</script>
