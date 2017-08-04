
import tinycolor from 'tinycolor2'
import HueSlider from '../_HueSlider'
import AlphaSlider from '../_AlphaSlider'
import ShadeField from '../_ShadeField'

export default {
  components: {
    'veui-color-hue-slider': HueSlider,
    'veui-color-alpha-slider': AlphaSlider,
    'veui-color-shade-field': ShadeField
  },
  props: {
    hue: Number,
    saturation: Number,
    brightness: Number,
    alpha: Number
  },
  computed: {
    color () {
      return tinycolor({
        h: this.hue,
        s: this.saturation,
        v: this.brightness,
        a: this.alpha
      }).toHslString()
    }
  }
}
