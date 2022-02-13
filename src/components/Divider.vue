<template>
  <div class="divider">
    <div class="divider-line"></div>
    <span class="divider-text"> <slot></slot> </span>
    <div class="divider-line"></div>
  </div>
</template>

<style lang="scss">
.divider {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 30px auto;
  width: 100%;
  &-text {
    color: grey;
    padding: 0 10px;
    font-style: italic;
  }
  &-line {
    flex: 1;
    height: 1px;
    background-color: grey;
    width: 100%;
  }
}
</style>
