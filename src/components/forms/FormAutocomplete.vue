<script setup lang="ts">
import { computed } from "vue";
import PrimeAutocomplete from "primevue/autocomplete";

const props = defineProps({
  modelValue: {
    type: String,
  },
  optionLabel: {
    type: String,
    default: "name",
  },
});

const emit = defineEmits(["update:modelValue"]);

const search = computed({
  get: () => {
    return props.modelValue ?? "";
  },
  set: (val: string | { [key: string]: any }) => {
    if (typeof val === "object" && val[props.optionLabel]) {
      val = val[props.optionLabel];
    }
    emit("update:modelValue", val);
  },
});
</script>

<template>
  <PrimeAutocomplete v-model="search" :optionLabel="optionLabel" />
</template>
