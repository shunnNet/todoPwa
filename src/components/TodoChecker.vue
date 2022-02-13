<script>
import useFlashShow from '@/composition/useFlashShow'
export default {
  emits: ['check'],
  props: {
    value: {
      default: false,
      type: Boolean,
    },
  },
  setup(props) {
    const { show } = useFlashShow(() => props.value, 100)

    return {
      show,
    }
  },
}
</script>
<template>
  <label class="todoChecker">
    <input
      class="todoChecker__checkbox"
      type="checkbox"
      data-test="check"
      @change="$emit('check')"
      :value="value"
    />
    <transition name="flip">
      <div
        class="todoChecker__checker"
        :class="{ 'todoChecker__checker--checked': value }"
        v-if="show"
      >
        <FontAwesomeIcon icon="check" v-if="value" />
      </div>
    </transition>
  </label>
</template>
<style lang="scss">
.todoChecker {
  cursor: pointer;
  &__checkbox {
    display: none;
  }
  &__checker {
    @include circle(25px);
    @extend %flexCenter;
    border: 2px solid $primary;
    padding: 5px;
    .svg-inline--fa {
      width: 15px;
    }
    &--checked {
      background-color: $primary;
    }
  }
}
.flip-enter-from,
.flip-leave-to {
  transform: rotateY(180deg);
  opacity: 0;
}
.flip-enter-to,
.flip-leave-from {
  transform: rotateY(0deg);
  opacity: 1;
}
.flip-enter-active,
.flip-leave-active {
  transition: transform 0.2s, opacity 0.2s;
}
</style>
