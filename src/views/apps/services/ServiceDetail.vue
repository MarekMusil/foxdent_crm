<template>
  <div class="flex-lg-row-fluid me-lg-15 order-2 order-lg-1 mb-10 mb-lg-0">
    <div class="card card-flush pt-3 mb-5 mb-lg-10">
      <div class="card-body pt-0 mt-10">
        <VForm
          class="form"
          @submit="submit"
          :validation-schema="validationSchema"
          v-slot="{ errors }"
        >
          <div class="modal-body px-lg-17">
            <div class="scroll-y me-n7 pe-7">
              <BaseAlert />
              <div class="d-flex flex-column mb-5 fv-row">
                <label class="fs-5 fw-semobold mb-2"></label>
                <Field name="items" as="custom">
                  <DynamicItems
                    v-model="itemValues"
                    :hidden-options="['id']"
                    :with-link-for-detail="true"
                    :without-delete-button="true"
                    :options="[
                      {
                        label: 'Pořadí',
                        dataKey: 'rank',
                        type: 'number',
                        width: '100px',
                      },
                      {
                        label: 'Název',
                        dataKey: 'name',
                        type: 'text',
                        width: '500px',
                      },
                      {
                        label: '',
                        dataKey: 'img',
                        type: 'img',
                        width: '50px',
                      },
                      {
                        label: 'Aktivní',
                        dataKey: 'active',
                        type: 'radio',
                        width: '150px',
                      },
                    ]"
                  />
                </Field>
                <ErrorMessage class="invalid-feedback" name="items" />
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
import ApiService from "@/core/services/ApiService";
import { useAlertStore } from "@/stores/alert";
import BaseAlert from "@/components/BaseAlert.vue";
import { onMounted, reactive, ref } from "vue";
import DynamicItems from "@/components/forms/DynamicItems.vue";
import { useOptionsStore } from "@/stores/options";
import { clearAllErrors, setMultipleErrors } from "@/utils/errors";

const store = useOptionsStore();
const alertStore = useAlertStore();

const itemValues = ref<any[]>([]);

const validationSchema = Yup.object().shape({});

const submit = (values, { setErrors }) => {
  ApiService.put(`/texts/services`, {
    items: itemValues.value,
  })
    .then((response) => {
      clearAllErrors(itemValues.value);
      alertStore.setAlertByRes(response);
    })
    .catch(({ response }) => {
      clearAllErrors(itemValues.value);
      const errors = response.data.errors;
      if (errors.items) {
        setMultipleErrors(itemValues.value, errors.items);
      }
      alertStore.setAlertByRes(response);
      setErrors(response.data.errors);
    });
};

onMounted(async () => {
  ApiService.get(`/texts/services`)
    .then(({ data }) => {
      itemValues.value = data.data.records.map((item: any) => ({
        id: item.id,
        name: item.name,
        rank: item.rank,
        link: item.linkForCrm,
        img: item.imgUrl,
        active: item.active.value,

      }));
    })
    .catch(({ response }) => {
      alertStore.setAlertByRes(response);
    });
});
</script>
