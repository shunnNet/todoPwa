<script>
export default {
  emits: ['click'],
}
</script>

<template>
  <button type="button" class="CirclePlus" @click="$emit('click')">
    <FontAwesomeIcon icon="plus" />
  </button>
</template>

<style lang="scss">
.CirclePlus {
  @extend %reset-btn;
  @extend %gridCenter;
  @include circle(50px);
  background-color: $primary;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
}
</style>
