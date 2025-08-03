<template >
  <div class="flex flex-col mt-10">
    <div class="mb-10">
      <h3 class="text-[32px] uppercase font-semibold mb-10">Contact Person</h3>

      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-1">
            <FormError :errors="props.validValue.name.$errors">
              <FormInput :id="'name'" v-model="props.formData.name" :forLabel="'name'" :label="'Name'" :placeholder="'Eg: Chinh'" :type="'text'" />
          </FormError>
        </div>
        <div class="flex flex-col gap-2">
          <FormError :errors="props.validValue.phoneNumber.$errors">
              <FormInput :id="'phoneNumber'" v-model="props.formData.phoneNumber" :forLabel="'phoneNumber'" :label="'Phone Number'" :placeholder="'Eg: 0354534453'" :type="'number'" />
          </FormError>
        </div>
        <div class="flex flex-col gap-2">
          <FormError :errors="props.validValue.email.$errors">
              <FormInput :id="'email'" v-model="props.formData.email" :forLabel="'email'" :label="'Email'" :placeholder="'Eg: example@gmail.com'" :type="'text'" />
          </FormError>
        </div>
      </div>
    </div>
    <div>
      <h3 class="text-[32px] uppercase font-semibold mb-10">Address Details</h3>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-1">
           <FormError :errors="props.validValue.address.$errors">
          <Label class="text-xl uppercase font-medium mb-1 inline-block" for="address">Address</Label>
          <Textarea
            id="address"
            v-model="props.formData.address"
            class="p-3 text-xl font-regular h-[94px] rounded-none border-[#3E3E3E] placeholder:text-[#B4B4B4]"
            name="address"
            placeholder="Eg: 15A Cau Giay, Ha Noi"
          />
           </FormError>
        </div>
        <div class="flex flex-col gap-2">
<!--          <FormError :errors="props.validValue.cityProvince.$errors">
          </FormError>-->
          <Label class="text-xl uppercase font-medium mb-1 inline-block" for="city/province">City/Province</Label>
          <SelectCustom
            id="cityProvince"
            v-model="props.formData.cityProvince"
            classTrigger="p-3 text-xl font-regular h-16 rounded-none border-[#3E3E3E] text-[#B4B4B4] placeholder:text-[#B4B4B4]"
            name="cityProvince"
            placeholder="Eg: New York"
          />
        </div>
        <div class="flex flex-col gap-2">
<!--          <FormError :errors="props.validValue.wards.$errors">
          </FormError>-->
          <Label class="text-xl uppercase font-medium mb-1 inline-block" for="province">Wards</Label>
          <SelectCustom id="wards" v-model="props.formData.wards" classTrigger="p-3 text-xl font-regular h-16 rounded-none border-[#3E3E3E] text-[#B4B4B4] placeholder:text-[#B4B4B4]" name="wards"
          placeholder="Eg: District 1"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SelectCustom from "~/components/ui/shared/SelectCustom/SelectCustom.vue";

const props = defineProps<{
  nameError?: any
  validValue?: any
  formData: any
}>()

</script>
