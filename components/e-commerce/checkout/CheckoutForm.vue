<template>
  <ClientOnly>
    <Stepper
      v-slot="{ isNextDisabled, isPrevDisabled, nextStep, prevStep }"
      v-model="stepIndex"
      class="block w-full"
    >
      <form @submit.prevent="submitForm">
        <div class="flex w-full flex-start gap-2">
          <StepperItem
            v-for="step in steps"
            :key="step.step"
            v-slot="{ state }"
            :step="step.step"
            class="relative flex w-full flex-col item-center justify-center"
          >
            <StepperSeparator
              v-if="step.step !== steps[steps.length - 1].step"
              class="absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
            />
            <StepperTrigger as-child>
              <Button
                :class="[
                  state === 'active' &&
                    'ring-2 ring-ring ring-offset-2 ring-offset-background',
                ]"
                :disabled="state !== 'completed'"
                :variant="
                  state === 'completed' || state === 'active'
                    ? 'default'
                    : 'outline'
                "
                class="z-10 rounded-full shrink-0"
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
                class="sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm"
              >
                {{ step.description }}
              </StepperDescription>
            </div>
          </StepperItem>
        </div>
        <ContactPersonForm :nameError="$v.name.$error" :stepIndex="stepIndex" />
        <div class="flex items-center justify-between mt-4">
          <Button
            :disabled="isPrevDisabled"
            size="sm"
            variant="outline"
            @click="prevStep()"
          >
            Back
          </Button>
          <div class="flex items-center gap-3">
            <Button size="sm" type="submit"> Submit </Button>
          </div>
        </div>
      </form>
    </Stepper>
  </ClientOnly>
</template>

<script setup>
import useVuelidate from "@vuelidate/core";
import {
  required,
  email,
  minLength,
  maxLength,
  helpers,
} from "@vuelidate/validators";
import { Check, Circle, Dot } from "lucide-vue-next";
const stepIndex = ref(1);
const formData = reactive({
  name: "",
  phoneNumber: "",
  email: "",
  address: "",
  cityProvince: "",
  wards: "",
});

const rules = {
  name: {
    required: helpers.withMessage("Name is required", required),
    minLength: helpers.withMessage(
      "Name must be at least 10 characters",
      minLength(10),
    ),
    maxLength: helpers.withMessage(
      "Name must be at most 20 characters",
      maxLength(10),
    ),
  },
  phoneNumber: {
    required: helpers.withMessage("Phone number is required", required),
    minLength: helpers.withMessage(
      "Phone number must be at least 9 characters",
      minLength(9),
    ),
    maxLength: helpers.withMessage(
      "Phone number must be at most 10 characters",
      maxLength(11),
    ),
  },
  email: {
    required: helpers.withMessage("Email is required", required),
    email: helpers.withMessage("Email is invalid", email),
  },
  address: {
    required: helpers.withMessage("Address is required", required),
  },
  cityProvince: {
    required: helpers.withMessage("City/Province is required", required),
  },
  wards: {
    required: helpers.withMessage("Wards is required", required),
  },
};

const $v = useVuelidate(rules, formData);

const submitForm = async () => {
  const result = await $v.value.$validate();
  if (!result) return;
  console.log(result, $v.value.$errors);
};

const steps = [
  {
    step: 1,
    title: "PERSONAL INFO",
    description: "Step 1",
  },
  {
    step: 2,
    title: "PAYMENTS",
    description: "Step 2",
  },
  {
    step: 3,
    title: "CONFIRMATION",
    description: "Step 3",
  },
];
</script>

<style scoped></style>
