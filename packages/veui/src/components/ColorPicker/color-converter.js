// https://github.com/JuhQ/rgb-to-hsl/blob/master/index.js
export function rgb2hsl (r, g, b) {
  var d, h, l, max, min, s
  r /= 255
  g /= 255
  b /= 255
  max = Math.max(r, g, b)
  min = Math.min(r, g, b)
  h = 0
  s = 0
  l = (max + min) / 2
  if (max === min) {
    h = s = 0
  } else {
    d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
    }
    h /= 6
  }
  h = h * 360 % 360
  // console.log('hsl', [h, s, l])
  return [h, s, l]
}

// https://github.com/kayellpeee/hsl_rgb_converter/blob/master/converter.js
export function hsl2rgb (hue, saturation, lightness) {
  // based on algorithm from http://en.wikipedia.org/wiki/HSL_and_HSV#Converting_to_RGB
  hue = hue % 360

  var chroma = (1 - Math.abs((2 * lightness) - 1)) * saturation
  var huePrime = hue / 60
  var secondComponent = chroma * (1 - Math.abs((huePrime % 2) - 1))

  huePrime = Math.floor(huePrime)
  var red
  var green
  var blue

  if (huePrime === 0) {
    red = chroma
    green = secondComponent
    blue = 0
  } else if (huePrime === 1) {
    red = secondComponent
    green = chroma
    blue = 0
  } else if (huePrime === 2) {
    red = 0
    green = chroma
    blue = secondComponent
  } else if (huePrime === 3) {
    red = 0
    green = secondComponent
    blue = chroma
  } else if (huePrime === 4) {
    red = secondComponent
    green = 0
    blue = chroma
  } else if (huePrime === 5) {
    red = chroma
    green = 0
    blue = secondComponent
  }

  var lightnessAdjustment = lightness - (chroma / 2)
  red += lightnessAdjustment
  green += lightnessAdjustment
  blue += lightnessAdjustment

  // console.log('rgb', [Math.round(red * 255), Math.round(green * 255), Math.round(blue * 255)])
  return [Math.round(red * 255), Math.round(green * 255), Math.round(blue * 255)]
}

export function rgb2hex (r, g, b) {
  // console.log('rgb2hex', r, g, b)
  r = (r < 10 ? '0' : '') + r.toString(16)
  g = (g < 10 ? '0' : '') + g.toString(16)
  b = (b < 10 ? '0' : '') + b.toString(16)
  return `#${r}${g}${b}`.toUpperCase()
}

export function hex2rgb (hex) {
  hex = hex.substring(1)
  let ret = []
  for (let i = 0; i < hex.length; i += 2) {
    ret.push(parseInt(hex.substring(i, i + 2), 16))
  }
  return ret
}

export function color2hsla (val) {
  val = val.trim()
  if (/^#[0-9A-F]{6}$/i.test(val)) {
    let [hue, saturation, lightness] = rgb2hsl(...hex2rgb(val))
    return {
      hue,
      saturation,
      lightness,
      alpha: 1
    }
  } else if (/^rgba?\(\s?\d+(\s?,\s?\d+){2,3}(\s?,\s?0?\.?\d+)?\s?\)$/i.test(val)) {
    let values = val.substring(val.indexOf('(') + 1, val.lastIndexOf(')'))
      .split(',').map(function (digit) {
        return parseFloat(digit.trim()) || 0
      })
    let [red, green, blue] = values.slice(0, 3).map(function (i) {
      return Math.min(255, Math.max(0, Math.round(i)))
    })
    let alpha = Math.min(1, Math.max(0, values[3] || 1))
    let [hue, saturation, lightness] = rgb2hsl(red, green, blue)
    return {
      hue,
      saturation,
      lightness,
      alpha
    }
  } else if (/^hsla?\(\s?\d+(\.\d+)?(\s?,\s?\d+(\.\d+)?%){2}(\s?,\s?0?\.?\d+)?\s?\)$/i.test(val)) {
    let values = val.substring(val.indexOf('(') + 1, val.lastIndexOf(')'))
      .split(',').map(function (digit) {
        let a = parseFloat(digit.trim()) || 0
        if (digit.indexOf('%') >= 0) {
          a /= 100
        }
        return a
      })
    let [hue, saturation, lightness, alpha = 1] = [
      Math.min(359, Math.max(0, values[0] % 360))
    ].concat(values.slice(1).map(function (i) {
      return Math.min(1, Math.max(0, i))
    }))
    return {
      hue,
      saturation,
      lightness,
      alpha
    }
  } else {
    return color2hsla('#FF0000')
  }
}

const precision = 1e2
export function hsla2color (h, s, l, a) {
  h = Math.round(h % 360 * precision) / precision
  s = Math.round(s * 100 * precision) / precision
  l = Math.round(l * 100 * precision) / precision
  a = Math.round(a * precision) / precision
  return a === 1 ? `hsl(${h}, ${s}%, ${l}%)` : `hsla(${h}, ${s}%, ${l}%, ${a})`
}
