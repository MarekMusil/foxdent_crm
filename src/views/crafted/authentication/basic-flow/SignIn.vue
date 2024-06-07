<template>
  <VForm
    class="form w-100"
    @submit="onSubmitLogin"
    :validation-schema="login"
  >
    <!--begin::Heading-->
    <div class="text-center mb-11">
      <!--begin::Title-->
      <h1 class="text-dark fw-bolder mb-3">{{ $t("signIn") }}</h1>
      <!--end::Title-->
      <!--begin::Subtitle-->
      <div class="text-gray-500 fw-semibold fs-6">{{ $t("enter_data_and_login") }}</div>
      <!--end::Subtitle=-->
    </div>
    <!--end::Heading-->
    <!--begin::Input group=-->
    <BaseAlert/>
    <div class="fv-row mb-10">
      <!--begin::Email-->
      <Field
        tabindex="1"
        class="form-control form-control-lg form-control-solid"
        type="text"
        name="userEmail"
        :placeholder="$t('email')"
        autocomplete="off"
      />
      <!--end::Email-->
      <div class="fv-plugins-message-container">
        <div class="fv-help-block">
          <ErrorMessage name="userEmail" />
        </div>
      </div>
    </div>
    <!--end::Input group=-->
    <!--begin::Input group=-->
    <div class="fv-row mb-3">
      <!--begin::Password-->
      <Field
        tabindex="2"
        class="form-control form-control-lg form-control-solid"
        type="password"
        name="userPassword"
        :placeholder="$t('password')"
        autocomplete="off"
      />
      <!--end::Password-->
    </div>
    <div class="fv-plugins-message-container">
      <div class="fv-help-block">
        <ErrorMessage name="userPassword" />
      </div>
    </div>
    <!--end::Input group=-->
    <!--begin::Wrapper-->
    <div class="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
      <div></div>
      <!--begin::Link-->
      <router-link to="/accounts/passwords/reset" class="link-primary">{{
        $t("do_you_forgot_password")
      }}</router-link>
      <!--end::Link-->
    </div>
    <!--end::Wrapper-->
    <!--begin::Submit button-->
    <div class="d-grid mb-9">
      <button
        type="submit"
        tabindex="3"
        class="btn btn-lg btn-primary w-100 mb-5"
      >
        <!--begin::Indicator label-->
        <span class="indicator-label">{{ $t("btn_confirm") }}</span>
        <!--end::Indicator label-->
      </button>
    </div>
    <!--end::Submit button-->
  </VForm>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import BaseAlert from "@/components/BaseAlert.vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const store = useAuthStore();
const router = useRouter();

//Create form validation object
const login = Yup.object().shape({
  userEmail: Yup.string().email().required().label("Email"),
  userPassword: Yup.string().min(4).required().label("Password"),
});

//Form login submit function
const onSubmitLogin = async (values: any, { setFieldValue }) => {
  // Clear existing errors
  store.logout();

  // Send login request
  await store.login(values);
  const error = Object.values(store.errors);

  if (error.length === 0) {
    Swal.fire({
      text: "Zadejte svůj pin",
      icon: "info",
      buttonsStyling: false,
      confirmButtonText: t("btn_continue"),
      heightAuto: false,
      customClass: {
        confirmButton: "btn fw-semobold btn-light-primary",
      },
    }).then(() => {
      // Go to page after successfully login
      router.push("/accounts/login-confirmation");
    });
  } else {
    setFieldValue("userPassword", "");
  }
};
</script>
