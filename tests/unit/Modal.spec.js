import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import cmp from '@/components/modal/SimpleModal.vue'

function buildWrapper(props, stubs, slots = '123') {
  return mount(cmp, {
    props: {
      modelValue: true,
      ...props,
    },
    global: {
      stubs: {
        teleport: true,
        transition: false,
        ...stubs,
      },
    },
    slots: {
      default: slots,
    },
  })
}

describe('Modal.vue', () => {
  describe('參數: modelValue', () => {
    it('若 modelValue 是 true, 則顯示 modal', async () => {
      const wrapper = buildWrapper({
        modelValue: true,
      })

      const modalExist = wrapper.findDataTest('', 'overlay').exists()

      expect(modalExist).toBe(true)
    })
    it('若 modelValue 是 false, 則不顯示 modal', async () => {
      const wrapper = buildWrapper({
        modelValue: false,
      })

      const modalExist = wrapper.findDataTest('', 'overlay').exists()
      expect(modalExist).toBe(false)
    })
  })
  describe('參數: transition-name', () => {
    it('若傳入 transition-name 參數，則會成轉場的 class-name', () => {
      const wrapper = buildWrapper({
        transitionName: 'test',
      })
      const testClassExist = wrapper.find('.test-enter-from').exists()

      expect(testClassExist).toBe(true)
    })
  })
  describe('參數: to', () => {
    it('若不傳入，則預設是 #modal', () => {
      document.body.innerHTML = `<div id='modal'></div>`
      const wrapper = buildWrapper(
        {},
        {
          teleport: false,
          transition: false,
        }
      )
      const teleportSuccess =
        document.body.querySelector('#modal > [data-test="overlay"]') !== null

      expect(teleportSuccess).toBe(true)
    })
    it('若傳入，則是找傳入的selector ', () => {
      const selector = '#dialog'
      document.body.innerHTML = `<div id='${selector.slice(1)}'></div>`
      const wrapper = buildWrapper(
        {
          attach: selector,
        },
        {
          teleport: false,
          transition: false,
        }
      )
      const teleportSuccess =
        document.body.querySelector(`${selector} > [data-test="overlay"]`) !==
        null

      expect(teleportSuccess).toBe(true)
    })
  })
  describe('參數: contentClass ', () => {
    it('若傳入 則作為 content wrapper 的 class', () => {
      const wrapper = buildWrapper({
        contentClass: 'test-class',
      })
      const classExist = wrapper
        .findDataTest('', 'content')
        .classes('test-class')

      expect(classExist).toBe(true)
    })
  })
  describe('事件: update:modelValue', () => {
    it('若點擊 overlay， 則發射 update:modelValue 事件', async () => {
      const wrapper = buildWrapper()
      await wrapper.findDataTest('', 'overlay').trigger('click')
      expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
    })
  })
  describe('slot: default', () => {
    it('可傳入 slot: default, 並接收 close 方法', async () => {
      const slotContent = (props) =>
        h('button', { id: 'close', onClick: props.close }, 'close')
      const wrapper = buildWrapper({}, {}, slotContent)
      await wrapper.find('#close').trigger('click')
      await nextTick()

      const closeEffectCorrectly =
        wrapper.emitted('update:modelValue')[0][0] === false

      expect(closeEffectCorrectly).toBe(true)
    })
  })
})
