<script setup lang="ts">
import { ref, watch } from "vue";

const regex = /^\d{2}$/;

const props = defineProps({
  modelValue: {
    type: String,
  },
});

const emit = defineEmits(["update:modelValue"]);

const input = ref(props.modelValue);

watch(
  () => props.modelValue,
  (value, oldVal) => {
    if (value && regex.test(value) && value.length > (oldVal?.length ?? 0)) {
      emit("update:modelValue", value + ":");
    } else {
      input.value = value;
    }
  }
);

const handleInput = (event: Event) => {
  const value = (event.target as HTMLInputElement)?.value;
  emit("update:modelValue", value);
};
</script>

<template>
  <input type="text" max="5" :value="input" @input="handleInput" class="form-control" />
</template>
