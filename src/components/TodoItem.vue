<template>
  <div
    @click="handleClick"
    class="todoItem"
    :class="{
      'todoItem--complete': todoItem.isComplete,
      'todoItem--sticky': todoItem.sticky,
    }"
    :data-test-status="todoItem.isComplete ? 'complete' : 'pending'"
  >
    <div class="todoItem__main">
      <div class="d-flex f-cross-center">
        <TodoChecker
          @check="handleChange"
          :value="todoItem.isComplete"
          @click.stop
        />
        <span :data-test-title="todoItem.title" class="todoItem__title">
          {{ todoItem.title }}
        </span>
      </div>
      <label>
        <input
          type="checkbox"
          data-test-check="sticky"
          @change="handleStick"
          :value="todoItem.sticky"
          @click.stop
          true-value="true"
        />
      </label>
    </div>
    <div class="todoItem__sub">
      <Tag :theme="tag.theme" v-for="tag in todoItem.tags" :key="tag.id">
        {{ tag.tag }}
      </Tag>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import Tag from '@/components/Tag.vue'
import TodoChecker from './TodoChecker.vue'
export default {
  props: {
    todoItem: {
      required: true,
      type: Object,
    },
  },
  components: {
    Tag,
    TodoChecker,
  },
  setup(props, { emit }) {
    const handleChange = (event) => {
      props.todoItem.isComplete = !props.todoItem.isComplete
      emit('statusChange', props.todoItem)
    }
    const handleClick = (event) => {
      emit('detail', props.todoItem)
    }
    const status = computed(() => (props.todoItem.isComplete ? 'complete' : ''))

    const handleStick = () => {
      props.todoItem.sticky = !props.todoItem.sticky
      emit('stick', props.todoItem)
    }

    return {
      status,
      handleChange,
      handleClick,
      handleStick,
    }
  },
}
</script>

<style lang="scss">
.todoItem {
  padding: 15px 10px;
  border-bottom: 1px solid #c3c3c3;
  text-align: left;

  &__title {
    margin-left: 10px;
  }
  &__main {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__sub {
    margin-top: 3px;
    margin-left: 30px;
  }
}

.todoItem--complete {
  .todoItem__title {
    text-decoration: line-through;
  }
}
</style>
