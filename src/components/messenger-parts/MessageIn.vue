<template>
  <div class="d-flex justify-content-start mb-10">
    <div class="d-flex flex-column align-items-start">
      <div class="d-flex align-items-center mb-2">
        <div class="symbol symbol-35px symbol-circle">
          <div class="symbol symbol-circle symbol-25px">
            <div class="symbol-label fs-3 fw-semobold" :style="style">
              {{ shortname }}
            </div>
          </div>
        </div>

        <div class="ms-3">
          <a href="#" class="fs-5 fw-bold text-gray-900 text-hover-primary me-1">{{ name }}</a>
          <span class="text-muted fs-7 mb-1">{{ time }}</span>
        </div>
      </div>

      <div
        class="p-5 rounded bg-light-info text-dark fw-semobold mw-lg-400px text-start"
        data-kt-element="message-text"
        v-html="text"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  name: string;
  shortname: string;
  time: string;
  text: string;
  style: string;
}>();
</script>
