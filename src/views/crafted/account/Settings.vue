<template>
  <div class="card mb-5 mb-xl-10">
    <!--begin::Card header-->
    <div class="card-header border-0 cursor-pointer">
      <div class="card-title m-0">
        <h3 class="fw-bold m-0">{{ $t("data_change") }}</h3>
      </div>
    </div>
    <!--begin::Card header-->

    <!--begin::Content-->
    <!--begin::Form-->
    <VForm
      class="form"
      @submit="submitEmail"
      v-slot="{ errors, setFieldValue }"
      :initial-values="{ userEmail: authStore.user?.email || '' }"
    >
      <div class="card-body border-top px-9 py-9">
        <div class="row mb-6">
          <div class="col-md-6 fv-row">
            <label class="required fs-5 fw-semobold mb-2">{{ $t("email") }}</label>
            <Field
              class="form-control"
              :class="errors.userEmail ? 'is-invalid' : ''"
              name="userEmail"
              :placeholder="$t('enter_email')"
            />
            <ErrorMessage class="invalid-feedback" name="userEmail" />
          </div>
        </div>
      </div>

      <div class="card-footer d-flex justify-content-end py-6 px-9">
        <button type="reset" class="btn btn-light me-3">{{ $t("btn_discard") }}</button>
        <button type="submit" class="btn btn-primary">
          {{ $t("btn_confirm") }}
        </button>
      </div>
    </VForm>
  </div>

  <div class="card mb-5 mb-xl-10">
    <!--begin::Card header-->
    <div class="card-header border-0 cursor-pointer">
      <div class="card-title m-0">
        <h3 class="fw-bold m-0">{{ $t("password") }}</h3>
      </div>
    </div>
    <!--begin::Card header-->

    <!--begin::Content-->
    <!--begin::Form-->
    <VForm
      class="form"
      @submit="submitPassword"
      :validation-schema="validationSchemaPassword"
      v-slot="{ errors, setFieldValue }"
    >
      <div class="card-body border-top px-9 py-9">
        <div class="row mb-6">
          <div class="col-md-4 fv-row">
            <label class="required fs-5 fw-semobold mb-2">{{ $t("password") }}</label>
            <Field
              class="form-control"
              :class="errors.userPassword ? 'is-invalid' : ''"
              name="userPassword"
              :placeholder="$t('enter_password')"
              type="password"
            />
            <ErrorMessage class="invalid-feedback" name="userPassword" />
          </div>
          <div class="col-md-4 fv-row">
            <label class="required fs-5 fw-semobold mb-2">{{ $t("repassword") }}</label>
            <Field
              class="form-control"
              :class="errors.userRepassword ? 'is-invalid' : ''"
              name="userRepassword"
              :placeholder="$t('enter_password')"
              type="password"
            />
            <ErrorMessage class="invalid-feedback" name="userRepassword" />
          </div>
        </div>
      </div>

      <div class="card-footer d-flex justify-content-end py-6 px-9">
        <button type="reset" class="btn btn-light me-3">{{ $t("btn_discard") }}</button>
        <button type="submit" class="btn btn-primary">
          {{ $t("btn_confirm") }}
        </button>
      </div>
    </VForm>
  </div>

  <!-- <div class="card mb-5 mb-xl-10">
    <div
      class="card-header border-0 cursor-pointer"
      role="button"
      data-bs-toggle="collapse"
      data-bs-target="#kt_account_deactivate"
      aria-expanded="true"
      aria-controls="kt_account_deactivate"
    >
      <div class="card-title m-0">
        <h3 class="fw-bolder m-0">Deactivate Account</h3>
      </div>
    </div>

    <div id="kt_account_deactivate" class="collapse show">
      <form
        id="kt_account_deactivate_form"
        class="form"
        @submit.prevent="deactivateAccount()"
      >
        <div class="card-body border-top p-9">
          <div
            class="notice d-flex bg-light-warning rounded border-warning border border-dashed mb-9 p-6"
          >
            <KTIcon
              icon-name="information-5"
              icon-class="fs-2tx text-warning me-4"
            />
            <div class="d-flex flex-stack flex-grow-1">
              <div class="fw-semobold">
                <h4 class="text-gray-800 fw-bold">
                  You Are Deactivating Your Account
                </h4>

                <div class="fs-6 text-gray-600">
                  For extra security, this requires you to confirm your email or
                  phone number when you reset yousignr password. <br /><a
                    class="fw-bold"
                    href="#"
                    >Learn more</a
                  >
                </div>
              </div>
            </div>
          </div>

          <div class="form-check form-check-solid fv-row">
            <input
              name="deactivate"
              class="form-check-input"
              type="checkbox"
              value=""
              id="deactivate"
            />
            <label
              class="form-check-label fw-semobold ps-2 fs-6"
              for="deactivate"
              >Confirm Account Deactivation</label
            >
          </div>
        </div>

        <div class="card-footer d-flex justify-content-end py-6 px-9">
          <button type="reset" class="btn btn-light me-3">{{ $t("btn_discard") }}</button>
          <button type="submit" class="btn btn-primary">
            {{ $t("btn_confirm") }}
          </button>
        </div>
      </form>
    </div>
  </div> -->
</template>

<script lang="ts" setup>
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import ApiService from "@/core/services/ApiService";
import { useToast } from "primevue/usetoast";
import { useAuthStore } from "@/stores/auth";

const toast = useToast();
const authStore = useAuthStore();

const validationSchemaPassword = Yup.object().shape({
  userPassword: Yup.string().required(),
  userRepassword: Yup.string()
    .required()
    .oneOf([Yup.ref("userPassword")], "Hesla se neshodují"),
});

const submitPassword = (values: any, { resetForm, setErrors }) => {
  ApiService.put("/accounts/me/passwords", values)
    .then((response) => {
      resetForm();
      toast.add({
        severity: "success",
        summary: "Úspěch",
        detail: response?.data?.message || "Heslo bylo úspěšně změněno",
        life: 8000,
      });
    })
    .catch((error) => {
      toast.add({
        severity: "error",
        summary: "Chyba",
        detail: error?.response?.data?.message || "Něco se pokazilo",
        life: 5000,
      });
      setErrors(error?.response?.data?.errors);
    });
};

const submitEmail = (values: any, { resetForm, setErrors }) => {
  ApiService.put("/accounts/me", values)
    .then((response) => {
      resetForm();
      // update user email in store
      authStore.user.email = values.userEmail;
      localStorage.setItem("user", JSON.stringify(authStore.user));
      toast.add({
        severity: "success",
        summary: "Úspěch",
        detail: response?.data?.message || "Email byl úspěšně změněn",
        life: 8000,
      });
    })
    .catch((error) => {
      toast.add({
        severity: "error",
        summary: "Chyba",
        detail: error?.response?.data?.message || "Něco se pokazilo",
        life: 5000,
      });
      setErrors(error?.response?.data?.errors);
    });
};
</script>
