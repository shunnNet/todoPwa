<template>
  <div id="modal"></div>
  <div class="layout">
    <TodoMenu class="layout-menu" />
    <main class="layout-main">
      <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
      <TodoList @delete="handleDelete" :items="todoItems" />

      <Dialog v-model="isShowEditItemForm">
        <template v-slot:title> 新增待辦事項 </template>
        <template v-slot="{ close }">
          <EditItemForm
            @submit="
              ($event) => {
                handleSubmit($event)
                close()
              }
            "
          />
          <button @click="toggleEditItemForm(false)">close</button>
        </template>
      </Dialog>
      <CirclePlus class="addItemButon" @click="toggleEditItemForm(true)" />
    </main>

    <DetailDrawer class="layout-drawer" />
  </div>
</template>

<script>
import TodoList from '@/components/TodoList.vue'
import EditItemForm from '@/components/form/EditItemForm.vue'
import { ref } from 'vue'
import Dialog from './components/modal/Dialog.vue'
import SimpleModal from '@/components/modal/SimpleModal.vue'
import {
  addTodoItem,
  getAllTodoItem,
  getAllKeys,
  deleteTodoItem,
} from '@/assets/database/database.js'
import TodoMenu from './layouts/TodoMenu.vue'
import DetailDrawer from './layouts/DetailDrawer.vue'
import CirclePlus from './components/CirclePlus.vue'

export default {
  setup() {
    const isShowEditItemForm = ref(false)

    const toggleEditItemForm = (status = false) => {
      isShowEditItemForm.value = status
    }
    const handleSubmit = async (form) => {
      await addTodoItem(form)
      todoItems.value = []

      getAllTodoItem().then((res) => {
        console.log(res)
        todoItems.value.push(...res)
      })
    }
    const handleDelete = (item) => {
      console.log(item)
      deleteTodoItem(item)
      todoItems.value = []
      getAllTodoItem().then((res) => {
        console.log(res)
        todoItems.value.push(...res)
      })
    }
    getAllKeys().then((res) => {
      console.log(res)
    })

    const todoItems = ref([])
    getAllTodoItem().then((res) => {
      console.log(res)
      todoItems.value.push(...res)
    })

    return {
      isShowEditItemForm,
      handleDelete,
      toggleEditItemForm,
      todoItems,
      handleSubmit,
    }
  },
  name: 'App',
  components: {
    TodoList,
    EditItemForm,
    Dialog,
    SimpleModal,
    TodoMenu,
    DetailDrawer,
    CirclePlus,
  },
}
</script>

<style lang="scss">
.layout {
  margin: auto;
  display: flex;
}
.layout {
  &-menu {
    max-width: 300px;
    width: 100%;
    height: 100vh;
    overflow: auto;
    position: relative;
    padding: 20px;
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background-color: #000000;
      z-index: -1;
      filter: opacity(0.7);
    }
  }
  &-main {
    position: relative;
    flex: 1;
    padding: 20px;
    color: $base;
  }
}
.addItemButon {
  position: absolute;
  bottom: 20px;
  right: 20px;
}
</style>
