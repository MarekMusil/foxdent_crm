<template>
  <VForm
    VForm
    class="form w-100"
    id="kt_pin_signin_form"
    @submit="onSubmitPin"
    :validation-schema="pin"
  >
    <!--begin::Heading-->
    <div class="text-center mb-11">
      <!--begin::Title-->
      <h1 class="text-dark fw-bolder mb-3">{{ $t("pinConfirmation") }}</h1>
      <!--end::Title-->
      <!--begin::Subtitle-->
      <div class="text-gray-500 fw-semibold fs-6">{{ $t("enter_pin_and_login") }}</div>
      <!--end::Subtitle=-->
    </div>
    <!--end::Heading-->
    <BaseAlert />
    <!--begin::Input group=-->
    <div class="fv-row mb-3">
      <!--begin::Password-->
      <Field
        tabindex="1"
        class="form-control form-control-lg form-control-solid"
        type="password"
        name="pin"
        placeholder="Pin"
        autocomplete="off"
      />
      <!--end::Password-->
    </div>
    <div class="fv-plugins-message-container">
      <div class="fv-help-block">
        <ErrorMessage name="pin" />
      </div>
    </div>
    <!--end::Input group=-->
    <!--begin::Submit button-->
    <div class="d-grid mb-9">
      <button tabindex="2" type="submit" id="kt_sign_in_submit" class="btn btn-primary mt-5">
        <!--begin::Indicator label-->
        <span class="indicator-label">{{ $t("btn_confirm") }}</span>
        <!--end::Indicator label-->
      </button>
    </div>
    <!--end::Submit button-->
  </VForm>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import * as Yup from "yup";
import BaseAlert from "@/components/BaseAlert.vue";

const store = useAuthStore();
const router = useRouter();

const pin = Yup.object().shape({
  pin: Yup.string().min(4).required(),
});

// Form pin submit function
const onSubmitPin = async (values: any, { resetForm }) => {
  await store.loginPin(values.pin);
  const error = Object.values(store.errors);

  if (error.length === 0) {
    // Go to page after successfully login
    router.push("/employees");
  } else {
    resetForm();
  }
};

// If loginPinToken isn't null, then we are at the next step of login process
// Otherwise, redirect to login page (e.g. user probably manually enter the url)
onMounted(() => {
  if (!store.loginPinToken) {
    router.replace("/accounts/login");
  }
});
</script>
