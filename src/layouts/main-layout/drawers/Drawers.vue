<template>
  <KTMessengerDrawer />
  <KTActivityDrawer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import KTMessengerDrawer from "@/layouts/main-layout/extras/MessengerDrawer.vue";
import KTActivityDrawer from "@/layouts/main-layout/drawers/ActivityDrawer.vue";

export default defineComponent({
  name: "global-drawers",
  components: {
    KTMessengerDrawer,
    KTActivityDrawer,
  },
});
</script>
