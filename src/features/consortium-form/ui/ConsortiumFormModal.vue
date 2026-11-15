<script setup lang="ts">
import { useConsortiumForm } from '../api/useConsortiumForm'
import ConsortiumFormFields from './ConsortiumFormFields.vue'
import ConsortiumFormSuccess from './ConsortiumFormSuccess.vue'

const isOpen = defineModel<boolean>({ required: true })
const staticDemo = useRuntimeConfig().public.staticDemo

const { formData, errors, status, submitErrorMessage, touch, submit, reset } = useConsortiumForm()

watch(isOpen, (value) => {
  if (!value) reset()
})
</script>

<template>
  <UiModal v-model="isOpen" size="2xl" fullscreen-on-mobile>
    <ConsortiumFormSuccess v-if="status === 'success'" />

    <form v-else novalidate class="flex flex-col gap-7 md:gap-10" @submit.prevent="submit">
      <ConsortiumFormFields v-model:form-data="formData" :errors="errors" @blur="touch" />

      <p v-if="staticDemo" class="text-center text-sm" role="status">
        Это демонстрационная версия сайта. Отправка заявок недоступна.
      </p>
      <UiAction
        type="submit"
        class="mx-auto h-13 w-54"
        :disabled="staticDemo || status === 'submitting'"
      >
        {{ status === 'submitting' ? 'Отправка…' : 'Отправить' }}
      </UiAction>

      <p v-if="status === 'error'" class="text-destructive text-center text-sm" role="alert">
        {{ submitErrorMessage }}
      </p>
    </form>
  </UiModal>
</template>
