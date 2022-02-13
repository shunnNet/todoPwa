export default {
  emits: ['focus', 'blur'],
  props: {
    autofocus: {
      type: Boolean,
    },
  },
  data() {
    return {
      isFocus: false,
    }
  },
  computed: {
    focusClass() {
      return {
        'c-field--focus': this.isFocus,
      }
    },
  },
  methods: {
    handleFocus() {
      this.isFocus = true
      this.$emit('focus')
    },
    handleBlur() {
      this.isFocus = false
      this.$emit('blur')
    },
    focus() {
      this.$refs.unit && this.$refs.unit.focus()
    },
    blur() {
      this.$refs.unit && this.$refs.unit.blur()
    },
  },
}
