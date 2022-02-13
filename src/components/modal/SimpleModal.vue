<template>
  <teleport :to="attach">
    <transition appear :name="transitionName">
      <div
        class="simple-modal"
        v-if="modelValue"
        @click="close"
        :style="{ zIndex }"
        data-test="overlay"
      >
        <div
          class="simple-modal__content"
          :class="contentClass"
          data-test="content"
          @click.stop
        >
          <slot :close="close"></slot>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
import { getCurrentInstance, onUpdated, ref, watch } from 'vue-demi'
import modalControl from './modalControl.js'
export default {
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    transitionName: {
      type: String,
      default: 'SimpleModal',
    },
    attach: {
      type: String,
      default: '#modal',
    },
    contentClass: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    const zIndex = ref(99999)

    const vm = getCurrentInstance()

    watch(
      () => props.modelValue,
      (now) => {
        if (now === true) {
          const z = modalControl.modalList.length
            ? modalControl.modalList.slice(-1)[0].zIndex + 1
            : zIndex.value

          modalControl.addModal({ id: vm._uid, zIndex })
          zIndex.value = z
        }
      }
    )
    const close = () => {
      emit('update:modelValue', false)
    }

    onUpdated(() => {
      if (props.modelValue === false) {
        modalControl.removeModal(vm._uid)
      }
    })

    return {
      zIndex,
      close,
    }
  },
}
</script>

<style lang="scss">
.simple-modal {
  position: fixed;
  z-index: 99999;
  background-color: rgba(0, 0, 0, 0.6);
  inset: 0;
  opacity: 1;

  &__content {
    transform-origin: center;
  }
}
.SimpleModal {
  &-enter-active,
  &-leave-active {
    transition: background-color 0.4s !important;
    .simple-modal__content {
      transition: transform 0.2s;
    }
  }
  &-enter-from,
  &-leave-to {
    background-color: transparent !important;
    .simple-modal__content {
      transform: scaleY(0);
    }
  }
  &-enter-to,
  &-leave-from {
    background-color: rgba(0, 0, 0, 0.6);
    .lb-modal__content {
      transform: scaleY(1);
    }
  }
}
</style>
