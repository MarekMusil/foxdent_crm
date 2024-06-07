<template>
  <Datatable url="/employees" :params="params">
    <template #params>
      <select class="form-select c-w-25" v-model="params.employeeType">
        <option value="">{{ $t("choose_text_type") }}</option>
        <option v-for="employeeType in store.options.employeeTypes" :key="employeeType.id" :value="employeeType.id">
          {{ employeeType.name }}
        </option>
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
});
</script>