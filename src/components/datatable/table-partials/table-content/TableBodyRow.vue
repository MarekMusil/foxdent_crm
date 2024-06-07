<template>
  <tbody class="fw-semibold text-gray-600">
    <template v-for="(row, i) in data.records" :key="i">
      <tr>
        <td v-if="checkboxEnabled">
          <div class="form-check form-check-sm form-check-custom form-check-solid">
            <input
              class="form-check-input"
              type="checkbox"
              :value="row[checkboxLabel]"
              v-model="selectedItems"
            />
          </div>
        </td>
        <td
          v-for="(col, j) in data.columns"
          :key="j"
          :class="{ 'text-end': j === data.columns.length - 1 }"
          :style="getBorderColor(row, j)"
        >
          <template v-if="col.key === 'options'" v-for="item in col.items" :key="item.key">
            <router-link v-if="item.isLink === 1" :to="getLink(row, item)">
              <i class="fs-5 mx-2" :class="item.icon" />
            </router-link>
            <a v-else-if="item.isLink === 2" :href="getLink(row, item)" target="_blank">
              <i class="fs-5 mx-2" :class="item.icon" />
            </a>
            <a v-else-if="item.isLink === 3" role="button" @click="deleteRecord(row, item)">
              <i class="fs-5 mx-2" :class="item.icon" />
            </a>

            <a v-else-if="item.modal_id" role="button" @click="emit('on-modal-select', row, item)">
              <i class="fs-5 mx-2" :class="item.icon" />
            </a>
          </template>
          <template v-else-if="col.isLink === 1">
            <router-link :to="getLink(row, col)">
            <img v-if="col.isImg === 1" height="100" :src="objectPath.get(row, col.dataAttr)" alt="">
            <div v-else="col.isImg !== 1">
              {{objectPath.get(row, col.dataAttr)}}
            </div></router-link>
          </template>
          <template v-else>
            {{ objectPath.get(row, col.dataAttr) }}
          </template>
        </td>
      </tr>
    </template>
  </tbody>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import objectPath from "object-path";
import ApiService from "@/core/services/ApiService";
import { useAlertStore } from "@/stores/alert";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const alertStore = useAlertStore();

const props = defineProps({
  data: { type: Object, required: true },
  currentlySelectedItems: { type: Array, required: false, default: () => [] },
  checkboxEnabled: { type: Boolean, required: false, default: false },
  checkboxLabel: {
    type: String as () => string,
    required: false,
    default: "id",
  },
});

const emit = defineEmits(["on-select", "on-modal-select", "refresh"]);

const selectedItems = computed({
  get: () => props.currentlySelectedItems,
  set: (value) => {
    emit("on-select", value);
  },
});

const getBorderColor = (record: any, index: number) => {
  return {
    borderLeft:
      index === 0 && record?.state?.cssClass
        ? `5px var(--bs-border-style) var(--bs-${record?.state?.cssClass}) !important`
        : "",
  };
};

const getLink = (row: any, item: any) => {
  if (item.isLink === 1) {
    return item.url.replace("{:id}", row.id);
  } else if (item.isLink === 2) {
    return `/#/services/link?u=${item.url.replace("{:id}", row.id)}`;
  } else {
    return "#";
  }
};

const deleteRecord = async (row: any, item: any) => {
  const url = item.url.replace("{:id}", row.id);
  try {
    await ApiService.delete(url);
    emit("refresh");
  } catch (error) {
    alertStore.setAlert(t("record_delete_error"), "danger");
  }
};
</script>
