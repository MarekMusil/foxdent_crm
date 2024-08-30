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
                <div class="col-md-8 fv-row">
                  <label class="fs-5 fw-semobold mb-2">{{ $t("important_message_name") }}</label>
                  <Field
                    class="form-control"
                    :class="errors.importantMessageName ? 'is-invalid' : ''"
                    name="importantMessageName"
                    :placeholder="$t('enter_text')"
                  />
                  <ErrorMessage class="invalid-feedback" name="importantMessageName" />
                </div>
                <div class="col-md-4 fv-row">
                  <label class="fs-5 fw-semobold mb-2">{{ $t("important_message_is_visible") }}</label>
                  <div
                    class="d-flex align-items-center gap-4 form-control"
                    :class="errors.importantMessageIsVisible ? 'is-invalid' : ''"
                  >
                    <div class="form-check form-check-custom form-check-solid gap-2">
                      <label for="importantMessageIsVisibleYes" class="me-1">{{
                        $t("option_yes")
                      }}</label>
                      <Field
                        id="importantMessageIsVisibleYes"
                        class="form-check-input"
                        name="importantMessageIsVisible"
                        type="radio"
                        :value="1"
                      />
                    </div>
                    <div class="form-check form-check-custom form-check-solid gap-2">
                      <label for="importantMessageIsVisibleNo" class="me-1">{{
                        $t("option_no")
                      }}</label>
                      <Field
                        id="importantMessageIsVisibleNo"
                        class="form-check-input"
                        name="importantMessageIsVisible"
                        type="radio"
                        :value="0"
                      />
                    </div>
                  </div>
                  <ErrorMessage class="invalid-feedback" name="importantMessageIsVisible" />
                </div>
              </div>

              <div class="d-flex flex-column mb-5 fv-row">
                <label class="fs-5 fw-semobold mb-2">{{ $t("important_message_content") }}</label>
                <Field
                  :class="errors.importantMessageContent ? 'is-invalid' : ''"
                  name="importantMessageContent"
                  v-slot="{ handleChange, value }"
                  as="custom"
                >
                  <TextEditor
                    :modelValue="value"
                    :class="errors.importantMessageContent ? 'p-invalid' : ''"
                    @update:modelValue="handleChange"
                    heigth="850px"
                  />
                </Field>
                <ErrorMessage class="invalid-feedback" name="importantMessageContent" />
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

const validationSchema = Yup.object().shape({});

const submit = async (values, { setErrors }) => {
  ApiService.put(`/important_messages`, {
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
  ApiService.get(`/important_messages`)
    .then(({ data }) => {
      setProperties(data.data, initialValues);
      Object.assign(initialValues, {});
    })
    .catch(({ response }) => {
      alertStore.setAlertByRes(response);
    });
});
</script>
