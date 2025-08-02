<template :stepIndex="stepIndex">
  <div class="flex flex-col">
    <div class="mb-10">
      <h3>Contact Person</h3>

      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-1">
          <FormError :error="nameError">
            <label for="name">Name</label>
            <Input id="name" name="name" placeholder="Eg: Chinh" type="text" />
          </FormError>
        </div>
        <div class="flex flex-col gap-2">
          <label for="phoneNumber">Phone Number</label>
          <div class="flex gap-2">
            <Input
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Eg: 0354534453"
              type="number"
            />
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <label for="email">Email</label>
          <Input
            id="email"
            name="email"
            placeholder="Eg: example@gmail.com"
            type="email"
          />
        </div>
      </div>
    </div>
    <div>
      <h3>Address Details</h3>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-1">
          <label for="address">Address</label>
          <Textarea
            id="address"
            name="address"
            placeholder="Eg: 15A Cau Giay, Ha Noi"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label for="city/province">City/Province</label>
          <SelectCustom
            id="cityProvince"
            name="cityProvince"
            placeholder="Eg: New York"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label for="province">Wards</label>
          <SelectCustom id="wards" name="wards" placeholder="Eg: District 1" />
        </div>
      </div>
    </div>
    <div class="flex justify-end">
      <Button
        class="w-full !p-5 text-white text-center text-lg font-lato uppercase font-normal"
        label="Submit"
        size="lg"
        variant="primary"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  stepIndex: number
  nameError?: boolean
}>()
</script>
