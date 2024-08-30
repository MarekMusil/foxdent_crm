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
                <div class="col-md-2 fv-row">
                  <label class="fs-5 fw-semobold mb-2">{{ $t("type") }}</label>
                  <Field
                    name="textType"
                    class="form-select"
                    :class="errors.textType ? 'is-invalid' : ''"
                    as="select"
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
                <div class="col-md-7 fv-row">
                  <label class="fs-5 fw-semobold mb-2">{{ $t("text") }}</label>
                  <Field
                    name="textTextId"
                    class="form-select"
                    :class="errors.textTextId ? 'is-invalid' : ''"
                    as="select"
                  >
                    <option value="" disabled>{{ $t("choose_option") }}</option>
                    <option
                      v-for="text in filteredTexts(values.textType)"
                      :key="text.id"
                      :value="text.id"
                    >
                      {{ text.name }}
                    </option>
                  </Field>
                  <ErrorMessage class="invalid-feedback" name="textTextId" />
                </div>
                <div class="col-md-2 fv-row">
                  <label class="fs-5 fw-semobold mb-2">{{ $t("localization") }}</label>
                  <Field
                    name="textLocalization"
                    class="form-select"
                    :class="errors.textLocalization ? 'is-invalid' : ''"
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
                    value=""
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
                    value=""
                    :placeholder="$t('enter_text')"
                  />
                  <ErrorMessage class="invalid-feedback" name="textSubtitle" />
                </div>
              </div>

              <div class="d-flex flex-column mb-5 fv-row">
                <label class="fs-5 fw-semobold mb-2">{{ $t("content") }}</label>
                <Field
                  :class="errors.textContent ? 'is-invalid' : ''"
                  name="textContent"
                  v-slot="{ handleChange, value }"
                  as="custom"
                  value=""
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
import { computed } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import { useOptionsStore } from "@/stores/options";
import ApiService from "@/core/services/ApiService";
import { useAlertStore } from "@/stores/alert";
import BaseAlert from "@/components/BaseAlert.vue";
import TextEditor from "@/components/forms/TextEditor.vue";
import { useRoute, useRouter } from "vue-router";
import { onMounted, reactive } from "vue";


const router = useRouter();
const store = useOptionsStore();
const alertStore = useAlertStore();
const route = useRoute();
const typeId = route.query.typeId as string | undefined;
const textId = route.query.textId as string | undefined;

const initialValues = reactive<{ [key: string]: any }>({});

const validationSchema = Yup.object().shape({
  // Add your validation schema here
});

// Function to filter texts based on selected textType
const filteredTexts = (textType) => {
  if (textType === '1') {
    return store.options.textServices;
  }
  else if (textType === '2') {
    return store.options.textTechnologies;
  }
  else if (textType === '3')
  {
    return store.options.textOthers;
  }
  else
  {
    return store.options.texts;
  }
};

const submit = (values, { resetForm, setErrors }) => {
  ApiService.post("/texts", values)
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

onMounted(async () => {
  if (!typeId && !textId) return;
  try {
    Object.assign(initialValues, {
      textTextId: textId,
      textType: typeId,
      textLocalization: 'cs_CZ'
    });
  } catch (err: any) {
    alertStore.setAlertByRes(err.response);
  }
});
</script>
