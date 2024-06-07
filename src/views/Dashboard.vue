<template>
  <BaseAlert />
  <div class="row g-3 g-xl-10">
    <div class="col-xl-12 mb-5">
    </div>
  </div>

</template>

<script lang="ts" setup>
import BaseAlert from "@/components/BaseAlert.vue";
import { onMounted, ref, watchEffect } from "vue";
import { useToast } from "primevue/usetoast";
import ApiService from "@/core/services/ApiService";
import { useI18n } from "vue-i18n";
import { useOptionsStore } from "@/stores/options";

const branchId = ref<string>("");

const { t } = useI18n();
const toast = useToast();
const optionStore = useOptionsStore();

const chartData = ref<Record<string, any> | null>(null);


onMounted(async () => {
});

watchEffect(() => {
});
</script>
