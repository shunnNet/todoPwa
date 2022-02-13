import modalControl from '@/components/modal/modalControl.js'
import { nextTick } from 'vue'
import { flushPromises } from '@vue/test-utils'

// a store use to control z-index

function reset() {
  modalControl.modalList.value = []
}

describe('modalControl.spec.js', () => {
  describe('呼叫 addModal', () => {
    it('若 modalList 中沒有該 modal.id，則 push 到 modalList', () => {
      const modal = { id: 123 }

      modalControl.addModal(modal)

      expect(modalControl.modalList.value[0]).toMatchObject(modal)
    })
    it('若 modalList 中已經有該 modal.id，則不會 push 到 modalList', () => {
      const modal = { id: 123 }

      modalControl.addModal(modal)
      modalControl.addModal(modal)

      expect(modalControl.modalList.value).toHaveLength(1)
    })
  })
  describe('呼叫 removeModal', () => {
    it('若 modalList 中沒有該 modal.id，則沒有動作', () => {
      const modal = { id: 123 }
      modalControl.modalList.value = [modal]

      modalControl.removeModal(456)

      expect(modalControl.modalList.value).toHaveLength(1)
    })
    it('若 modalList 中已經有該 modal.id，則會從 modalList 中移除', () => {
      const modal = { id: 123 }
      modalControl.modalList.value = [modal]

      modalControl.removeModal(modal.id)

      expect(modalControl.modalList.value).toHaveLength(0)
    })
  })
  describe('body scroll', () => {
    it('若 modalList 有長度，則 body 的 overflowY 是 hidden', async () => {
      const modal = { id: 123 }
      modalControl.addModal(modal)

      const bodyOverflowY = document.body.style.overflowY

      expect(bodyOverflowY).toBe('hidden')
      reset()
    })
    it('若 modalList 長度變成 0，則 body 的 overflowY 是 auto', async () => {
      const modal = { id: 123 }
      modalControl.addModal(modal)
      modalControl.removeModal(modal.id)


      const bodyOverflowY = document.body.style.overflowY

      expect(bodyOverflowY).toBe('auto')
    })
  })
})
