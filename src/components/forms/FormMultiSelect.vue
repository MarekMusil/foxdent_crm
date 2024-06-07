<script setup lang="ts">
import PrimaMultiSelect from "primevue/multiselect";

defineProps({
  options: {
    type: Array,
    required: true,
  },
  display: {
    type: String as () => "comma" | "chip",
    default: "chip",
  },
  optionLabel: {
    type: String,
    default: "name",
  },
  optionValue: {
    type: String,
    default: "id",
  },
});

const modelValue = defineModel<number[]>();
</script>

<template>
  <PrimaMultiSelect
    v-model="modelValue"
    :display="display"
    :options="options"
    :optionLabel="optionLabel"
    :optionValue="optionValue"
  >
    <!-- PrimeVue MultiSelect  does not support custom selectAll label -->
    <!-- It also doesn't have any slot for it -->
    <!-- !!! This is just TEMPORARY SOLUTION !!! -->
    <!-- <template #headercheckboxicon>
      <div class="flex align-items-center ml-18">{{ $t("option_all") }}</div>
    </template> -->
  </PrimaMultiSelect>
</template>
