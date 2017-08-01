<template>
<div class="veui-slider" :class="{
  ['veui-slider-' + (direction === 0 ? 'h' : 'v')]: true
}" :style="{
  width: `${sliderWidth}px`,
  height: `${sliderHeight}px`,
  'padding-top': `${Math.max(0, (blockHeight - stripHeight) / 2)}px`,
  // hack一下，处理两个方向的话算起来很烦，不如直接旋转一下好了（滑稽表情
  'transform': direction === 0 ? '' : 'rotate(90deg)',  
  'transform-origin': `${sliderHeight / 2}px center`
}">
  <div class="veui-slider-strip" @click="handleStripClick" :style="{
    width: `${stripWidth}px`,
    height: `${stripHeight}px`
  }">
    <!-- 调用时决定滑动“条”是什么内容 -->
    <slot></slot>
  </div>
  <div class="veui-slider-block" v-drag :style="{
    width: `${blockWidth}px`,
    height: `${blockHeight}px`,
    top: `${Math.max(0, (stripHeight - blockHeight) / 2)}px`,
    left: 0,
    transform: `translateX(${value * stripWidth - blockWidth / 2}px)`
  }"></div>
</div>
</template>

<script>
import { drag } from '../../directives'

export default {
  name: 'Slider',
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
    },
    sliderWidth () {
      return this.stripWidth
    },
    sliderHeight () {
      return Math.max(this.stripHeight, this.blockHeight)
    }
  },
  methods: {
    handleStripClick (evt) {
      let offsetValue = evt['offset' + this.coordinate]
      let value = offsetValue / this.stripWidth
      value = Math.min(1, Math.max(0, value))
      this.$emit('update:value', value)
    }
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
      // 滑动条只有一个方向，所以直接把水平或垂直的变换值/滑动条长度作为变换的百分比
      let distance = evt['distance' + this.coordinate]
      let deltaValue = distance / this.stripWidth
      let value = Math.min(1, Math.max(0, this.dragInitValue + deltaValue))
      this.$emit('update:value', value)
    })
  }
}
</script>
