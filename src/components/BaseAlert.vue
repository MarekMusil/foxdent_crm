<template>
  <div v-show="store.alert.message" class="alert" :class="`alert-${store.alert.type}`">
    {{ store.alert.message }}
  </div>
</template>

<script lang="ts" setup>
import { useAlertStore } from "@/stores/alert";

const store = useAlertStore();
</script>
