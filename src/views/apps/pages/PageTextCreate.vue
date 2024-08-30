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
                <div class="col-md-7 fv-row">
                  <label class="fs-5 fw-semobold mb-2">{{ $t("page") }}</label>
                  <Field
                    name="pagePageId"
                    class="form-select"
                    :class="errors.Field ? 'is-invalid' : ''"
                    as="select"
                  >
                    <option value="" disabled>{{ $t("choose_option") }}</option>
                    <option
                      v-for="page in store.options.pages"
                      :key="page.id"
                      :value="page.id"
                    >
                      {{ page.name }}
                    </option>
                  </Field>
                  <ErrorMessage class="invalid-feedback" name="pagePageId" />
                </div>
                <div class="col-md-3 fv-row">
                  <label class="fs-5 fw-semobold mb-2">{{ $t("localization") }}</label>
                  <Field
                    name="pageLocalization"
                    class="form-select"
                    :class="errors.pageLocalization ? 'is-invalid' : ''"
                    as="select"
                  >
                    <option value="" disabled>{{ $t("choose_option") }}</option>
                    <option
                      v-for="localization in store.options.localizations"
                      :key="localization.code"
                      :value="localization.code"
                    >
                      {{ localization.name }}
                    </option>
                  </Field>
                  <ErrorMessage class="invalid-feedback" name="pageLocalization" />
                </div>
                <div class="col-md-2 fv-row">
                  <label class="fs-5 fw-semobold mb-2">{{ $t("rank") }}</label>
                  <Field
                    class="form-control"
                    :class="errors.pageRank ? 'is-invalid' : ''"
                    name="pageRank"
                    type="number"
                    :placeholder="$t('enter_number')"
                  />
                  <ErrorMessage class="invalid-feedback" name="pageRank" />
                </div>
              </div>

              <div class="row mb-5">
                  <div class="col-md-6 fv-row">
                        <label class="fs-5 fw-semobold mb-2">{{ $t("name") }}</label>
                        <Field
                          class="form-control"
                          :class="errors.pageName ? 'is-invalid' : ''"
                          name="pageName"
                          :placeholder="$t('enter_text')"
                        />
                        <ErrorMessage class="invalid-feedback" name="pageName" />
                  </div>
                  <div class="col-md-6 fv-row">
                        <label class="fs-5 fw-semobold mb-2">{{ $t("title") }}</label>
                        <Field
                          class="form-control"
                          :class="errors.pageTitle ? 'is-invalid' : ''"
                          name="pageTitle"
                          :placeholder="$t('enter_text')"
                        />
                        <ErrorMessage class="invalid-feedback" name="pageTitle" />
                  </div>
                </div>

                <div class="row mb-5">
                  <div class="col-md-4 fv-row">
                        <label class="fs-5 fw-semobold mb-2">{{ $t("meta_title") }}</label>
                        <Field
                          class="form-control"
                          :class="errors.pageMetaTitle ? 'is-invalid' : ''"
                          name="pageMetaTitle"
                          :placeholder="$t('enter_text')"
                        />
                        <ErrorMessage class="invalid-feedback" name="pageMetaTitle" />
                  </div>
                  <div class="col-md-4 fv-row">
                        <label class="fs-5 fw-semobold mb-2">{{ $t("meta_description") }}</label>
                        <Field
                          class="form-control"
                          :class="errors.pageMetaDescription ? 'is-invalid' : ''"
                          name="pageMetaDescription"
                          :placeholder="$t('enter_text')"
                        />
                        <ErrorMessage class="invalid-feedback" name="pageMetaDescription" />
                  </div>
                  <div class="col-md-4 fv-row">
                        <label class="fs-5 fw-semobold mb-2">{{ $t("meta_keywords") }}</label>
                        <Field
                          class="form-control"
                          :class="errors.pageMetaKeywords ? 'is-invalid' : ''"
                          name="pageMetaKeywords"
                          :placeholder="$t('enter_text')"
                        />
                        <ErrorMessage class="invalid-feedback" name="pageMetaKeywords" />
                  </div>
                </div>
          </div>
        </div>
        

        <div class="modal-footer flex-center m-5">
          <button type="reset" class="btn btn-light me-3">{{ $t("btn_discard") }}</button>
          <button type="submit" class="btn btn-primary">
            {{ $t("btn_confirm") }}
          </button>
        </div>
        </VForm>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import { useOptionsStore } from "@/stores/options";
import ApiService from "@/core/services/ApiService";
import { useAlertStore } from "@/stores/alert";
import BaseAlert from "@/components/BaseAlert.vue";
import { useRoute, useRouter } from "vue-router";
import { reactive } from "vue";


const router = useRouter();
const store = useOptionsStore();
const alertStore = useAlertStore();
const route = useRoute();

const initialValues = reactive<{ [key: string]: any }>({});

const validationSchema = Yup.object().shape({
});

const submit = (values, { resetForm, setErrors }) => {
  ApiService.post("/pages", values)
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
