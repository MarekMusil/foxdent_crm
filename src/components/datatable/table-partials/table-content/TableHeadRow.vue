<template>
  <thead>
    <tr class="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
      <th v-if="checkboxEnabled" :style="{ width: '30px' }">
        <div class="form-check form-check-sm form-check-custom form-check-solid me-3">
          <input class="form-check-input" type="checkbox" v-model="checked" />
        </div>
      </th>
      <template v-for="(column, i) in header" :key="i">
        <th
          :class="{
            'text-end': i === header.length - 1,
          }"
          :style="{
            whiteSpace: 'nowrap',
          }"
        >
          {{ column.name }}
          <template v-if="column.sorting">
            <a title="Vzestupně" class="cursor-pointer" @click="sort(column.key, 'ASC')">
              <i class="bi bi-arrow-up"></i>
            </a>
            <a title="Sestupně" class="cursor-pointer" @click="sort(column.key, 'DESC')">
              <i class="bi bi-arrow-down"></i>
            </a>
          </template>
        </th>
      </template>
    </tr>
  </thead>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";

const props = defineProps({
  checkboxEnabledValue: { type: Boolean, required: false, default: false },
  checkboxEnabled: { type: Boolean, required: false, default: false },
  header: { type: Array as () => Array<any>, required: true },
});
const emit = defineEmits(["on-select", "on-sort"]);

const checked = computed({
  get: () => props.checkboxEnabledValue,
  set: (value) => {
    emit("on-select", value);
  },
});

const sort = (label: string, order: "ASC" | "DESC") => {
  emit("on-sort", label, order);
};
</script>
