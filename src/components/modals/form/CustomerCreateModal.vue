<template>
  <div class="modal d-block" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered mw-850px">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="fw-bold">Nový zákazník</h2>
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
          v-slot="{ errors, setFieldValue, values }"
        >
          <div class="modal-body px-lg-17">
            <div class="scroll-y me-n7 pe-7">
              <BaseAlert />
              <div class="row mb-5">
                <div class="col-md-6 fv-row">
                  <label class="required fs-5 fw-semobold mb-2">{{ $t("customer_name") }}</label>
                  <Field
                    class="form-control"
                    :class="errors.customerName ? 'is-invalid' : ''"
                    name="customerName"
                    :placeholder="$t('enter_text')"
                  />
                  <ErrorMessage class="invalid-feedback" name="customerName" />
                </div>

                <div class="col-md-6 fv-row">
                  <label class="required fs-5 fw-semobold mb-2">{{ $t("customer_type") }}</label>
                  <Field
                    name="customerTypeId"
                    class="form-select"
                    :class="errors.customerTypeId ? 'is-invalid' : ''"
                    as="select"
                  >
                    <option value="" disabled>{{ $t("choose_option") }}</option>
                    <option
                      v-for="cashdesk in store.options.customerTypes"
                      :key="cashdesk.id"
                      :value="cashdesk.id"
                    >
                      {{ cashdesk.name }}
                    </option>
                  </Field>
                  <ErrorMessage class="invalid-feedback" name="customerTypeId" />
                </div>
              </div>
              <div class="row mb-5">
                <div class="col-md-6 fv-row">
                  <label class="required fs-5 fw-semobold mb-2">{{ $t("crn") }}</label>
                  <Field
                    class="input-group"
                    :class="errors.customerCompanyIn ? 'is-invalid' : ''"
                    name="customerCompanyIn"
                    v-slot="{ field, handleChange }"
                    as="div"
                  >
                    <input
                      type="text"
                      @change="handleChange"
                      :value="field.value"
                      class="form-control"
                      :class="errors.customerCompanyIn ? 'is-invalid' : ''"
                      :placeholder="$t('enter_text')"
                    />
                    <button
                      class="input-group-text"
                      type="button"
                      @click="getAres(values.customerCompanyIn, setFieldValue)"
                    >
                      <i class="bi bi-search"></i>
                    </button>
                  </Field>
                  <ErrorMessage class="invalid-feedback" name="customerCompanyIn" />
                </div>

                <div class="col-md-6 fv-row">
                  <label class="required fs-5 fw-semobold mb-2">{{ $t("vat") }}</label>
                  <Field
                    class="form-control"
                    :class="errors.customerCompanyVatIn ? 'is-invalid' : ''"
                    name="customerCompanyVatIn"
                    :placeholder="$t('enter_text')"
                  />
                  <ErrorMessage class="invalid-feedback" name="customerCompanyVatIn" />
                </div>
              </div>

              <div class="row mb-5">
                <div class="col-md-4 fv-row">
                  <label class="required fs-5 fw-semobold mb-2">{{ $t("street") }}</label>
                  <Field
                    class="form-control"
                    :class="errors.customerAddressStreet ? 'is-invalid' : ''"
                    name="customerAddressStreet"
                    :placeholder="$t('enter_text')"
                  />
                  <ErrorMessage class="invalid-feedback" name="customerAddressStreet" />
                </div>

                <div class="col-md-4 fv-row">
                  <label class="required fs-5 fw-semobold mb-2">{{ $t("city") }}</label>
                  <Field
                    class="form-control"
                    :class="errors.customerAddressCity ? 'is-invalid' : ''"
                    name="customerAddressCity"
                    :placeholder="$t('enter_text')"
                  />
                  <ErrorMessage class="invalid-feedback" name="customerAddressCity" />
                </div>

                <div class="col-md-4 fv-row">
                  <label class="required fs-5 fw-semobold mb-2">{{ $t("zip") }}</label>
                  <Field
                    class="form-control"
                    :class="errors.customerAddressZip ? 'is-invalid' : ''"
                    name="customerAddressZip"
                    :placeholder="$t('enter_text')"
                  />
                  <ErrorMessage class="invalid-feedback" name="customerAddressZip" />
                </div>
              </div>

              <div class="row mb-5">
                <div class="col-md-4 fv-row">
                  <label class="required fs-5 fw-semobold mb-2">{{ $t("contact_person") }}</label>
                  <Field
                    class="form-control"
                    :class="errors.customerContactName ? 'is-invalid' : ''"
                    name="customerContactName"
                    :placeholder="$t('enter_text')"
                  />
                  <ErrorMessage class="invalid-feedback" name="customerContactName" />
                </div>

                <div class="col-md-4 fv-row">
                  <label class="required fs-5 fw-semobold mb-2">{{ $t("contact_phone") }}</label>
                  <Field
                    class="form-control"
                    :class="errors.customerContactPhone ? 'is-invalid' : ''"
                    name="customerContactPhone"
                    :placeholder="$t('enter_phone')"
                  />
                  <ErrorMessage class="invalid-feedback" name="customerContactPhone" />
                </div>

                <div class="col-md-4 fv-row">
                  <label class="required fs-5 fw-semobold mb-2">{{ $t("contact_email") }}</label>
                  <Field
                    class="form-control"
                    :class="errors.customerContactEmail ? 'is-invalid' : ''"
                    name="customerContactEmail"
                    :placeholder="$t('enter_email')"
                  />
                  <ErrorMessage class="invalid-feedback" name="customerContactEmail" />
                </div>
              </div>

              <div class="d-flex flex-column mb-5 fv-row">
                <label class="required fs-5 fw-semobold mb-2">{{ $t("vat_payer") }}</label>
                <div
                  class="d-flex align-items-center gap-4 form-control"
                  :class="errors.customerIsVatPayer ? 'is-invalid' : ''"
                >
                  <div class="form-check form-check-custom form-check-solid gap-2">
                    <label for="customerIsVatPayer" class="me-1">{{ $t("option_yes") }}</label>
                    <Field
                      class="form-check-input"
                      name="customerIsVatPayer"
                      type="radio"
                      :value="1"
                    />
                  </div>

                  <div class="form-check form-check-custom form-check-solid gap-2">
                    <label for="customerIsVatPayer" class="me-1">{{ $t("option_no") }}</label>
                    <Field
                      class="form-check-input"
                      name="customerIsVatPayer"
                      type="radio"
                      :value="0"
                    />
                  </div>
                </div>
                <ErrorMessage class="invalid-feedback" name="customerIsVatPayer" />
              </div>
            </div>
          </div>
          <div class="modal-footer flex-center m-5">
            <button type="reset" class="btn btn-light me-3">{{ $t("btn_discard") }}</button>
            <button type="submit" class="btn btn-primary">{{ $t("btn_confirm") }}</button>
          </div>
        </VForm>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import ApiService from "@/core/services/ApiService";
import BaseAlert from "@/components/BaseAlert.vue";
import { useAlertStore } from "@/stores/alert";
import { useOptionsStore } from "@/stores/options";
import { useRouter } from "vue-router";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";

const emits = defineEmits(["hide-modal"]);

const router = useRouter();
const store = useOptionsStore();
const toast = useToast();

const validationSchema = Yup.object().shape({
  customerCompanyIn: Yup.string().required(),
  customerCompanyVatIn: Yup.string().required(),
  customerName: Yup.string().required().min(3).max(255),
  customerAddressStreet: Yup.string().required().min(3).max(255),
  customerAddressCity: Yup.string().required().min(3).max(255),
  customerAddressZip: Yup.string().required().min(3).max(255),
  customerContactName: Yup.string().required().min(3).max(255),
  customerContactPhone: Yup.string().required().min(9).max(15),
  customerContactEmail: Yup.string().required().email().min(3).max(255),
  customerIsVatPayer: Yup.number().required(),
});

const getAres = async (companyIn: string, setFieldValue: (field: string, value: any) => void) => {
  try {
    const res = await ApiService.query("/ares", {
      params: {
        companyIn,
      },
    });
    const ares = res.data.data.ares;
    setFieldValue("customerCompanyVatIn", ares.companyVatIn);
    setFieldValue("customerAddressStreet", ares.street);
    setFieldValue("customerAddressCity", ares.city);
    setFieldValue("customerAddressZip", ares.zip);
    setFieldValue("customerName", ares.name);
  } catch (error: any) {
    toast.add({
      severity: "error",
      summary: "Chyba",
      detail: error?.response?.data?.message || "Nepodarilo sa načítať údaje z ARES",
      life: 5000,
    });
  }
};

const submit = (values, { resetForm, setErrors }) => {
  ApiService.post("/customers", values)
    .then(async (response) => {
      toast.add({
        severity: "success",
        summary: response.data?.message || "Úspěch",
        detail: "Zákazník byl úspešně vytvořený",
        life: 5000,
      });
      await new Promise((resolve) => setTimeout(resolve, 2000));
      emits("hide-modal");
    })
    .catch(({ response }) => {
      toast.add({
        severity: "error",
        summary: "Chyba",
        detail: response?.data?.message || "Nepodarilo sa vytvoriť zákazníka",
        life: 5000,
      });
      setErrors(response.data.errors);
    });
};
</script>
