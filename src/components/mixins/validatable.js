export default {
  $_veeValidate: {
    value() {
      return this.innerValue
    },
    name() {
      return this.name
    }
  },
  props: {
    name: {
      type: String,
      required: true
    },
    errors: {
      type: Array,
      default: () => []
    },
    value: {}
    // state: {
    //   type: Object,
    //   default: ()=>({
    //     valid: false,
    //     invalid : false,
    //     untouched: false
    //   })
    // }
  },
  data() {
    return {
      innerValue: this.value
    }
  },
  computed: {
    validateClass() {
      return {
        'c-field--invalid': this.error !== ''
      }
    }
    // validateClass(){
    //   return {
    //     [`${this.$options.name}--valid`]: this.valid,
    //     [`${this.$options.name}--invalid`]: this.invalid,
    //     [`${this.$options.name}--untouched`]: this.untouched
    //   }
    // }
  }
}
