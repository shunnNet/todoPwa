import { ref, watch } from 'vue'

export default function useFlashShow(getter, milesecond) {
  const show = ref(true)
  watch(getter, () => {
    if (show.value === true) {
      show.value = false
      setTimeout(() => {
        show.value = true
      }, milesecond)
    }
  })
  return { show }
}
