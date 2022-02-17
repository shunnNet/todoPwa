<template>
  <TodoItem
    v-for="item in stickyItems"
    :key="item.title"
    :todoItem="item"
    @statusChange="handleStatusChange"
  />
  <Divider v-if="stickyItems.length > 0"> 我是分隔線 </Divider>
  <TodoItem
    v-for="item in nonStickItems"
    :key="item.title"
    :todoItem="item"
    @statusChange="handleStatusChange"
    @delete="handleDelete"
  />
</template>

<script>
import { computed, reactive, ref } from '@vue/reactivity'
import TodoItem from '@/components/TodoItem'
import Divider from '@/components/Divider.vue'
import { watch, watchEffect } from '@vue/runtime-core'
import {
  addTodoItem,
  getAllTodoItem,
  deleteTodoItem,
  modifyCompleteState,
} from '@/assets/database/database.js'
// import EditItemForm from '@/components//EditItemForm.vue'
export default {
  emits: ['delete'],
  components: {
    TodoItem,
    Divider,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const handleStatusChange = (item) => {
      modifyCompleteState(item)
    }
    const stickyItems = computed(() => [
      ...props.items.filter((item) => item.isComplete),
    ])
    const nonStickItems = computed(() =>
      props.items.filter((item) => !item.isComplete)
    )
    watchEffect(() => {
      console.log(stickyItems)
    })

    const handleDelete = (e) => {
      emit('delete', e)
      deleteTodoItem(e)
      console.log('deleted', e.title)
    }
    return {
      stickyItems,
      nonStickItems,
      handleDelete,

      handleStatusChange,
    }
  },
}
</script>

<style></style>
