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
                  <div class="col-md-7 fv-row">
                    <label class="fs-5 fw-semobold mb-2">{{ $t("text") }}</label>
                    <Field
                      name="textTextId"
                      class="form-select"
                      :class="errors.textTextId ? 'is-invalid' : ''"
                      as="select"
                      disabled
                    >
                      <option value="" disabled>{{ $t("choose_option") }}</option>
                      <option
                        v-for="text in store.options.texts"
                        :key="text.id"
                        :value="text.id"
                      >
                        {{ text.name }}
                      </option>
                    </Field>
                    <ErrorMessage class="invalid-feedback" name="textTextId" />
                  </div>
                  <div class="col-md-2 fv-row">
                    <label class="fs-5 fw-semobold mb-2">{{ $t("type") }}</label>
                    <Field
                      name="textType"
                      class="form-select"
                      :class="errors.textType ? 'is-invalid' : ''"
                      as="select"
                      disabled
                    >
                      <option value="" disabled>{{ $t("choose_option") }}</option>
                      <option
                        v-for="textType in store.options.textTypes"
                        :key="textType.id"
                        :value="textType.id"
                      >
                        {{ textType.name }}
                      </option>
                    </Field>
                    <ErrorMessage class="invalid-feedback" name="textType" />
                  </div> 
                  <div class="col-md-2 fv-row">
                    <label class="fs-5 fw-semobold mb-2">{{ $t("localization") }}</label>
                    <Field
                      name="textLocalization"
                      class="form-select"
                      :class="errors.textLocalization ? 'is-invalid' : ''"
                      as="select"
                      disabled
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
                    <ErrorMessage class="invalid-feedback" name="textLocalization" />
                  </div> 
                  <div class="col-md-1 fv-row">
                        <label class="fs-5 fw-semobold mb-2">{{ $t("rank") }}</label>
                        <Field
                          class="form-control"
                          :class="errors.textRank ? 'is-invalid' : ''"
                          name="textRank"
                          type="number"
                          :placeholder="$t('enter_number')"
                        />
                        <ErrorMessage class="invalid-feedback" name="textRank" />
                  </div>                      
                </div>

                <div class="row mb-5">
                  <div class="col-md-6 fv-row">
                        <label class="fs-5 fw-semobold mb-2">{{ $t("title") }}</label>
                        <Field
                          class="form-control"
                          :class="errors.textTitle ? 'is-invalid' : ''"
                          name="textTitle"
                          :placeholder="$t('enter_text')"
                        />
                        <ErrorMessage class="invalid-feedback" name="textTitle" />
                  </div>
                  <div class="col-md-6 fv-row">
                        <label class="fs-5 fw-semobold mb-2">{{ $t("subtitle") }}</label>
                        <Field
                          class="form-control"
                          :class="errors.textSubtitle ? 'is-invalid' : ''"
                          name="textSubtitle"
                          :placeholder="$t('enter_text')"
                        />
                        <ErrorMessage class="invalid-feedback" name="textSubtitle" />
                  </div>
                </div>

                <div v-if="values.textType == 1 || values.textType == 2" class="row mb-5">
                  <div class="col-md-4 fv-row">
                        <label class="fs-5 fw-semobold mb-2">{{ $t("meta_title") }}</label>
                        <Field
                          class="form-control"
                          :class="errors.textMetaTitle ? 'is-invalid' : ''"
                          name="textMetaTitle"
                          :placeholder="$t('enter_text')"
                        />
                        <ErrorMessage class="invalid-feedback" name="textMetaTitle" />
                  </div>
                  <div class="col-md-4 fv-row">
                        <label class="fs-5 fw-semobold mb-2">{{ $t("meta_description") }}</label>
                        <Field
                          class="form-control"
                          :class="errors.textMetaDescription ? 'is-invalid' : ''"
                          name="textMetaDescription"
                          :placeholder="$t('enter_text')"
                        />
                        <ErrorMessage class="invalid-feedback" name="textMetaDescription" />
                  </div>
                  <div class="col-md-4 fv-row">
                        <label class="fs-5 fw-semobold mb-2">{{ $t("meta_keywords") }}</label>
                        <Field
                          class="form-control"
                          :class="errors.textMetaKeywords ? 'is-invalid' : ''"
                          name="textMetaKeywords"
                          :placeholder="$t('enter_text')"
                        />
                        <ErrorMessage class="invalid-feedback" name="textMetaKeywords" />
                  </div>
                </div>

                <div class="d-flex flex-column mb-5 fv-row">
                  <label class="fs-5 fw-semobold mb-2">{{ $t("content") }}</label>
                  <Field
                    :class="errors.textContent ? 'is-invalid' : ''"
                    name="textContent"
                    v-slot="{ handleChange, value }"
                    as="custom"
                  >
                    <TextEditor
                      :modelValue="value"
                      :class="errors.textContent ? 'p-invalid' : ''"
                      @update:modelValue="handleChange"
                    />
                  </Field>
                  <ErrorMessage class="invalid-feedback" name="textContent" />
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
const employeeImgUrl = ref<string | null>(null);


const validationSchema = Yup.object().shape({
});

const submit = async (values, { setErrors }) => {
  ApiService.put(`/texts/${routeId}`, {
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
  ApiService.get(`/texts/${routeId}`)
    .then(({ data }) => {
      setProperties(data.data, initialValues);
      employeeImgUrl.value = data.data.employee.photoImgUrl;
    })
    .catch(({ response }) => {
      alertStore.setAlertByRes(response);
    });
});
</script>
