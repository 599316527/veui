<template>
  <article>
    <h1><code>&lt;veui-button&gt;</code></h1>
    <p>
      <veui-button ui="micro">保存</veui-button>
      <veui-button ui="tiny">保存</veui-button>
      <veui-button ui="small">保存</veui-button>
      <veui-button ui="secondary">保存</veui-button>
      <veui-button ui="large">保存</veui-button>
      <veui-button disabled>保存</veui-button>
      <veui-button loading>保存</veui-button>
    </p>
    <p>
      <veui-button ui="micro"><icon name="cross-small"></icon> 取消</veui-button>
      <veui-button ui="tiny"><icon name="cross-small"></icon> 取消</veui-button>
      <veui-button ui="small"><icon name="cross-small"></icon> 取消</veui-button>
      <veui-button><icon name="cross-small"></icon> 取消</veui-button>
      <veui-button ui="large"><icon name="cross-small"></icon> 取消</veui-button>
      <veui-button disabled><icon name="cross-small"></icon> 取消</veui-button>
      <veui-button loading><icon name="cross-small"></icon> 取消</veui-button>
    </p>
    <p>
      <veui-button ui="round micro"><icon name="edit"></icon></veui-button>
      <veui-button ui="round tiny"><icon name="edit"></icon></veui-button>
      <veui-button ui="round small"><icon name="edit"></icon></veui-button>
      <veui-button ui="round"><icon name="edit"></icon></veui-button>
      <veui-button ui="round large"><icon name="edit"></icon></veui-button>
      <veui-button ui="round" disabled><icon name="edit"></icon></veui-button>
      <veui-button ui="round" loading><icon name="edit"></icon></veui-button>
    </p>
  </article>
</template>

<script>
import bus from '../bus'
import { Button, Icon } from 'veui'
import 'veui-theme-vedit/icons/cross-small'
import 'veui-theme-vedit/icons/check'
import 'veui-theme-vedit/icons/edit'
import 'veui-theme-vedit/icons/search'
import 'veui-theme-vedit/icons/cross'

export default {
  name: 'button-demo',
  components: {
    Icon,
    'veui-button': Button
  },
  mounted () {
    this.$children.forEach(child => {
      child.$on('click', () => {
        bus.$emit('log', child.$el.getAttribute('ui'))
      })
    })
  }
}
</script>

<style scoped>
p {
  user-select: none;
}

.veui-button {
  margin-right: 10px;
}
</style>
