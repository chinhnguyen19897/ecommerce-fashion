<>
<script lang="ts" setup>
  import { Field, type RuleExpression, useField } from 'vee-validate'

  const props = defineProps<{
    label?: string
    placeholder?: string
    modelValue?: string | number
    name: string
    type?: string
    rules?: RuleExpression<string | number>
    validateOnMount?: boolean
  }>()
  const emit = defineEmits<{
    (e: 'update:modelValue', val: string | number): void
  }>()
  const fieldRules = computed<RuleExpression<FieldValue> | undefined>(() => props.rules)

  const { value, errorMessage, handleBlur } = useField<string | number>(
    () => props.name,
    fieldRules,
    {
      initialValue: props.modelValue,
      validateOnMount: props.validateOnMount ?? false
    }
  )
  const model = computed({
    get: () => value.value as string | number,
    set: (val: string | number) => {
      let casted: string | number = val
      if (props.type === 'number' || typeof props.modelValue === 'number') {
        casted = val === '' || val === null ? '' : Number(val)
      }
      value.value = casted
      emit('update:modelValue', casted)
    }
  })
  watch(
    () => props.modelValue,
    (nv) => {
      if (nv !== value.value) value.value = nv
    }
  )
</script>

<template>
  <FormItem>
    <FormLabel>{{ props.label }}</FormLabel>
    <FormControl>
      <Input
        v-model="model"
        :aria-describedby="errorMessage ? `${props.name}-error` : undefined"
        :aria-invalid="!!errorMessage || undefined"
        :name="props.name"
        :placeholder="props.placeholder"
        :type="props.type || 'text'"
        @blur="handleBlur"
      />
      <FormMessage
        v-if="errorMessage"
        :id="`${props.name}-error`"
        class="text-red-600 mt-1 text-sm"
      >
        {{ errorMessage }}
      </FormMessage>
    </FormControl>
  </FormItem>
</template>

<style scoped></style>
