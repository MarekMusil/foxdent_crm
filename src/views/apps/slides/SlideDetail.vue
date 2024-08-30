<template>
  <div class="flex-lg-row-fluid me-lg-15 order-2 order-lg-1 mb-10 mb-lg-0">
    <div class="card card-flush pt-3 mb-5 mb-lg-10">
      <div class="card-body pt-0 mt-10">
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

                <div class="d-flex flex-column mb-5 fv-row">
                  <label class="required fs-5 fw-semobold mb-2">{{ $t("active") }}</label>
                  <div
                    class="d-flex align-items-center gap-4 form-control"
                    :class="errors.slideActive ? 'is-invalid' : ''"
                  >
                    <div class="form-check form-check-custom form-check-solid gap-2">
                      <label for="slideActiveYes" class="me-1">{{ $t("option_yes") }}</label>
                      <Field
                        id="slideActiveYes"
                        class="form-check-input"
                        name="slideActive"
                        type="radio"
                        :value="1"
                      />
                    </div>

                    <div class="form-check form-check-custom form-check-solid gap-2">
                      <label for="slideActiveNo" class="me-1">{{ $t("option_no") }}</label>
                      <Field
                        id="slideActiveNo"
                        class="form-check-input"
                        name="slideActive"
                        type="radio"
                        :value="0"
                      />
                    </div>
                  </div>
                  <ErrorMessage class="invalid-feedback" name="slideActive" />
                </div>
                
                <div class="row mb-5">
                  <div id="cropperWidthTemplate" class="col-md-6 fv-row">
                    <label class="fs-5 fw-semobold mb-2">{{ $t("photo") }}</label>
                    <div class="width-100">
                      <img
                        v-if="slideImgUrl"
                        class="border border-secondary rounded p-3"
                        :src="slideImgUrl"
                        alt="slide image"
                        width="500px"
                      />
                    </div>
                    <Loading v-if="loading"/>
                  </div>
                  <div class="col-md-5 fv-row">
                    <label class="fs-5 fw-semobold mb-2">{{ $t("new_photo") }}</label>
                    <FormCropper
                      :upload-path="`/slides/${routeId}/upload/photo`"
                      :aspect-ratio="6 / 3"
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
import { useRoute } from "vue-router";
import { onMounted, reactive, ref } from "vue";
import { setProperties } from "@/utils/update";
import TextEditor from "@/components/forms/TextEditor.vue";
import FormCropper from "@/components/forms/FormCropper.vue";
import Loading from "@/components/datatable/table-partials/LoadingTransparent.vue";

const store = useOptionsStore();
const alertStore = useAlertStore();
const route = useRoute();
const routeId = route.params.id as string;

const loading = ref(false);

const itemValues = ref<any[]>([]);
const initialValues = reactive<{ [key: string]: any }>({});
const slideImgUrl = ref<string | null>(null);
const formCropperRef = ref<InstanceType<typeof FormCropper> | null>(null);


const validationSchema = Yup.object().shape({
});

const submit = async (values, { setErrors }) => {
  if (formCropperRef.value) {
    formCropperRef.value.uploadFiles();
  }
  ApiService.put(`/slides/${routeId}`, {
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

const handleUploadResponse = (response) => {
  slideImgUrl.value = response.data.data.newPhotoImgUrl
};

onMounted(async () => {
  ApiService.get(`/slides/${routeId}`)
    .then(({ data }) => {
      setProperties(data.data, initialValues);
      slideImgUrl.value = data.data.slide.photoImgUrl;
      Object.assign(initialValues, {
        slideText: data.data.slide.text.html
      });
    })
    .catch(({ response }) => {
      alertStore.setAlertByRes(response);
    });
});
</script>
