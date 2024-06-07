<template>
  <Datatable url="/slides" :params="params">
    <template #params>
    </template>
  </Datatable>
</template>

<script lang="ts" setup>
import Datatable from "@/components/datatable/DataTable.vue";
import { useOptionsStore } from "@/stores/options";
import { reactive } from "vue";

const store = useOptionsStore();
console.log(store);

const params = reactive({
});
</script>