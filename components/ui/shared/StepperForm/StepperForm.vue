<script lang="ts" setup>
  import { Check, Circle, Dot } from 'lucide-vue-next'

  defineProps<{
    steps: { step: number; title: string; description: string }[]
    stepIndex: number
    formData?: any
    validValue?: any
    buttonLabel?: string
  }>()
  defineEmits<{
    (e: 'update:stepIndex', value: number): void
    (e: 'submit'): void
    (e: 'nextStepForm'): void
  }>()
</script>

<template>
  <Stepper
    v-slot="{ isNextDisabled, isPrevDisabled, nextStep, prevStep }"
    :model-value="stepIndex"
    class="block w-full"
  >
    <form @submit.prevent="$emit('submit')">
      <div class="flex-start flex w-full gap-2">
        <StepperItem
          v-for="step in steps"
          :key="step.step"
          v-slot="{ state }"
          :step="step.step"
          class="item-center relative flex w-full flex-col justify-center"
        >
          <StepperSeparator
            v-if="step.step !== steps[steps.length - 1].step"
            class="absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
          />
          <StepperTrigger as-child>
            <Button
              :class="[
                state === 'active' && 'ring-2 ring-ring ring-offset-2 ring-offset-background'
              ]"
              :disabled="state !== 'completed'"
              :variant="state === 'completed' || state === 'active' ? 'default' : 'outline'"
              class="z-10 shrink-0 rounded-full"
              size="icon"
            >
              <Check v-if="state === 'completed'" class="size-5" />
              <Circle v-if="state === 'active'" />
              <Dot v-if="state === 'inactive'" />
            </Button>
          </StepperTrigger>
          <div class="mt-5 flex flex-col items-center text-center">
            <StepperTitle
              :class="[state === 'active' && 'text-primary']"
              class="text-sm font-semibold transition lg:text-base"
            >
              {{ step.title }}
            </StepperTitle>
            <StepperDescription
              :class="[state === 'active' && 'text-primary']"
              class="text-muted-foreground sr-only text-xs transition md:not-sr-only lg:text-sm"
            >
              {{ step.description }}
            </StepperDescription>
          </div>
        </StepperItem>
      </div>
      <slot
        :formData="formData"
        :stepIndex="stepIndex"
        :validValue="validValue"
        name="step-content"
      />

      <div class="mb-4 mt-8 flex items-center justify-end">
        <div class="flex items-center gap-3">
          <BaseBtn
            v-if="stepIndex < 3"
            :label="buttonLabel || 'Next'"
            btnClass="!p-4 bg-[#8B4513] uppercase text-[#fff] font-regular text-[16px] rounded-none"
            type="button"
            @click="$emit('nextStepForm')"
          />
          <BaseBtn v-else label="I already pay" type="submit" />
        </div>
      </div>
    </form>
  </Stepper>
</template>

<style scoped></style>
