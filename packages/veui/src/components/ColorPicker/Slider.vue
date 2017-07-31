<template>
<div class="veui-color-slider" :class="{
  ['veui-color-slider-' + (direction === 0 ? 'h' : 'v')]: true
}" :style="{
  width: `${stripWidth}px`,
  height: `${Math.max(stripHeight, blockHeight)}px`,
  'padding-top': `${Math.max(0, (blockHeight - stripHeight) / 2)}px`,
  'transform-origin': `${Math.max(stripHeight, blockHeight) / 2}px center`
}">
  <div class="veui-color-slider-strip veui-transparency-grid-background" :style="{
    width: `${stripWidth}px`,
    height: `${stripHeight}px`
  }">
    <slot></slot>
  </div>
  <div class="veui-color-slider-block" v-drag :style="{
    width: `${blockWidth}px`,
    height: `${blockHeight}px`,
    top: `${Math.max(0, (stripHeight - blockHeight) / 2)}px`,
    left: 0,
    transform: `translateX(${value * (stripWidth - blockWidth)}px)`
  }"></div>
</div>
</template>

<script>
import { drag } from '../../directives'

export default {
  name: 'ColorSlider',
  props: {
    value: Number,
    direction: Number,
    stripWidth: Number,
    stripHeight: Number,
    blockWidth: Number,
    blockHeight: Number
  },
  directives: {
    drag
  },
  data () {
    return {
      isDragging: false,
      dragInitValue: 0
    }
  },
  computed: {
    coordinate () {
      return this.direction === 0 ? 'X' : 'Y'
    }
  },
  methods: {

  },
  mounted () {
    this.$on('dragstart', () => {
      this.isDragging = true
      this.dragInitValue = this.value
    })
    this.$on('dragend', () => {
      this.isDragging = false
    })
    this.$on('drag', (evt) => {
      let distance = evt['distance' + this.coordinate]
      let deltaValue = distance / this.stripWidth
      let value = Math.min(1, Math.max(0, this.dragInitValue + deltaValue))
      this.$emit('update:value', value)
    })
  }
}
</script>
