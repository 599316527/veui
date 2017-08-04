import ColorUpdater from './_ColorUpdater'
import Slider from '../Slider'

const horizonalSliderSize = {
  stripWidth: 150,
  stripHeight: 14,
  blockWidth: 6,
  blockHeight: 18
}

const verticalSliderSize = {
  stripWidth: 220,
  stripHeight: 24,
  blockWidth: 6,
  blockHeight: 22
}

export default {
  components: {
    'veui-slider': Slider
  },
  mixins: [
    ColorUpdater
  ],
  props: {
    value: Number,
    direction: Number
  },
  computed: {
    sliderSize () {
      return this.direction === 0
        ? horizonalSliderSize : verticalSliderSize
    }
  }
}
