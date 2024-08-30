<template>
  <div class="flex-lg-row-fluid me-lg-15 order-2 order-lg-1 mb-10 mb-lg-0">
    <div class="card card-flush pt-3 mb-5 mb-lg-10">
      <div class="card-body pt-0 mt-10">
        <VForm
          class="form"
          @submit="submit"
          :validation-schema="validationSchema"
          v-slot="{ errors, values, setFieldValue }"
        >
          <div class="modal-body px-lg-17">
            <div class="scroll-y me-n7 pe-7">
              <BaseAlert />
              <div class="d-flex flex-column mb-5 fv-row">
                <label class="required fs-5 fw-semobold mb-2">{{ $t("user_name") }}</label>
                <Field
                  class="form-control"
                  :class="errors.userName ? 'is-invalid' : ''"
                  name="userName"
                  :placeholder="$t('enter_text')"
                />
                <ErrorMessage class="invalid-feedback" name="userName" />
              </div>

              <div class="row mb-5">
                <div class="col-md-4 fv-row">
                  <label class="required fs-5 fw-semobold mb-2">{{ $t("user_role") }}</label>
                  <Field
                    name="userRoleId"
                    class="form-select"
                    :class="errors.userRoleId ? 'is-invalid' : ''"
                    as="select"
                    @update:model-value="
                      () => {
                        if (values.userRoleId != 4) {
                          setFieldValue('userCashdeskId', null);
                        }
                      }
                    "
                  >
                    <option value="" disabled>{{ $t("choose_option") }}</option>
                    <option v-for="item in store.options.userRoles" :key="item.id" :value="item.id">
                      {{ item.name }}
                    </option>
                  </Field>
                  <ErrorMessage class="invalid-feedback" name="userRoleId" />
                </div>

                <div class="col-md-4 fv-row">
                  <label class="required fs-5 fw-semobold mb-2">{{ $t("branches") }}</label>
                  <Field
                    name="userBranchesId"
                    v-slot="{ handleChange, value }"
                    :class="errors.userBranchesId ? 'is-invalid' : ''"
                    as="custom"
                  >
                    <FormMultiSelect
                      :modelValue="value"
                      @update:modelValue="handleChange"
                      :class="errors.userBranchesId ? 'p-invalid' : ''"
                      :options="store.options.branches"
                      :placeholder="$t('choose_option')"
                    />
                  </Field>
                  <ErrorMessage class="invalid-feedback" name="userBranchesId" />
                </div>

                <div class="col-md-4 fv-row">
                  <label class="fs-5 fw-semobold mb-2">{{ $t("cashdesk") }}</label>
                  <Field
                    name="userCashdeskId"
                    class="form-select"
                    :class="errors.userCashdeskId ? 'is-invalid' : ''"
                    :disabled="values.userRoleId != 4"
                    as="select"
                  >
                    <option value="" disabled>{{ $t("choose_option") }}</option>
                    <option v-for="item in store.options.cashdesks" :key="item.id" :value="item.id">
                      {{ item.name }}
                    </option>
                  </Field>
                  <ErrorMessage class="invalid-feedback" name="userCashdeskId" />
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
import FormMultiSelect from "@/components/forms/FormMultiSelect.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useOptionsStore();
const alertStore = useAlertStore();

const validationSchema = Yup.object().shape({
  userName: Yup.string().required(),
  userRoleId: Yup.string().required(),
  userBranchesId: Yup.array().required().min(1),
  userEmail: Yup.string().required(),
  userPin: Yup.string().required(),
  userIsActive: Yup.string().required(),
});

const submit = (values, { resetForm, setErrors }) => {
  ApiService.post("/users", values)
    .then((response) => {
      alertStore.setAlertByRes(response);
      resetForm();
      router.push(response.data.data.redirectUrl);
    })
    .catch(({ response }) => {
      alertStore.setAlertByRes(response);
      setErrors(response.data.errors);
    });
};
</script>
