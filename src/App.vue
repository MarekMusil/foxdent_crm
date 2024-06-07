<template>
  <RouterView />
</template>

<script lang="ts" setup>
import { nextTick, onBeforeMount, onMounted } from "vue";
import { RouterView } from "vue-router";
import { useConfigStore } from "@/stores/config";
import { useThemeStore } from "@/stores/theme";
import { useBodyStore } from "@/stores/body";
import { themeConfigValue } from "@/core/helpers/config";
import { initializeComponents } from "@/core/plugins/keenthemes";

const configStore = useConfigStore();
const themeStore = useThemeStore();
const bodyStore = useBodyStore();

onBeforeMount(() => {
  /**
   * Overrides the layout config using saved data from localStorage
   * remove this to use static config (@/core/config/DefaultLayoutConfig.ts)
   */
  configStore.overrideLayoutConfig();

  /**
   *  Sets a mode from configuration
   */
  themeStore.setThemeMode(themeConfigValue.value);
});

onMounted(() => {
  nextTick(() => {
    initializeComponents();

    bodyStore.removeBodyClassName("page-loading");
  });
});
</script>

<style lang="scss">
@import "bootstrap-icons/font/bootstrap-icons.css";
@import "apexcharts/dist/apexcharts.css";
@import "quill/dist/quill.snow.css";
@import "sweetalert2/dist/sweetalert2.css";
@import "@fortawesome/fontawesome-free/css/all.min.css";
@import "socicon/css/socicon.css";
@import "line-awesome/dist/line-awesome/css/line-awesome.css";
@import "dropzone/dist/dropzone.css";

// Main demo style scss
@import "assets/keenicons/duotone/style.css";
@import "assets/keenicons/outline/style.css";
@import "assets/keenicons/solid/style.css";
@import "assets/sass/element-ui.dark";
@import "assets/sass/plugins";
@import "assets/sass/style";

#app {
  display: contents;
}
</style>
