<script setup lang="ts">
defineProps({
  editorStyle: {
    type: String,
    default: "height: auto",
  },
});

const modelValue = defineModel<string>();
</script>

<template>
  <PrimeEditor v-model="modelValue" :editorStyle="editorStyle">
    <template #toolbar>
      <span class="ql-formats">
        <button v-tooltip.bottom="'Bold'" class="ql-bold"></button>
        <button v-tooltip.bottom="'Italic'" class="ql-italic"></button>
        <button v-tooltip.bottom="'Underline'" class="ql-underline"></button>
        <select v-tooltip.bottom="'Color'" class="ql-color ql-picker ql-color-picker"></select>
        <select v-tooltip.bottom="'Background'" class="ql-background ql-picker ql-color-picker"></select>
        <button v-tooltip.bottom="'List'" class="ql-list" value="ordered"></button>
        <button v-tooltip.bottom="'List'" class="ql-list" value="bullet"></button>
        <button v-tooltip.bottom="'Link'" class="ql-link"></button>
        <button v-tooltip.bottom="'Image'" class="ql-image"></button>
        <button v-tooltip.bottom="'Code Block'" class="ql-code-block"></button>
        <button v-tooltip.bottom="'Clean'" class="ql-clean"></button>
      </span>
    </template>
  </PrimeEditor>
</template>
