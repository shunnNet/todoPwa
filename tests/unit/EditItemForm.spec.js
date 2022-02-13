import {
  mount,
  shallowMount,
  createLocalVue,
  flushPromises,
} from '@vue/test-utils'

import { nextTick } from 'vue'

import cmp from '@/components/form/EditItemForm.vue'

function makeWrapper(typeMount = shallowMount, options = {}) {
  return typeMount(cmp, {
    ...options,
  })
}
describe('EditItemForm.spec.js', () => {
  it('具有 field: title', async () => {
    const wrapper = makeWrapper()

    const fieldExist = wrapper.findField('title').exists()

    expect(fieldExist).toBe(true)
  })
  it('具有 field: sticky', async () => {
    const wrapper = makeWrapper()

    const fieldExist = wrapper.findField('sticky').exists()

    expect(fieldExist).toBe(true)
  })
  it('具有 field: tags', async () => {
    const wrapper = makeWrapper()

    const fieldExist = wrapper.findField('tags').exists()

    expect(fieldExist).toBe(true)
  })
  it('提交時，若 title 未填，則顯示錯誤訊息', async () => {
    const wrapper = makeWrapper()
    await wrapper.submit()
    await nextTick()

    const fieldExist = wrapper.findErrorFieldByName('title').exists()

    expect(fieldExist).toBe(true)
  })
})
