<template>
<div class="veui-color-swatch" :style="{
  width: width + 'px',
  height: height + 'px'
}">
  <div class="veui-color-swatch-bg">
    <div :style="{'background-color': color}"></div>
  </div>
</div>
</template>

<script>
export default {
  name: 'color-swatch',
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
    }
  },
  data () {
    return {

    }
  },
  computed: {

  },
  methods: {

  }
}
</script>
