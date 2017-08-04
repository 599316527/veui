import ValueHsl from '../_ValueHsl'
import ValueRgb from '../_ValueRgb'
import ValueHex from '../_ValueHex'
import ValueAlpha from '../_ValueAlpha'

export default {
  components: {
    'veui-color-value-hsl': ValueHsl,
    'veui-color-value-rgb': ValueRgb,
    'veui-color-value-hex': ValueHex,
    'veui-color-value-alpha': ValueAlpha
  },
  props: {
    hue: Number,
    saturation: Number,
    brightness: Number,
    alpha: Number,
    readonly: {
      type: Boolean,
      default: false
    }
  }
}
