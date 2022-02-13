export default {
  emits: ["update:modelValue"],
  props: {
    modelValue: String,
    name: {
      type: String
    },
    label: {
      type: String
    }
  },
  data() {
    return {
      innerValue: ""
    }
  },
  created() {
    this.updateInnerValueByProp()
  },
  methods: {
    updateInnerValueByProp() {
      this.innerValue = this.value
    }
  },
  watch: {
    value() {
      this.updateInnerValueByProp()
    }
  },
}
