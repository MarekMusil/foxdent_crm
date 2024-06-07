<template>
  <div class="card">
    <!--begin::Card header-->
    <div class="card-header border-0 pt-6 d-flex">
      <!--begin::Card title-->
      <div class="card-title align-items-start my-1 gap-2 flex-wrap" style="width: max-content">
        <div class="d-grid c-w-25">
          <div class="d-flex align-items-center position-relative">
            <KTIcon icon-name="magnifier" icon-class="fs-1 position-absolute ms-6" />
            <input
              v-model="settings.q"
              type="text"
              class="form-control form-control-solid ps-14"
              :placeholder="$t('enter_text')"
            />
          </div>
          <span class="form-text text-muted">{{ $t("help_from_three_chars") }}</span>
        </div>
        <slot name="params"></slot>
      </div>
      <!--begin::Card title-->

      <!--begin::Card toolbar-->
      <div class="card-toolbar" style="width: fit-content">
        <!--begin::Toolbar-->
        <div class="d-flex justify-content-end align-self-start gap-3">
          <template v-for="button in data?.buttons">
            <router-link
              v-if="button.isLink === 1"
              :to="button.url"
              class="btn"
              :class="button.class"
            >
              <i class="fs-2" :class="button.icon"></i>
              {{ button.title }}
            </router-link>
            <template v-else-if="Array.isArray(button.items)">
              <button
                type="button"
                class="btn"
                :class="button.class"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {{ button.title }}
                <i class="bi bi-chevron-down fs-2"></i>
              </button>
              <div
                class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semobold fs-7 w-125px py-4 dropdown-menu"
              >
                <div v-for="item in button.items" class="menu-item px-3">
                  <a class="menu-link px-3" :href="getActionLink(button, item)" target="_blank">
                    {{ item.title }}
                  </a>
                </div>
              </div>
            </template>
            <button v-else type="button" class="btn" :class="button.class" @click="btnAction">
              <i class="fs-2" :class="button.icon"></i>
              {{ button.title }}
            </button>
          </template>
        </div>
        <!--end::Toolbar-->
      </div>
      <!--end::Card toolbar-->
    </div>
    <!--end::Card header-->

    <div class="card-body pt-0">
      <div class="dataTables_wrapper dt-bootstrap4 no-footer">
        <!-- begin::Table Body -->
        <div class="table-responsive">
          <BaseAlert />
          <table
            :class="[loading && 'overlay overlay-block']"
            class="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer"
          >
            <TableHeadRow
              @onSort="onSort"
              @onSelect="onSelectAll"
              :checkboxEnabledValue="allItemsSelected"
              :checkboxEnabled="checkboxEnabled"
              :header="data?.columns"
            />
            <TableBodyRow
              v-if="data"
              @onSelect="onItemSelect"
              @onModalSelect="setOptionComponent"
              @refresh="fetchData"
              :currentlySelectedItems="selectedItems"
              :data="data"
              :checkbox-enabled="checkboxEnabled"
              :checkbox-label="checkboxLabel"
            />
            <tr v-else class="odd">
              <td class="dataTables_empty">
                {{ emptyTableText }}
              </td>
            </tr>
            <Loading v-if="loading" />
          </table>
        </div>
        <!-- end::Table Body -->
        <!-- begin::Table Footer -->
        <TableFooter
          v-if="data"
          :pagination="data?.pagination"
          v-model:pageNumber="settings.pageNumber"
          v-model:pageLimit="settings.pageLimit"
        />
        <!-- end::Table Footer -->
      </div>
    </div>
  </div>

  <component :is="optionComponent" :data="optionComponentData" @hideModal="hideOptionComponent" />
</template>

<script lang="ts" setup>
import { computed, ref, watch, reactive, onMounted, shallowRef } from "vue";
import TableHeadRow from "@/components/datatable/table-partials/table-content/TableHeadRow.vue";
import TableBodyRow from "@/components/datatable/table-partials/table-content/TableBodyRow.vue";
import TableFooter from "@/components/datatable/table-partials/TableFooter.vue";
import Loading from "@/components/datatable/table-partials/Loading.vue";
import ApiService from "@/core/services/ApiService";
import BaseAlert from "@/components/BaseAlert.vue";
import { useAlertStore } from "@/stores/alert";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";

const router = useRouter();
const alertStore = useAlertStore();
const toast = useToast();

const props = defineProps({
  url: { type: String, required: true },
  params: { type: Object, required: false, default: () => ({}) },
  checkboxEnabled: { type: Boolean, required: false, default: false },
  checkboxLabel: { type: String, required: false, default: "id" },
  emptyTableText: { type: String, required: false, default: "No data found" },
});

// option component
const optionComponent = ref();
const optionComponentData = ref();

const data = shallowRef<{ buttons: any; columns: any; pagination: any; records: any }>();

const loading = ref(true);
const selectedItems = ref<Array<unknown>>([]);

const settings = reactive({
  pageLimit: (JSON.parse(localStorage.getItem("pageLimits") ?? "{}")[props.url] || 10) as number,
  pageNumber: 1,
  q: "",
  sortBy: "",
  sortOrder: "",
});

const allItemsSelected = computed(() => {
  return (
    selectedItems.value.length !== 0 &&
    selectedItems.value.length === data.value?.pagination.countRecords
  );
});

const onSort = (label: string, order: "ASC" | "DESC") => {
  // if (settings.sortBy === label && settings.sortOrder === order) return;
  settings.sortBy = label;
  settings.sortOrder = order;
  fetchData();
};

const onItemSelect = (newArray: Array<unknown>) => {
  selectedItems.value = newArray;
};

const onSelectAll = () => {
  if (allItemsSelected.value) {
    selectedItems.value = [];
  } else {
    selectedItems.value = data.value?.records.map((item: any) => item[props.checkboxLabel]);
  }
};

const fetchData = async () => {
  loading.value = true;
  ApiService.query(props.url, {
    params: { ...settings, ...props.params },
  })
    .then((response) => {
      data.value = response.data.data;
      window.scrollTo({ top: 0, behavior: "smooth" });
      loading.value = false;
      alertStore.setAlert(`Bylo nalezeno ${data.value?.pagination?.countRecords} záznamů.`, "info");
    })
    .catch((error) => {
      console.log(error);
      alertStore.setAlert("Nepodařilo se načíst data", "danger");
    });
};

const setOptionComponent = (row: any, item: any) => {
  import(`@/components/modals/list/${item.modal_id}.vue`).then((module) => {
    optionComponent.value = module.default;
  });
  optionComponentData.value = { item, row };
};

const hideOptionComponent = () => {
  optionComponent.value = null;
  optionComponentData.value = null;
};

const btnAction = () => {
  console.log("btnAction");
};

const getActionLink = (btn: any, item: any) => {
  // export
  if (btn.title === "Exportovat") {
    // @ts-ignore
    return `/#/services/link?u=${item.url}?${new URLSearchParams({
      ...settings,
      ...props.params,
    }).toString()}`;
  }
  return "#";
};

// watcher for pagination and search

watch([props.params, () => settings.pageNumber], () => {
  fetchData();
});

watch(
  () => settings.pageLimit,
  (val, oldVal) => {
    // if page limit is 1, fetch data, otherwise set page number to 1 (pageNumber watcher will fetch data)
    if (settings.pageNumber === 1) {
      fetchData();
    } else {
      settings.pageNumber = 1;
    }
    // save page limit to local storage
    const pageLimits = {
      ...JSON.parse(localStorage.getItem("pageLimits") || "{}"),
      [props.url]: val,
    };
    localStorage.setItem("pageLimits", JSON.stringify(pageLimits));
  }
);

watch(
  () => settings.q,
  (val, oldVal) => {
    if (val.length >= 3 || val.length === 0) {
      if (val.length < oldVal.length || data.value?.records.length) {
        fetchData();
      }
    }
  }
);

onMounted(async () => {
  fetchData();
});
</script>
