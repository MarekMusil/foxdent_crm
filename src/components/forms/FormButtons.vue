<script setup lang="ts">
import ApiService from "@/core/services/ApiService";

defineProps({
  buttons: { type: Array as () => Array<any> },
});

const getLink = (item: any) => {
  if (item.isLink === 2) {
    return `/#/services/link?u=${item.url}`;
  }
  return "#";
};
</script>

<template>
  <div class="d-block">
    <div class="d-flex justify-content-end gap-3">
      <template v-for="button in buttons">
        <router-link v-if="button.isLink === 1" :to="button.url" class="btn" :class="button.class">
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
              <a class="menu-link px-3" :href="getLink(item)" target="_blank">
                {{ item.title }}
              </a>
            </div>
          </div>
        </template>
        <a v-else class="btn" :class="button.class" :href="getLink(button)" target="_blank">
          <i class="fs-2" :class="button.icon"></i>
          {{ button.title }}
        </a>
      </template>
    </div>
  </div>
</template>
