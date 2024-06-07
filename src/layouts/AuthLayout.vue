<template>
  <!--begin::Root-->
  <div class="d-flex flex-column flex-root" id="kt_app_auth">
    <!--begin::Authentication - Sign-in -->
    <div class="d-flex flex-column flex-column-fluid flex-lg-row">
      <!--begin::Aside-->
      <div class="d-flex flex-center w-lg-50 pt-15 pt-lg-0 px-10">
        <!--begin::Aside-->
        <div class="d-flex flex-center flex-lg-start flex-column">
          <!--begin::Logo-->
          <router-link to="/" class="mb-7">
            <img alt="Logo" class="w-425px" :src="getAssetPath('media/logos/default.png')" />
          </router-link>
          <!--end::Logo-->
        </div>
        <!--begin::Aside-->
      </div>
      <!--begin::Aside-->
      <!--begin::Body-->
      <div
        class="d-flex flex-column-fluid flex-lg-row-auto justify-content-center justify-content-lg-end p-12 p-lg-20"
      >
        <!--begin::Card-->
        <div
          class="bg-body d-flex flex-column align-items-stretch flex-center rounded-4 w-md-600px p-5 p-lg-20"
        >
          <!--begin::Form-->
          <div class="d-flex flex-center flex-column flex-lg-row-fluid">
            <!--begin::Wrapper-->
            <div class="w-lg-500px p-10 overflow-hidden">
              <router-view v-slot="{ Component }">
                <transition name="slide-in" mode="out-in">
                  <component :is="Component" />
                </transition>
              </router-view>
            </div>
            <!--end::Wrapper-->
          </div>
          <!--end::Form-->
          <!--begin::Footer-->
          <div class="d-flex flex-stack px-lg-10 justify-content-end">
            <!--begin::Links-->
            <div class="d-flex fw-semibold text-primary fs-base gap-5">
              <a href="https://davmo.cz/podpora" target="_blank">Podpora</a>
            </div>
            <!--end::Links-->
          </div>
          <!--end::Footer-->
        </div>
        <!--end::Card-->
      </div>
      <!--end::Body-->
    </div>
    <!--end::Authentication - Sign-in-->
  </div>
  <!--end::Root-->
</template>

<script lang="ts" setup>
import { getAssetPath } from "@/core/helpers/assets";
import { onMounted } from "vue";
import LayoutService from "@/core/services/LayoutService";
import { useBodyStore } from "@/stores/body";

const store = useBodyStore();

onMounted(() => {
  LayoutService.emptyElementClassesAndAttributes(document.body);

  store.addBodyClassname("app-blank");
  store.addBodyClassname("bg-body");
});
</script>

<style>
#kt_app_auth {
  background-image: url("/media/auth/bg4.jpg");
}
[data-bs-theme="dark"] body {
  background-image: url("/media/auth/bg4-dark.jpg");
}
</style>
