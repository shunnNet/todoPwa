<template>
  <SimpleModal content-class="dialog__wrapper">
    <template v-slot="{ close }">
      <div class="dialog">
        <header class="dialog__header">
          <slot name="title"></slot>
          <slot name="action" :close="close">
            
          </slot>
        </header>
        <slot :close="close"></slot>
      </div>
    </template>
  </SimpleModal>
</template>

<script>
import SimpleModal from './SimpleModal.vue'

export default {
  name: 'Dialog',
  components: {
    SimpleModal,
  },
}
</script>

<style lang="scss">
.dialog__wrapper {
  display: grid;
  place-items: center;
  padding-top: 20vh;
  width: 100%;
}
.dialog {
  text-align: left;
  background-color: #fff;
  border-radius: 4px;
  padding: 10px;
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
