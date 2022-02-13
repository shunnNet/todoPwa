export default {
  props: {
    dark : Boolean,
  },
  computed: {
    theme(){
      return {
        "c-field--dark" : this.dark
      }
    }
  },
}