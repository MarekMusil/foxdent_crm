<script setup lang="ts">
import PrimeGalleria from "primevue/galleria";
import type { PropType } from "vue";

const activeIndex = defineModel<number>("index");
const displayCustom = defineModel<boolean>("display");

defineProps({
  photos: {
    type: Array as PropType<any[]>,
    required: true,
  },
  label: {
    type: String,
    default: "url",
  },
});
</script>

<template>
  <div class="card flex justify-content-center">
    <PrimeGalleria
      v-model:activeIndex="activeIndex"
      v-model:visible="displayCustom"
      :value="photos"
      :numVisible="7"
      containerStyle="max-width: 850px"
      :circular="true"
      :fullScreen="true"
      :showItemNavigators="true"
      :showThumbnails="false"
    >
      <template #item="slotProps">
        <img :src="slotProps.item[label]" style="width: 100%; display: block" />
      </template>
      <template #thumbnail="slotProps">
        <img :src="slotProps.item[label]" style="display: block" />
      </template>
    </PrimeGalleria>
    <slot name="grid" />
  </div>
</template>

<style>
.gallery-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
  gap: 1rem;
}

.gallery-wrapper-image {
  display: block;
  width: min(220px, 40%);
  aspect-ratio: 1;
}

.gallery-wrapper-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
}
</style>
