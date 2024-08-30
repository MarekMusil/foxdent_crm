<template>
  <Datatable url="/pages" :params="params">
    <template #params>
      <select class="form-select c-w-25" v-model="params.localization">
        <option value="">{{ $t("localization") }}</option>
        <option v-for="localization in store.options.localizations" :key="localization.code" :value="localization.code">
          {{ localization.name }}
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
  localization: "cs_CZ",
});
</script>