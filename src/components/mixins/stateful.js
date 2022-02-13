export default {
  props: {
    readonly: {
      type: Boolean,
      default: () => false,
    },
    disabled: {
      type: Boolean,
      default: () => false,
    },
    required: {
      type: Boolean,
      default: () => false,
    },
  },
  computed: {
    stateClass() {
      return {
        "c-field--readonly": this.readonly,
        "c-field--disabled": this.disabled,
        "c-field--required": this.required,
      };
    },
  },
};
