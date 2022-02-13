<template>
  <form @submit.prevent="submitIfValid">
    <CInput
      label="標題"
      name="title"
      :errors="v$.title.$error ? ['這地方必填'] : []"
      @blur="v$.title.$touch"
      v-model="form.title"
    />

    <Switcher name="sticky" v-model="form.sticky" />
    <VueMultiselect
      v-model="form.tags"
      :options="options"
      :multiple="true"
      placeholder="選擇標籤"
      :close-on-select="false"
      label="tag"
      track-by="tag"
    />

    <button type="submit">提交</button>
  </form>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

import CInput from '@/components/CInput.vue'
import Switcher from '@/components/Switcher.vue'
import { reactive } from 'vue'

export default {
  emits: ['error', 'submit'],
  components: {
    CInput,
    Switcher,
  },
  setup() {
    const options = [{ tag: '老師' }, { tag: '教師' }, { tag: '先生' }]
    const form = reactive({
      title: '',
      sticky: false,
      tags: [],
    })
    const rules = { title: { required } }
    const v$ = useVuelidate(rules, form)

    return {
      form,
      v$,
      options,
    }
  },
  methods: {
    async submitIfValid() {
      const isValid = await this.v$.$validate()
      if (!isValid) {
        this.$emit('error')
        return
      }
      this.$emit('submit', this.form)
    },
  },
}
</script>

<style></style>
