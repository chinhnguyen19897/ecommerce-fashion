<template>
  <ClientOnly>
    <!--    <Stepper
          v-slot="{ isNextDisabled, isPrevDisabled, nextStep, prevStep }"
          v-model="stepIndex"
          class="block w-full"
        >
          <form @submit.prevent="submitForm">
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
            <div v-if="stepIndex === 1">
              <ContactPersonForm :formData="formData" :validValue="$v" />
            </div>
            <div v-if="stepIndex === 2">
              <CheckoutPayments />
            </div>
            <div class="mb-4 mt-8 flex items-center justify-end">
              <div class="flex items-center gap-3">
                <BaseBtn
                  btnClass="!p-4 bg-[#8B4513] uppercase text-[#fff] font-regular text-[16px] rounded-none"
                  label="buttonLabel"
                  type="submit"
                  @click="nextStepForm"
                />
              </div>
            </div>
          </form>
        </Stepper>-->
    <StepperForm
      v-model:stepIndex="stepIndex"
      :buttonLabel="buttonLabel"
      :formData="formData"
      :steps="steps"
      :validValue="$v"
      @nextStepForm="nextStepForm"
      @submit="submitForm"
    >
      <template #step-content="{ stepIndex, formData, validValue }">
        <div v-if="stepIndex === 1">
          <ContactPersonForm :formData="formData" :validValue="validValue" />
        </div>
        <div v-if="stepIndex === 2">
          <CheckoutPayments />
        </div>
      </template>
    </StepperForm>
  </ClientOnly>
</template>

<script setup>
  import useVuelidate from '@vuelidate/core'
  import { required, email, minLength, maxLength, helpers } from '@vuelidate/validators'
  import StepperForm from '~/components/ui/shared/StepperForm/StepperForm.vue'

  const stepIndex = ref(1)
  const formData = reactive({
    name: '',
    phoneNumber: '',
    email: '',
    address: '',
    cityProvince: '',
    wards: ''
  })
  const rules = {
    name: {
      required: helpers.withMessage('Name is required', required)
    },
    phoneNumber: {
      required: helpers.withMessage('Phone number is required', required),
      minLength: helpers.withMessage('Phone number must be at least 9 characters', minLength(9)),
      maxLength: helpers.withMessage('Phone number must be at most 10 characters', maxLength(11))
    },
    email: {
      required: helpers.withMessage('Email is required', required),
      email: helpers.withMessage('Email is invalid', email)
    },
    address: {
      required: helpers.withMessage('Address is required', required)
    }
    /*cityProvince: {
required: helpers.withMessage("City/Province is required", required),
},
wards: {
required: helpers.withMessage("Wards is required", required),
},*/
  }

  const $v = useVuelidate(rules, formData)

  const submitForm = async () => {
    const result = await $v.value.$validate()
    console.log(formData)
    console.log(result, $v.value.$errors)
  }

  const nextStepForm = async () => {
    if (stepIndex.value === 1) {
      $v.value.$touch()
      const isValid = await $v.value.$validate()
      if (!isValid) return

      stepIndex.value++
    } else if (stepIndex.value === 2) {
    }
  }

  const buttonLabel = computed(() => {
    if (stepIndex.value === 1) return 'Continue to shipping'
    if (stepIndex.value === 2) return 'Continue to payment'
    return 'I already pay'
  })

  const steps = [
    {
      step: 1,
      title: 'PERSONAL INFO',
      description: 'Step 1'
    },
    {
      step: 2,
      title: 'PAYMENTS',
      description: 'Step 2'
    },
    {
      step: 3,
      title: 'CONFIRMATION',
      description: 'Step 3'
    }
  ]
</script>

<style scoped></style>
