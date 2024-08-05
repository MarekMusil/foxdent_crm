<template>
  <Datatable url="/employees" :params="params">
    <template #params>
      <select class="form-select c-w-25" v-model="params.employeeType">
        <option value="">{{ $t("choose_service") }}</option>
        <option v-for="employeeType in store.options.employeeTypes" :key="employeeType.id" :value="employeeType.id">
          {{ employeeType.name }}
        </option>
      </select>

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
  employeeType: "",
  active: 1,
});
</script>