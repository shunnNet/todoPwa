<template>
  <label for="toggle" class="switch" :class="{ 'switch--on': modelValue }">
    <input
      type="checkbox"
      id="toggle"
      class="platform-three-checkbox"
      :value="modelValue"
      @input="handleChange"
      :name="name"
    />
    <span class="toggle-no">否</span>
    <span class="toggle-yes">是</span>
  </label>
</template>

<script>
export default {
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: [Boolean, String],
      require: true,
      default: false,
    },
    name: {
      type: String,
    },
  },
  methods: {
    handleChange($event) {
      console.log($event)
      this.$emit('update:modelValue', $event.target.value === 'false')
    },
  },
}
</script>

<style lang="scss">
.switch {
  position: relative;
  display: inline-block;
  width: 58px;
  height: 32px;
  background-color: #fff;
  transition: 0.3s;
  border-radius: 16px;
  border: 1px solid #eee;
  margin: 3px 0 0;
  cursor: pointer;
  user-select: none;
  .toggle-yes {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 6px;
    z-index: 1;
    color: #eee;
    transition: 0.3s;
    font-weight: 400;
  }
  .toggle-no {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 6px;
    z-index: 1;
    color: #fff;
    transition: 0.3s;
    font-weight: 400;
  }
  &::after {
    content: '';
    position: absolute;
    width: 28px;
    height: 28px;
    top: 1px;
    left: 1px;
    border-radius: 50%;
    background-color: #36bbd9;
    transition: 0.3s;
  }
  [type='checkbox'] {
    display: none;
  }
  &--on {
    &::after {
      transform: translateX(99%);
    }
  }
}
</style>
