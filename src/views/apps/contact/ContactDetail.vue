<template>
  <div class="flex-lg-row-fluid me-lg-15 order-2 order-lg-1 mb-10 mb-lg-0">
    <div class="card card-flush pt-3 mb-5 mb-lg-10">
      <div class="card-header">
        <div class="card-title">
          <h2 class="fw-bold">Kontakní údaje</h2>
        </div>
      </div>
      <div class="card-body pt-0">
        <VForm
          class="form"
          @submit="submit"
          :validation-schema="validationSchema"
          :initial-values="initialValues"
          v-slot="{ errors, values, setFieldValue, setValues }"
        >

        <div class="modal-body px-lg-17">
              <div class="scroll-y me-n7 pe-7">
                <BaseAlert />

                <div class="row mb-5">
                  <div class="col-md-6 fv-row">
                        <label class="fs-5 fw-semobold mb-2">{{ $t("email_1") }}</label>
                        <Field
                          class="form-control"
                          :class="errors.contactDataEmail1 ? 'is-invalid' : ''"
                          name="contactDataEmail1"
                          :placeholder="$t('enter_text')"
                        />
                        <ErrorMessage class="invalid-feedback" name="contactDataEmail1" />
                  </div>
                  <div class="col-md-6 fv-row">
                        <label class="fs-5 fw-semobold mb-2">{{ $t("email_2") }}</label>
                        <Field
                          class="form-control"
                          :class="errors.contactDataEmail2 ? 'is-invalid' : ''"
                          name="contactDataEmail2"
                          :placeholder="$t('enter_text')"
                        />
                        <ErrorMessage class="invalid-feedback" name="contactDataEmail2" />
                  </div>
                </div>

                <div class="row mb-5">
                  <div class="col-md-6 fv-row">
                        <label class="fs-5 fw-semobold mb-2">{{ $t("phone_1") }}</label>
                        <Field
                          class="form-control"
                          :class="errors.contactDataPhone1 ? 'is-invalid' : ''"
                          name="contactDataPhone1"
                          :placeholder="$t('enter_text')"
                        />
                        <ErrorMessage class="invalid-feedback" name="contactDataPhone1" />
                  </div>
                  <div class="col-md-6 fv-row">
                        <label class="fs-5 fw-semobold mb-2">{{ $t("phone_2") }}</label>
                        <Field
                          class="form-control"
                          :class="errors.contactDataPhone2 ? 'is-invalid' : ''"
                          name="contactDataPhone2"
                          :placeholder="$t('enter_text')"
                        />
                        <ErrorMessage class="invalid-feedback" name="contactDataPhone2" />
                  </div>
                </div>

                <div class="row mb-5">
                  <div class="col-md-6 fv-row">
                        <label class="fs-5 fw-semobold mb-2">{{ $t("Facebook") }}</label>
                        <Field
                          class="form-control"
                          :class="errors.contactDataFacebook ? 'is-invalid' : ''"
                          name="contactDataFacebook"
                          :placeholder="$t('enter_text')"
                        />
                        <ErrorMessage class="invalid-feedback" name="contactDataFacebook" />
                  </div>
                  <div class="col-md-6 fv-row">
                        <label class="fs-5 fw-semobold mb-2">{{ $t("Instagram") }}</label>
                        <Field
                          class="form-control"
                          :class="errors.contactDataInstagram ? 'is-invalid' : ''"
                          name="contactDataInstagram"
                          :placeholder="$t('enter_text')"
                        />
                        <ErrorMessage class="invalid-feedback" name="contactDataInstagram" />
                  </div>
                </div>

                <div class="d-flex flex-column mb-5 fv-row">
                  <label class="fs-5 fw-semobold mb-2">{{ $t("contact_address") }}</label>
                  <Field
                    :class="errors.contactDataAddress ? 'is-invalid' : ''"
                    name="contactDataAddress"
                    v-slot="{ handleChange, value }"
                    as="custom"
                  >
                    <TextEditor
                      :modelValue="value"
                      :class="errors.contactDataAddress ? 'p-invalid' : ''"
                      @update:modelValue="handleChange"
                      heigth = "850px"
                    />
                  </Field>
                  <ErrorMessage class="invalid-feedback" name="contactDataAddress" />
                </div>

                <div class="d-flex flex-column mb-5 fv-row">
                  <label class="fs-5 fw-semobold mb-2">{{ $t("office_hours_stomatology") }}</label>
                  <Field
                    :class="errors.contactDataOfficeHoursStomatology ? 'is-invalid' : ''"
                    name="contactDataOfficeHoursStomatology"
                    v-slot="{ handleChange, value }"
                    as="custom"
                  >
                    <TextEditor
                      :modelValue="value"
                      :class="errors.contactDataOfficeHoursStomatology ? 'p-invalid' : ''"
                      @update:modelValue="handleChange"
                      heigth = "850px"
                    />
                  </Field>
                  <ErrorMessage class="invalid-feedback" name="contactDataOfficeHoursStomatology" />
                </div>

                <div class="d-flex flex-column mb-5 fv-row">
                  <label class="fs-5 fw-semobold mb-2">{{ $t("office_hours_dental_hygiene") }}</label>
                  <Field
                    :class="errors.contactDataOfficeHoursDentalHygiene ? 'is-invalid' : ''"
                    name="contactDataOfficeHoursDentalHygiene"
                    v-slot="{ handleChange, value }"
                    as="custom"
                  >
                    <TextEditor
                      :modelValue="value"
                      :class="errors.contactDataOfficeHoursDentalHygiene ? 'p-invalid' : ''"
                      @update:modelValue="handleChange"
                      heigth = "850px"
                    />
                  </Field>
                  <ErrorMessage class="invalid-feedback" name="contactDataOfficeHoursDentalHygiene" />
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
import { useRoute } from "vue-router";
import { onMounted, reactive, ref } from "vue";
import { setProperties } from "@/utils/update";
import TextEditor from "@/components/forms/TextEditor.vue";

const store = useOptionsStore();
const alertStore = useAlertStore();
const route = useRoute();
const routeId = route.params.id as string;

const itemValues = ref<any[]>([]);
const initialValues = reactive<{ [key: string]: any }>({});

const validationSchema = Yup.object().shape({
});

const submit = async (values, { setErrors }) => {
  ApiService.put(`/contact/data`, {
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
  ApiService.get(`/contact/data`)
    .then(({ data }) => {
      setProperties(data.data, initialValues);
      Object.assign(initialValues, {
      });
    })
    .catch(({ response }) => {
      alertStore.setAlertByRes(response);
    });
});
</script>
