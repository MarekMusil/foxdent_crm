<template>
  <VForm
    class="form w-100"
    @submit="onSubmitForgotPassword"
    :validation-schema="forgotPassword"
  >
    <!--begin::Heading-->
    <div class="text-center mb-11">
      <!--begin::Title-->
      <h1 class="text-dark mb-3">{{ $t("do_you_forgot_password") }}</h1>
      <!--end::Title-->

      <!--begin::Link-->
      <div class="text-gray-400 fw-semobold fs-4">{{ $t("enter_email_and_restore_password") }}</div>
      <!--end::Link-->
    </div>
    <!--begin::Heading-->

    <BaseAlert />
    <!--begin::Input group-->
    <div class="fv-row mb-10">
      <label class="form-label fw-bold text-gray-900 fs-6">{{ $t("email") }}</label>
      <Field
        class="form-control form-control-lg form-control-solid"
        type="email"
        name="userEmail"
        autocomplete="off"
      />
      <div class="fv-plugins-message-container">
        <div class="fv-help-block">
          <ErrorMessage name="userEmail" />
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

const store = useAuthStore();

//Create form validation object
const forgotPassword = Yup.object().shape({
  userEmail: Yup.string().email().required(),
});

//Form submit function
const onSubmitForgotPassword = async (values: any) => {
  values = values as string;

  // Send login request
  await store.forgotPassword(values.userEmail);
};
</script>
