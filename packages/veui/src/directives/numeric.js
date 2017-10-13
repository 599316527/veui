export default {
  bind (el, { modifiers }, vnode) {
    if (el.tagName.toLowerCase() !== 'input') {
      return
    }

    let {nodecimals} = modifiers

    let numericData = {
      inputHandler (evt) {
        let {key, altKey, shiftKey} = evt
        let val = el.value
        let matched = val.match(/^(\d+(?:\.\d+)?)(.*)$/)
        if (!matched) {
          return
        }
        let [digits, unit] = matched.slice(1)
        digits = parseFloat(digits)
        if (isNaN(digits)) {
          return
        }

        let increase = 0
        switch (key) {
          case 'ArrowUp':
            increase = 1
            break
          case 'ArrowDown':
            increase = -1
            break
          default:
            return
        }
        if (!nodecimals && altKey) {
          increase *= 0.1
        }
        if (shiftKey) {
          increase *= 10
        }

        // 因为加 0.1 所以处理一下，否则会出现 0.30000000000000004
        el.value = Math.round((digits + increase) * 10) / 10 + unit
      }
    }

    el.numericData = numericData
    el.addEventListener('keydown', numericData.inputHandler)
  },
  unbind (el) {
    let numericData = el.numericData
    el.removeEventListener('keydown', numericData.inputHandler)
    el.numericData = null
  }
}
