<template>
  <div class="flex-lg-row-fluid me-lg-15 order-2 order-lg-1 mb-10 mb-lg-0">
    <div class="card card-flush pt-3 mb-5 mb-lg-10">
      <div class="card-header">
        <div class="card-title">
          <h2 class="fw-bold">Nový zaměstnanec</h2>
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
                  <div class="col-md-6 fv-row">
                        <label class="fs-5 fw-semobold mb-2">{{ $t("employee_name") }}</label>
                        <Field
                          class="form-control"
                          :class="errors.employeeName ? 'is-invalid' : ''"
                          name="employeeName"
                          :placeholder="$t('enter_text')"
                        />
                        <ErrorMessage class="invalid-feedback" name="employeeName" />
                  </div>
                  <div class="col-md-2 fv-row">
                        <label class="fs-5 fw-semobold mb-2">{{ $t("degree") }}</label>
                        <Field
                          class="form-control"
                          :class="errors.employeeDegree ? 'is-invalid' : ''"
                          name="employeeDegree"
                          :placeholder="$t('enter_text')"
                        />
                        <ErrorMessage class="invalid-feedback" name="employeeDegree" />
                  </div>
                  <div class="col-md-4 fv-row">
                        <label class="fs-5 fw-semobold mb-2">{{ $t("work") }}</label>
                        <Field
                          class="form-control"
                          :class="errors.employeeText ? 'is-invalid' : ''"
                          name="employeeText"
                          :placeholder="$t('enter_text')"
                        />
                        <ErrorMessage class="invalid-feedback" name="employeeText" />
                  </div>
                </div>

                <div class="row mb-5">
                  <div class="col-md-6 fv-row">
                        <label class="fs-5 fw-semobold mb-2">{{ $t("education") }}</label>
                        <Field
                          class="form-control"
                          :class="errors.employeeEducation ? 'is-invalid' : ''"
                          name="employeeEducation"
                          :placeholder="$t('enter_text')"
                        />
                        <ErrorMessage class="invalid-feedback" name="employeeEducation" />
                  </div>
                  <div class="col-md-5 fv-row">
                    <label class="fs-5 fw-semobold mb-2">{{ $t("type") }}</label>
                    <div
                      class="d-flex align-items-center gap-4 form-control"
                      :class="errors.employeeType ? 'is-invalid' : ''"
                    >
                    <div class="form-check form-check-custom form-check-solid gap-2">
                        <label for="employeeType1" class="me-1">{{ $t("Stomatologie") }}</label>
                        <Field
                          id="employeeType1"
                          class="form-check-input"
                          name="employeeType"
                          type="radio"
                          :value="1"
                        />
                      </div>
                      <div class="form-check form-check-custom form-check-solid gap-2">
                        <label for="employeeType2" class="me-1">{{ $t("Dentální hygiena") }}</label>
                        <Field
                          id="employeeType2"
                          class="form-check-input"
                          name="employeeType"
                          type="radio"
                          :value="2"
                        />
                      </div>
                      <div class="form-check form-check-custom form-check-solid gap-2">
                        <label for="employeeType3" class="me-1">{{ $t("Zubní instrumentářky") }}</label>
                        <Field
                          id="employeeType3"
                          class="form-check-input"
                          name="employeeType"
                          type="radio"
                          :value="3"
                        />
                      </div>
                    </div>
                    <ErrorMessage class="invalid-feedback" name="employeeType" />
                  </div>
                  <div class="col-md-1 fv-row">
                        <label class="fs-5 fw-semobold mb-2">{{ $t("rank") }}</label>
                        <Field
                          class="form-control"
                          :class="errors.employeeRank ? 'is-invalid' : ''"
                          name="employeeRank"
                          type="number"
                          :placeholder="$t('enter_number')"
                        />
                        <ErrorMessage class="invalid-feedback" name="employeeRank" />
                  </div>
                </div>
                <div class="d-flex flex-column mb-5 fv-row">
                  <label class="fs-5 fw-semobold mb-2">{{ $t("description") }}</label>
                  <Field
                    :class="errors.employeeOfficeHours ? 'is-invalid' : ''"
                    name="employeeOfficeHours"
                    v-slot="{ handleChange, value }"
                    as="custom"
                  >
                    <TextEditor
                      :modelValue="value"
                      :class="errors.employeeOfficeHours ? 'p-invalid' : ''"
                      @update:modelValue="handleChange"
                    />
                  </Field>
                  <ErrorMessage class="invalid-feedback" name="employeeOfficeHours" />
                </div>
                <div class="d-flex flex-column mb-5 fv-row">
                  <label class="required fs-5 fw-semobold mb-2">{{ $t("active") }}</label>
                  <div
                    class="d-flex align-items-center gap-4 form-control"
                    :class="errors.employeeActive ? 'is-invalid' : ''"
                  >
                    <div class="form-check form-check-custom form-check-solid gap-2">
                      <label for="employeeActive" class="me-1">{{ $t("option_yes") }}</label>
                      <Field
                        class="form-check-input"
                        name="employeeActive"
                        type="radio"
                        :value="1"
                      />
                    </div>

                    <div class="form-check form-check-custom form-check-solid gap-2">
                      <label for="employeeActive" class="me-1">{{ $t("option_no") }}</label>
                      <Field
                        class="form-check-input"
                        name="employeeActive"
                        type="radio"
                        :value="0"
                      />
                    </div>
                  </div>
                  <ErrorMessage class="invalid-feedback" name="employeeActive" />
                </div>

                <div class="row mb-5">
                  <div id="cropperWidthTemplate" class="col-md-6 fv-row">
                    <label class="fs-5 fw-semobold mb-2">{{ $t("photo") }}</label>
                    <div class="width-100">
                      <img
                        v-if="employeeImgUrl"
                        class="border border-secondary rounded p-3"
                        :src="employeeImgUrl"
                        alt="employee image"
                        width="300px"
                      />
                    </div>
                    <Loading v-if="loading"/>
                  </div>
                  <div class="col-md-6 fv-row">
                    <label class="fs-5 fw-semobold mb-2">{{ $t("new_photo") }}</label>
                    <FormCropper
                      :upload-path="`/employees/upload/photo`"
                      ref="formCropperRef"
                      @upload-success="handleUploadResponse"
                    />
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
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import { useOptionsStore } from "@/stores/options";
import ApiService from "@/core/services/ApiService";
import { useAlertStore } from "@/stores/alert";
import BaseAlert from "@/components/BaseAlert.vue";
import TextEditor from "@/components/forms/TextEditor.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import Loading from "@/components/datatable/table-partials/LoadingTransparent.vue";
import FormCropper from "@/components/forms/FormCropper.vue";

const router = useRouter();
const store = useOptionsStore();
const alertStore = useAlertStore();

const employeeImgUrl = ref<string | null>(null);
const employeePhotoTransaction = ref<string | null>(null);
const formCropperRef = ref<InstanceType<typeof FormCropper> | null>(null);
const loading = ref(false);

const validationSchema = Yup.object().shape({
});

const handleUploadResponse = (response) => {
  console.log(response.data.data.employeePhotoTransaction);
  employeeImgUrl.value = response.data.data.photoImgUrl;
  employeePhotoTransaction.value = response.data.data.employeePhotoTransaction
};

const submit = async (values, { resetForm, setErrors }) => {
  if (formCropperRef.value) {
    try {
      const response = await formCropperRef.value.uploadFiles();
      handleUploadResponse(response);
    } catch (error) {
      console.error(error);
      return;
    }
  }
  ApiService.post("/employees", {
    ...values,
    employeePhotoTransaction: employeePhotoTransaction.value,
  })
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
