import { ref, watch } from 'vue'

const modalList = ref([])
const addModal = (modal) => {
  const index = modalList.value.findIndex((item) => item.id === modal.id)
  if (index === -1) {
    modalList.value.push(modal)
  }
  switchWindowScroll(!modalList.value.length)
}

const removeModal = (modalId) => {
  const index = modalList.value.findIndex((modal) => modal.id === modalId)
  if (index !== -1) {
    modalList.value.splice(index, 1)
    switchWindowScroll(!modalList.value.length)
    return
  }
}
const switchWindowScroll = (open) => {
  document.body.style.overflowY = open ? 'auto' : 'hidden'
}
// 用 watch 太難測
// watch(modalList.value, (now) => {
//   switchWindowScroll(!now.length)
// })

const modalControl = {
  modalList,
  addModal,
  removeModal,
  switchWindowScroll,
}

export default modalControl
