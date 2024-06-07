<template>
  <div>{{ message }}</div>
</template>

<script setup lang="ts">
import ApiService from "@/core/services/ApiService";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const { u, ...reqQuery } = route.query; // u stands for url

const message = ref("");

onMounted(async () => {
  if (!u || typeof u === "object") return router.push("/");
  const response = await ApiService.query(u, {
    params: reqQuery,
  })
    .then((response) => {
      let url: string = response.data.data.file.url;
      if (Object.keys(reqQuery).length) {
        // @ts-ignore
        url += "?" + new URLSearchParams(reqQuery).toString();
      }
      window.location.href = url;
    })
    .catch((error) => {
      message.value = error?.response?.data?.message || "Něco se pokazilo";
    });
});
</script>
