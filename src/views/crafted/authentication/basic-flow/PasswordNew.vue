<template>
  <VForm class="form w-100" @submit="onSubmitNewPassword" :validation-schema="newPasswords">
    <!--begin::Heading-->
    <div class="text-center mb-11">
      <!--begin::Title-->
      <h1 class="text-dark mb-3">{{ $t("passwordReset") }}</h1>
      <!--end::Title-->

      <!--begin::Link-->
      <div class="text-gray-400 fw-semobold fs-4">{{ $t("you_can_change_password") }}</div>
      <!--end::Link-->
    </div>
    <!--begin::Heading-->

    <BaseAlert />
    <!--begin::Input group-->
    <div class="fv-row mb-10">
      <label class="form-label fw-bold text-gray-900 fs-6">{{ $t("password") }}</label>
      <Field
        class="form-control form-control-lg form-control-solid"
        type="password"
        name="userPassword"
        autocomplete="off"
      />
      <div class="fv-plugins-message-container">
        <div class="fv-help-block">
          <ErrorMessage name="userPassword" />
        </div>
      </div>
    </div>
    <!--end::Input group-->

    <!--begin::Input group-->
    <div class="fv-row mb-10">
      <label class="form-label fw-bold text-gray-900 fs-6">{{ $t("repassword") }}</label>
      <Field
        class="form-control form-control-lg form-control-solid"
        type="password"
        name="userRepassword"
        autocomplete="off"
      />
      <div class="fv-plugins-message-container">
        <div class="fv-help-block">
          <ErrorMessage name="userRepassword" />
        </div>
      </div>
    </div>
    <!--end::Input group-->

    <!--begin::Actions-->
    <div class="d-flex flex-wrap justify-content-center pb-lg-0">
      <button
        type="submit"
        id="kt_password_reset_submit"
        class="btn btn-lg btn-primary fw-bold me-4"
      >
        <span class="indicator-label">{{ $t("btn_confirm") }}</span>
      </button>

      <router-link to="/accounts/login" class="btn btn-lg btn-light-primary fw-bold">{{
        $t("btn_cancle")
      }}</router-link>
    </div>
    <!--end::Actions-->
  </VForm>
</template>

<script lang="ts" setup>
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { useAuthStore } from "@/stores/auth";
import * as Yup from "yup";
import BaseAlert from "@/components/BaseAlert.vue";
import { useRoute } from "vue-router";

const store = useAuthStore();
const route = useRoute();

//Create form validation object
const newPasswords = Yup.object().shape({
  userPassword: Yup.string().required(),
  userRepassword: Yup.string().required(),
});

//Form submit function
const onSubmitNewPassword = async (values: any) => {
  values = values as string;

  // Send login request
  await store.requestNewPassword({
    userId: route.query.userId as string,
    process: route.query.process as string,
    ...values,
  });
};
</script>
