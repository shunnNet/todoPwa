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
  />
</template>

<script>
import { computed, reactive, ref } from '@vue/reactivity'
import TodoItem from '@/components/TodoItem'
import Divider from '@/components/Divider.vue'
import { watch, watchEffect } from '@vue/runtime-core'
import { addTodoItem, getAllTodoItem } from '@/assets/database/database.js'
// import EditItemForm from '@/components//EditItemForm.vue'
export default {
  components: {
    TodoItem,
    Divider,
  },
  setup() {
    const handleStatusChange = (item) => {
      console.log(item.title, ' complete!')
    }

    const todoItems = ref([])
    getAllTodoItem().then((res) => {
      todoItems.value.push(...res)
    })
    const stickyItems = computed(() => [
      ...todoItems.value.filter((item) => item.isComplete),
    ])
    const nonStickItems = computed(() =>
      todoItems.value.filter((item) => !item.isComplete)
    )
    watchEffect(() => {
      console.log(stickyItems)
    })
    return {
      todoItems,
      stickyItems,
      nonStickItems,

      handleStatusChange,
    }
  },
}
</script>

<style></style>
