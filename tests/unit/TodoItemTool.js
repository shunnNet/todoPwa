import { shallowMount, VueWrapper } from '@vue/test-utils'
import TodoItemTool from '@/components/TodoItemTool.vue'
import WrapperLike from '@vue/test-utils/dist/interfaces/wrapperLike'
import BaseWrapper from '@vue/test-utils/dist/baseWrapper'

function buildWrapper(options: object = {}) {
  return shallowMount(TodoItemTool, options)
}

describe('TodoItemTool.vue', () => {
  it('傳入參數 todoItem，會顯示 todoItem.title', () => {})

  it('點擊完成按鈕，會標示為完成', async () => {
    const wrapper = buildWrapper()

    await wrapper.find(`[data-test="complete"]`).trigger('click')
    const status = wrapper.find(`[data-test-status="complete"]`)

    expect(status.exists).toBe(true)
  })
  it('點擊編輯按鈕，會發射 edit 事件', async () => {
    const wrapper = buildWrapper()

    await wrapper.find('[data-test-edit]').trigger('click')

    expect(wrapper.emitted('edit')).toHaveLength(1)
  })

  it('傳入不同的 toolList 時，出現不同的工具', () => {
    const allList = ['edit', 'label', 'step', 'timer', 'status', 'percent']
    const toolList = ['edit', 'label', 'step', 'timer']
    const wrapper = buildWrapper({ toolList })

    function expectToolExist(type: string, exist: boolean) {
      const tool = wrapper.find(`[data-test-${type}]`)
      expect(tool.exists()).toBe(true)
    }
    allList.forEach((toolName) => {
      const shouldBeExist = toolList.includes(toolName)
      expectToolExist(toolName, shouldBeExist)
    })
  })
})
