import { shallowMount, VueWrapper } from '@vue/test-utils'
import TodoItem from '@/components/TodoItem.vue'
import Tag from '@/components/Tag.vue'

function buildWrapper(options) {
  return shallowMount(TodoItem, {
    props: {
      todoItem: {
        title: '吃早餐',
        isComplete: false,
        tags: [],
        ...options,
      },
    },
  })
}
describe('TodoItem.vue', () => {
  it('傳入參數 todoItem，會顯示 todoItem.title', () => {
    const todoItem = { title: '吃晚餐' }
    const wrapper = buildWrapper(todoItem)

    const title = wrapper
      .find(`[data-test-title="${todoItem.title}"]`)
      .text()
      .trim()
    expect(title).toBe(todoItem.title)
  })
  it('點擊 item 本身，會發射 detail 事件', async () => {
    const wrapper = buildWrapper()
    await wrapper.trigger('click')

    expect(wrapper.emitted('detail')).toHaveLength(1)
  })
  it('點擊釘選，會發射 stick 事件', async () => {
    const wrapper = buildWrapper({ sticky: false })
    await wrapper.find(`[data-test-check="sticky"]`).trigger('change')

    expect(wrapper.emitted('stick')).toHaveLength(1)
  })
  it('點擊完成按鈕，會標示為完成', async () => {
    const wrapper = buildWrapper()

    await wrapper.find(`[data-test="check"]`).trigger('change')
    const status = wrapper.find(`[data-test-status="complete"]`)

    expect(status.exists()).toBe(true)
  })
  it('點擊完成按鈕兩次，會標示為未完成', async () => {
    const wrapper = buildWrapper()

    await wrapper.find(`[data-test="check"]`).trigger('change')
    await wrapper.find(`[data-test="check"]`).trigger('change')
    const status = wrapper.find(`[data-test-status="pending"]`)

    expect(status.exists()).toBe(true)
  })
  it('點擊完成按鈕，會 emit statusChange 事件', async () => {
    const wrapper = buildWrapper()

    await wrapper.find(`[data-test="check"]`).trigger('change')

    expect(wrapper.emitted('statusChange')).toHaveLength(1)
  })
  describe('tag', () => {
    it('根據 todoItem.tag 陣列數量，顯示對應的 tag 數量', async () => {
      const todoItem = {
        title: '摺衣服',
        tags: [
          { text: '家事', theme: 'Coding', id: 2 },
          { text: '日課', theme: 'City', id: 1 },
        ],
      }
      const wrapper = buildWrapper(todoItem)

      const tags = wrapper.findAllComponents(Tag)
      expect(tags).toHaveLength(todoItem.tags.length)
    })
  })
})
