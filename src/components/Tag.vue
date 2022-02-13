<template>
  <span class="tag" :class="[theme, ...ellipsis]" :style="width">
    <slot></slot>
  </span>
</template>

<script>
import { isNumber } from '@/assets/js/assert.js'
import { tagTheme } from '@/assets/js/helper.js'
import { computed } from '@vue/reactivity'

export default {
  props: {
    type: {
      default: () => 'Default',
    },
    ellipsis: {
      type: Boolean,
      default: () => false,
    },
    width: {
      type: Number,
    },
  },
  setup(props, context) {
    const theme = computed(() => `tag--${tagTheme[props.type]}`)
    const ellipsis = computed(() => (props.ellipsis ? ['text-ellipsis'] : []))
    const width = computed(() =>
      isNumber(props.width) ? `${props.width}px` : 'auto'
    )
    return {
      theme,
      ellipsis,
    }
  },
}
</script>

<style lang="scss">
.tag {
  font-size: 0.6em;
  display: inline-block;
  margin: 0 5px 5px 0;
  padding: 5px 8px;
  border-radius: 5px;
  background-color: lightseagreen;
  vertical-align: bottom;
  color: #fff;
  &:last-child {
    margin: 0 0 5px 0;
  }
}
</style>
