
import ColorUpdater from './_ColorUpdater'
import Input from '../../Input'
import {numeric} from '../../../directives'

export default {
  components: {
    'veui-input': Input
  },
  mixins: [
    ColorUpdater
  ],
  props: {
    readonly: {
      type: Boolean,
      default: false
    }
  },
  directives: {
    numeric
  }
}
