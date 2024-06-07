<template>
  <div class="w-100">
    <div class="text-center mb-11">
      <Loading v-if="!msg" />
      <h1 v-else class="text-dark fw-bolder mb-3">{{ msg }}</h1>
    </div>
    <BaseAlert />
  </div>
</template>

<script lang="ts" setup>
import BaseAlert from "@/components/BaseAlert.vue";
import { useRoute, useRouter } from "vue-router";
import ApiService from "@/core/services/ApiService";
import { onMounted, ref } from "vue";
import Loading from "@/components/datatable/table-partials/Loading.vue";

const router = useRouter();
const route = useRoute();

const msg = ref(null);

const activate = async () => {
  ApiService.post("/accounts/activate", {
    ...route.query,
  })
    .then(async (res) => {
      msg.value = res.data.message;
      await new Promise((resolve) => setTimeout(resolve, 5000));
      router.push("/accounts/login");
    })
    .catch((error: any) => {
      console.log(error);
      msg.value = error.response?.data?.message || "Něco se pokazilo.";
    });
};

onMounted(() => {
  const query = route.query;
  if (query.user_id && query.email && query.process && query.type) {
    activate();
  } else {
    router.push("/accounts/login");
  }
});
</script>
