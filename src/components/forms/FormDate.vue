<script setup lang="ts">
import { computed } from "vue";
import PrimeCalendar from "primevue/calendar";

const props = defineProps({
  dateFormat: {
    type: String,
    default: "d.m.yy",
  },
  modelValue: {
    type: [String, Date],
  },
});

const emit = defineEmits(["update:modelValue"]);

function getLocalDate(date: Date): Date {
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
}

const date = computed({
  get: () => props.modelValue,
  set: (value) => {
    if (value instanceof Date) {
      value = getLocalDate(value);
    }
    emit("update:modelValue", value);
  },
});
</script>

<template>
  <PrimeCalendar :dateFormat="dateFormat" v-model="date" @input="$event.stopPropagation()" />
</template>
