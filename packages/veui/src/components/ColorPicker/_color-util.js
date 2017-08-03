/**
 * @file 颜色相关工具
 * @author Kyle He (me@kylehe.me)
 */

/**
 * 格式化 hsla
 *
 * @param  {Number} color.h         Hue
 * @param  {Number} color.s         Saturation
 * @param  {Number} color.l         Lightness
 * @param  {Number} color.a         Alpha
 * @param  {Number} options.precision precision
 * @return {String}
 */
export function formatHsla ({h, s, l, a}, {precision = 4} = {}) {
  precision = Math.pow(10, precision)
  h = Math.round(h % 360 * precision) / precision
  s = Math.round(s * 100 * precision) / precision
  l = Math.round(l * 100 * precision) / precision
  a = Math.round(a * precision) / precision
  return a === 1 ? `hsl(${h}, ${s}%, ${l}%)` : `hsla(${h}, ${s}%, ${l}%, ${a})`
}
