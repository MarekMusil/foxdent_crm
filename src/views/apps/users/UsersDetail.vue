<template>
  <div class="flex-lg-row-fluid me-lg-15 order-2 order-lg-1 mb-10 mb-lg-0">
    <div class="card card-flush pt-3 mb-5 mb-lg-10">
      <div class="card-body pt-0 mt-10">
        <VForm
          class="form"
          @submit="submit"
          :validation-schema="validationSchema"
          :initial-values="initialValues"
          v-slot="{ errors, values, setFieldValue }"
        >
          <div class="modal-body px-lg-17">
            <div class="scroll-y me-n7 pe-7">
              <BaseAlert />

              <div class="row mb-5">
                <div class="col-md-4 flex-column mb-5 fv-row">
                  <label class="required fs-5 fw-semobold mb-2">{{ $t("user_name") }}</label>
                  <Field
                    class="form-control"
                    :class="errors.userName ? 'is-invalid' : ''"
                    name="userName"
                    :placeholder="$t('enter_text')"
                  />
                  <ErrorMessage class="invalid-feedback" name="userName" />
                </div>
                <div class="col-md-auto fv-row">
                  <label class="required fs-5 fw-semobold mb-2">{{ $t("user_role") }}</label>
                  <Field
                    name="userRoleId"
                    class="form-select"
                    :class="errors.userRoleId ? 'is-invalid' : ''"
                    as="select"
                  >
                    <option value="" disabled>{{ $t("choose_option") }}</option>
                    <option v-for="item in store.options.userRoles" :key="item.id" :value="item.id">
                      {{ item.name }}
                    </option>
                  </Field>
                  <ErrorMessage class="invalid-feedback" name="userRoleId" />
                </div>
              </div>

              <div class="row mb-5">
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
                <div class="col-md-6 fv-row">
                  <label class="required fs-5 fw-semobold mb-2">{{ $t("user_pin") }}</label>
                  <Field
                    class="form-control"
                    :class="errors.userPin ? 'is-invalid' : ''"
                    name="userPin"
                    :placeholder="$t('enter_pin')"
                  />
                  <ErrorMessage class="invalid-feedback" name="userPin" />
                </div>
              </div>

              <div class="row mb-5">
                <div class="col-md-6 fv-row">
                  <label class="required fs-5 fw-semobold mb-2">{{ $t("user_password") }}</label>
                  <Field
                    class="form-control"
                    :class="errors.userPassword ? 'is-invalid' : ''"
                    name="userPassword"
                    :placeholder="$t('enter_password')"
                    type="password"
                    autocomplete="off"
                  />
                  <ErrorMessage class="invalid-feedback" name="userPassword" />
                </div>
                <div class="col-md-6 fv-row">
                  <label class="required fs-5 fw-semobold mb-2">{{ $t("repassword") }}</label>
                  <Field
                    class="form-control"
                    :class="errors.userRePassword ? 'is-invalid' : ''"
                    name="userRePassword"
                    :placeholder="$t('enter_password')"
                    type="password"
                    autocomplete="off"
                  />
                  <ErrorMessage class="invalid-feedback" name="userRePassword" />
                </div>
              </div>

              <div class="d-flex flex-column mb-5 fv-row">
                <label class="required fs-5 fw-semobold mb-2">{{ $t("user_is_active") }}</label>
                <div
                  class="d-flex align-items-center gap-4 form-control"
                  :class="errors.userIsActive ? 'is-invalid' : ''"
                >
                  <div class="form-check form-check-custom form-check-solid gap-2">
                    <label for="userIsActive" class="me-1">{{ $t("option_yes") }}</label>
                    <Field class="form-check-input" name="userIsActive" type="radio" :value="1" />
                  </div>
                  <div class="form-check form-check-custom form-check-solid gap-2">
                    <label for="userIsActive" class="me-1">{{ $t("option_no") }}</label>
                    <Field class="form-check-input" name="userIsActive" type="radio" :value="0" />
                  </div>
                </div>
                <ErrorMessage class="invalid-feedback" name="userIsActive" />
              </div>

            </div>
          </div>

          <div class="modal-footer flex-center m-5">
            <button type="reset" class="btn btn-light me-3">{{ $t("btn_discard") }}</button>
            <button type="submit" class="btn btn-primary">
              {{ $t("btn_confirm") }}
            </button>
          </div>

          <!-- begin::Tool Buttons -->
          <div
            class="engage-toolbar d-flex flex-column position-fixed px-5 fw-bold zindex-2 top-50 end-0 gap-2"
          >
            <button
              class="engage-help-toggle bg-primary btn btn-flex h-35px bg-body btn-color-white shadow-sm px-5 rounded-bottom-0"
              type="submit"
            >
              <i class="bi bi-check-lg"></i>
            </button>
            <button
              class="engage-help-toggle bg-secondary btn btn-flex h-35px bg-body btn-color-gray-700 shadow-sm px-5 rounded-top-0"
              type="reset"
            >
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
          <!-- end::Tool Buttons -->
        </VForm>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import { useOptionsStore } from "@/stores/options";
import ApiService from "@/core/services/ApiService";
import { useAlertStore } from "@/stores/alert";
import BaseAlert from "@/components/BaseAlert.vue";
import { useRoute } from "vue-router";
import { onMounted, reactive, ref } from "vue";
import { setProperties } from "@/utils/update";
import FormMultiSelect from "@/components/forms/FormMultiSelect.vue";

const store = useOptionsStore();
const alertStore = useAlertStore();
const route = useRoute();
const routeId = route.params.id as string;

const initialValues = reactive<{ [key: string]: any }>({});
const signatureImgUrl = ref<string | null>(null);

const validationSchema = Yup.object().shape({
  userName: Yup.string().required(),
  userRoleId: Yup.string().required(),
  userEmail: Yup.string().required(),
  userPin: Yup.string(),
  userPassword: Yup.string(),
  userRePassword: Yup.string(),
  userIsActive: Yup.string().required(),
});

const submit = (values, { setErrors }) => {

  ApiService.put(`/users/${routeId}`, {
    ...values,
  })
    .then((response) => {
      alertStore.setAlertByRes(response);
    })
    .catch(({ response }) => {
      alertStore.setAlertByRes(response);
      setErrors(response.data.errors);
    });
};

onMounted(async () => {
  ApiService.get(`/users/${routeId}`)
    .then(({ data }) => {
      setProperties(data.data, initialValues);
    })
    .catch(({ response }) => {
      alertStore.setAlertByRes(response);
    });
});
</script>
