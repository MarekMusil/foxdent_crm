<template>
  <div class="row">
    <div
      class="col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start"
    >
      <label for="items-per-page">
        <select
          class="form-select form-select-sm form-select-solid"
          v-model="itemsCountInTable"
          name="items-per-page"
          id="items-per-page"
        >
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="25">25</option>
          <option :value="50">50</option>
        </select>
      </label>
    </div>

    <div
      class="col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end"
    >
      <div class="dataTables_paginate paging_simple_numbers">
        <ul class="pagination">
          <li
            class="paginate_button page-item"
            :class="{ disabled: isInFirstPage }"
            :style="{ cursor: !isInFirstPage ? 'pointer' : 'auto' }"
          >
            <a class="page-link" @click="onClickFirstPage">
              <KTIcon icon-name="double-left" icon-class="fs-2" />
            </a>
          </li>

          <li
            class="paginate_button page-item"
            :class="{ disabled: isInFirstPage }"
            :style="{ cursor: !isInFirstPage ? 'pointer' : 'auto' }"
          >
            <a class="page-link" @click="onClickPreviousPage">
              <KTIcon icon-name="left" icon-class="fs-2" />
            </a>
          </li>

          <li
            v-for="(page, i) in pages"
            class="paginate_button page-item"
            :class="{
              active: isPageActive(page.name),
            }"
            :style="{ cursor: !page.isDisabled ? 'pointer' : 'auto' }"
            :key="i"
          >
            <a class="page-link" @click="onClickPage(page.name)">
              {{ page.name }}
            </a>
          </li>

          <li
            class="paginate_button page-item"
            :class="{ disabled: isInLastPage }"
            :style="{ cursor: !isInLastPage ? 'pointer' : 'auto' }"
          >
            <a class="paginate_button page-link" @click="onClickNextPage">
              <KTIcon icon-name="right" icon-class="fs-2" />
            </a>
          </li>

          <li
            class="paginate_button page-item"
            :class="{ disabled: isInLastPage }"
            :style="{ cursor: !isInLastPage ? 'pointer' : 'auto' }"
          >
            <a class="paginate_button page-link" @click="onClickLastPage">
              <KTIcon icon-name="double-right" icon-class="fs-2" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, type WritableComputedRef } from "vue";

const props = defineProps({
  pagination: {
    type: Object,
    required: true,
  },
  maxVisibleButtons: {
    type: Number,
    required: false,
    default: 5,
  },
  pageNumber: {
    type: Number,
    required: true,
  },
  pageLimit: {
    type: Number,
    required: true,
  },
});
const emit = defineEmits(["update:pageNumber", "update:pageLimit"]);

const itemsCountInTable: WritableComputedRef<number> = computed({
  get(): number {
    return props.pageLimit;
  },
  set(value: number): void {
    emit("update:pageLimit", value);
  },
});

// Helper function for pagination

const startPage = computed(() => {
  if (
    props.pagination.countPages < props.maxVisibleButtons ||
    props.pageNumber === 1 ||
    props.pageNumber <= Math.floor(props.maxVisibleButtons / 2) ||
    (props.pageNumber + 2 > props.pagination.countPages &&
      props.pageNumber === props.maxVisibleButtons)
  ) {
    return 1;
  }

  if (props.pageNumber + 2 > props.pagination.countPages) {
    return props.pagination.countPages - props.maxVisibleButtons + 1;
  }

  return props.pageNumber - 2;
});

const endPage = computed(() => {
  return Math.min(
    startPage.value + props.maxVisibleButtons - 1,
    props.pagination.countPages
  );
});

const pages = computed(() => {
  const range: Array<{
    name: number;
    isDisabled: boolean;
  }> = [];

  for (let i = startPage.value; i <= endPage.value; i += 1) {
    range.push({
      name: i,
      isDisabled: i === props.pageNumber,
    });
  }

  return range;
});

const isPageActive = (page: number) => {
  return props.pageNumber === page;
};

const isInFirstPage = computed(() => {
  return props.pageNumber === 1;
});
const isInLastPage = computed(() => {
  return props.pageNumber === props.pagination.countPages;
});

// Navigation handlers

const onClickFirstPage = () => {
  emit("update:pageNumber", 1);
};
const onClickPreviousPage = () => {
  emit("update:pageNumber", props.pageNumber - 1);
};
const onClickPage = (page: number) => {
  emit("update:pageNumber", page);
};
const onClickNextPage = () => {
  emit("update:pageNumber", props.pageNumber + 1);
};
const onClickLastPage = () => {
  emit("update:pageNumber", props.pagination.countPages);
};
</script>

<style lang="scss">
.pagination .page-item .page-link i {
  font-size: 1.5rem;
}
</style>
