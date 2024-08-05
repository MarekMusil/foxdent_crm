<template>
  <Datatable url="/slides" :params="params">
    <template #params>
      <select class="form-select c-w-25" v-model="params.active">
        <option value=1>{{ $t("active") }}</option>
        <option value=0>{{ $t("inactive") }}</option>
        <option value=''>{{ $t("all") }}</option>
      </select>
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
  active: 1,
});
</script>