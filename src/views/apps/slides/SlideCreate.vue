<template>
  <div class="flex-lg-row-fluid me-lg-15 order-2 order-lg-1 mb-10 mb-lg-0">
    <div class="card card-flush pt-3 mb-5 mb-lg-10">
      <div class="card-header">
        <div class="card-title">
          <h2 class="fw-bold">Nová stránka</h2>
        </div>
      </div>
      <div class="card-body pt-0">
        <VForm
          class="form"
          @submit="submit"
          :validation-schema="validationSchema"
          v-slot="{ errors, values, setFieldValue }"
        >
        <div class="modal-body px-lg-17">
              <div class="scroll-y me-n7 pe-7">
                <BaseAlert />

                <div class="row mb-5">
                  <div class="col-md-10 fv-row">
                        <label class="fs-5 fw-semobold mb-2">{{ $t("title") }}</label>
                        <Field
                          class="form-control"
                          :class="errors.slideTitle ? 'is-invalid' : ''"
                          name="slideTitle"
                          :placeholder="$t('enter_text')"
                        />
                        <ErrorMessage class="invalid-feedback" name="slideTitle" />
                  </div>
                  <div class="col-md-2 fv-row">
                        <label class="fs-5 fw-semobold mb-2">{{ $t("rank") }}</label>
                        <Field
                          class="form-control"
                          :class="errors.slideRank ? 'is-invalid' : ''"
                          name="slideRank"
                          type="number"
                          :placeholder="$t('enter_text')"
                        />
                        <ErrorMessage class="invalid-feedback" name="slideRank" />
                  </div>
                </div>

                <div class="row mb-5">
                  <div class="col-md-6 fv-row">
                        <label class="fs-5 fw-semobold mb-2">{{ $t("button_1") }}</label>
                        <Field
                          class="form-control"
                          :class="errors.slideButton1 ? 'is-invalid' : ''"
                          name="slideButton1"
                          :placeholder="$t('enter_text')"
                        />
                        <ErrorMessage class="invalid-feedback" name="slideButton1" />
                  </div>
                  <div class="col-md-6 fv-row">
                        <label class="fs-5 fw-semobold mb-2">{{ $t("button_2") }}</label>
                        <Field
                          class="form-control"
                          :class="errors.slideButton2 ? 'is-invalid' : ''"
                          name="slideButton2"
                          :placeholder="$t('enter_text')"
                        />
                        <ErrorMessage class="invalid-feedback" name="slideButton2" />
                  </div>
                </div>

                <div class="d-flex flex-column mb-5 fv-row">
                  <label class="fs-5 fw-semobold mb-2">{{ $t("text") }}</label>
                  <Field
                    :class="errors.slideText ? 'is-invalid' : ''"
                    name="slideText"
                    v-slot="{ handleChange, value }"
                    as="custom"
                  >
                    <TextEditor
                      :modelValue="value"
                      :class="errors.slideText ? 'p-invalid' : ''"
                      @update:modelValue="handleChange"
                    />
                  </Field>
                  <ErrorMessage class="invalid-feedback" name="slideText" />
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
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import { useOptionsStore } from "@/stores/options";
import ApiService from "@/core/services/ApiService";
import { useAlertStore } from "@/stores/alert";
import BaseAlert from "@/components/BaseAlert.vue";
import TextEditor from "@/components/forms/TextEditor.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useOptionsStore();
const alertStore = useAlertStore();

const validationSchema = Yup.object().shape({
 /*  userName: Yup.string().required(),
  userRoleId: Yup.string().required(),
  userEmail: Yup.string().required(),
  userPin: Yup.string().required(),
  userIsActive: Yup.string().required(), */
});

const submit = (values, { resetForm, setErrors }) => {
  ApiService.post("/slides", values)
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
