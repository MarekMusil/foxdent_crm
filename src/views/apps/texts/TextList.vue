<template>
  <Datatable url="/texts" :params="params">
    <template #params>
      <select class="form-select c-w-25" v-model="params.textType">
        <option value="">{{ $t("choose_text_type") }}</option>
        <option v-for="textType in store.options.textTypes" :key="textType.id" :value="textType.id">
          {{ textType.name }}
        </option>
      </select>
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
  textType: "",
  localization: "cs_CZ",
});
</script>