<template>
  <div class="modal d-block" tabindex="-1" aria-hidden="true">
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Přeskladnění #{{ data.row.id }} - {{ data.row.itemCard.code }}</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <button class="btn btn-icon btn-sm btn-active-icon-primary" @click="$emit('hide-modal')">
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </button>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->
        <!--begin::Form-->
        <VForm
          class="form"
          @submit="submit"
          :validation-schema="validationSchema"
          v-slot="{ errors }"
        >
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div
              class="scroll-y me-n7 pe-7"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-offset="300px"
            >
              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <Field
                  name="branchId"
                  class="form-select"
                  :class="errors.branchId ? 'is-invalid' : ''"
                  as="select"
                >
                  <option value="" disabled>{{ $t("choose_option") }}</option>
                  <option
                    v-for="branch in store.options.branches"
                    :key="branch.id"
                    :value="branch.id"
                  >
                    {{ branch.name }}
                  </option>
                </Field>
                <ErrorMessage class="invalid-feedback" name="branchId" />
              </div>
              <!--end::Input group-->
            </div>
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->

          <!--begin::Modal footer-->
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <button type="reset" class="btn btn-light me-3">
              {{ $t("btn_discard") }}
            </button>
            <!--end::Button-->

            <!--begin::Button-->
            <button
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-lg btn-primary"
              type="submit"
            >
              <span v-if="!loading" class="indicator-label">
                {{ $t("btn_confirm") }}
                <KTIcon icon-name="arrow-right" icon-class="fs-2 me-2 me-0" />
              </span>
              <span v-if="loading" class="indicator-progress">
                {{ $t("please_wait") }}
                <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            </button>
            <!--end::Button-->
          </div>
          <!--end::Modal footer-->
        </VForm>
        <!--end::Form-->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { useOptionsStore } from "@/stores/options";
import * as Yup from "yup";
import ApiService from "@/core/services/ApiService";

const store = useOptionsStore();
const loading = ref(false);

const props = defineProps({
  data: { type: Object, required: true },
});

defineEmits(["hide-modal"]);

const validationSchema = Yup.object({
  branchId: Yup.string().required(),
});

const submit = (values, { setFieldError }) => {
  loading.value = true;

  ApiService.post("/restock", values)
    .then((response) => {
      console.log(response);
    })
    .catch(({ response }) => {
      Object.keys(response.data.errors).forEach((key) => {
        setFieldError(key, response.data.errors[key]);
      });
    });
};
</script>
