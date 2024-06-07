<script lang="ts" setup>
import type { AutoCompleteCompleteEvent, AutoCompleteItemSelectEvent } from "primevue/autocomplete";
import FormDate from "./FormDate.vue";
import PrimeAutocomplete from "primevue/autocomplete";

type Item = {
  suggestions?: any[];
  [key: string]: any;
};

const props = defineProps<{
  modelValue: {
    cssClass?: string;
    [key: string]: any;
    disabled?: Record<string, boolean>;
    errors: Record<string, string>;
  }[];
  optionsDisabled?: boolean; // disable the add and remove buttons
  options: {
    label: string;
    dataKey: string;
    width?: number;
    type?:
      | "text"
      | "number"
      | "password"
      | "select"
      | "radio"
      | "autocomplete"
      | "date"
      | "time"
      | "span"
      | "img";
    selectOptions?: { id: number; name: string }[];
    callback?: (event: AutoCompleteCompleteEvent, index: number, ...arg: any[]) => void; // It's for the autocomplete
    itemSelect?: (event: AutoCompleteItemSelectEvent, index: number, ...arg: any[]) => void; // It's for the autocomplete
  }[];
  hiddenOptions?: string[]; // contains the dataKey of the hidden options
  withLinkForDetail?: boolean;
  withoutDeleteButton?: boolean;
}>();

const emit = defineEmits(["update:modelValue", "itemAdded", "itemRemoved"]);

const addItem = () => {
  const newItem: Item = props.options.reduce(
    (acc: Item, option) => {
      if (option.type === "autocomplete") {
        acc.suggestions = [];
      }
      if (option.type === "radio") {
        acc[option.dataKey] = 0;
      } else {
        acc[option.dataKey] = "";
      }
      return acc;
    },
    { errors: {} }
  );

  props.hiddenOptions?.forEach((option) => {
    newItem[option] = "";
  });
  emit("update:modelValue", [...props.modelValue, newItem]);
  emit("itemAdded");
};

const removeItem = (index: number) => {
  const items = [...props.modelValue];
  items.splice(index, 1);
  emit("update:modelValue", items);
  emit("itemRemoved");
};

const handleInput = (event: any, itemIndex, key) => {
  // Clone the modelValue array
  const updatedItems = [...props.modelValue];

  // Update the value in the cloned array
  // if the caller is an input
  if (event?.target) {
    updatedItems[itemIndex][key] = event.target.value ?? "";
    // if the caller is an autocomplete
    // TODO: the parameter should be checked dynamically
  } else if (event?.name && event?.id) {
    updatedItems[itemIndex][key] = event.name;
  } else if (typeof event !== "object" || !isNaN(Date.parse(event))) {
    updatedItems[itemIndex][key] = event;
  } else {
    updatedItems[itemIndex][key] = "";
  }

  // Emit the updated array to the parent
  emit("update:modelValue", updatedItems);
};

const getBorderColor = (index: number, colIndex: number) => {
  return {
    borderLeft:
      colIndex === 0 && props.modelValue[index]?.cssClass
        ? `5px var(--bs-border-style) var(--bs-${props.modelValue[index].cssClass}) !important`
        : "",
  };
};

// computed property to get error message from the error object in the modelValue
const getError = (index: number, key: string): string | undefined => {
  return props.modelValue[index]?.errors?.[key];
};
</script>

<template>
  <div class="form-group">
    <table v-show="modelValue?.length" class="mx-auto">
      <thead>
        <tr>
          <th v-for="(option, index) in options" :key="index" class="pb-2">
            {{ option.label }}
          </th>
          <th v-if="!optionsDisabled" class="text-end px-2">Možnosti</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in modelValue">
          <td
            v-for="(option, colI) in options"
            :key="colI"
            class="pb-2 px-1"
            :width="option.width"
            :style="getBorderColor(index, colI)"
          >
            <input
              v-if="option.type === 'text' || !option.type"
              :id="option.dataKey + '-' + index"
              class="form-control"
              type="text"
              :name="option.dataKey"
              :value="item[option.dataKey]"
              @input="handleInput($event, index, option.dataKey)"
              :disabled="item.disabled?.[option.dataKey]"
              :class="{ 'is-invalid': getError(index, option.dataKey) }"
            />
            <span v-else-if="option.type === 'span'">
              {{ item[option.dataKey] }}
            </span>
            <input
              v-else-if="option.type === 'number'"
              :id="option.dataKey + '-' + index"
              class="form-control"
              type="number"
              :name="option.dataKey"
              :value="item[option.dataKey]"
              @input="handleInput($event, index, option.dataKey)"
              :disabled="item.disabled?.[option.dataKey]"
              :class="{ 'is-invalid': getError(index, option.dataKey) }"
            />
            <input
              v-else-if="option.type === 'password'"
              :id="option.dataKey + '-' + index"
              class="form-control"
              type="password"
              :name="option.dataKey"
              :value="item[option.dataKey]"
              @input="handleInput($event, index, option.dataKey)"
              :disabled="item.disabled?.[option.dataKey]"
              :class="{ 'is-invalid': getError(index, option.dataKey) }"
            />
            <img
              v-else-if="option.type === 'img'"
              :id="option.dataKey + '-' + index"
              :name="option.dataKey"
              :src="item[option.dataKey]"
              @input="handleInput($event, index, option.dataKey)"
              :disabled="item.disabled?.[option.dataKey]"
              :class="{ 'is-invalid': getError(index, option.dataKey) }"
              height="45"
            />
            <select
              v-else-if="option.type === 'select'"
              :id="option.dataKey + '-' + index"
              class="form-control"
              :name="option.dataKey"
              :value="item[option.dataKey]"
              @input="handleInput($event, index, option.dataKey)"
              :disabled="item.disabled?.[option.dataKey]"
              :class="{ 'is-invalid': getError(index, option.dataKey) }"
            >
              <option value="" disabled>{{ $t("choose_option_short") }}</option>
              <option
                v-for="(selectOption, index) in option.selectOptions"
                :key="index"
                :value="selectOption.id"
              >
                {{ selectOption.name }}
              </option>
            </select>
            <div
              v-else-if="option.type === 'radio'"
              class="d-flex align-items-center gap-4 form-control"
              :class="{ 'is-invalid': getError(index, option.dataKey) }"
            >
              <div class="form-check form-check-custom form-check-solid gap-2">
                <label for="customerIsVatPayer" class="me-1">{{ $t("option_yes") }}</label>
                <input
                  :id="option.dataKey + '-' + index"
                  class="form-check-input"
                  type="radio"
                  :value="1"
                  :checked="item[option.dataKey] == 1"
                  @input="handleInput($event, index, option.dataKey)"
                  :disabled="item.disabled?.[option.dataKey]"
                />
              </div>
              <div class="form-check form-check-custom form-check-solid gap-2">
                <label for="customerIsVatPayer" class="me-1">{{ $t("option_no") }}</label>
                <input
                  :id="option.dataKey + '-' + index"
                  class="form-check-input"
                  type="radio"
                  :value="0"
                  :checked="item[option.dataKey] == 0"
                  @input="handleInput($event, index, option.dataKey)"
                  :disabled="item.disabled?.[option.dataKey]"
                />
              </div>
            </div>
            <PrimeAutocomplete
              v-else-if="option.type === 'autocomplete'"
              :id="option.dataKey + '-' + index"
              :modelValue="item[option.dataKey]"
              @update:modelValue="handleInput($event, index, option.dataKey)"
              :suggestions="modelValue[index].suggestions"
              :optionLabel="option.dataKey"
              :disabled="item.disabled?.[option.dataKey]"
              :class="{ 'p-invalid': getError(index, option.dataKey) }"
              @complete="option.callback?.($event, index)"
              @item-select="option.itemSelect?.($event, index)"
            />
            <FormDate
              v-else-if="option.type === 'date'"
              :id="option.dataKey + '-' + index"
              :modelValue="item[option.dataKey]"
              @update:modelValue="handleInput($event, index, option.dataKey)"
              :disabled="item.disabled?.[option.dataKey]"
              :class="{ 'p-invalid': getError(index, option.dataKey) }"
            />
            <span class="alert-danger">{{ getError(index, option.dataKey) }}</span>
          </td>
          <td v-if="!optionsDisabled" class="d-flex justify-content-end gap-2 pb-2 ps-20">
            <router-link 
              v-if="withLinkForDetail && props.modelValue[index]?.link" 
              class="cursor-pointer btn btn-light" 
              :to="props.modelValue[index].link"
            >
            Upravit text
            </router-link>
            <a class="cursor-pointer btn btn-success mr-2" @click="addItem">
              <i class="bi bi-plus fs-1"></i>
            </a>
            <a v-if="!withoutDeleteButton" class="cursor-pointer btn btn-danger" @click="removeItem(index)">
              <i class="bi bi-trash fs-3"></i>
            </a>
          </td>
          <td v-else class="d-flex justify-content-end gap-2 pb-2 ps-20">
            <router-link 
              v-if="withLinkForDetail && props.modelValue[index]?.link" 
              class="cursor-pointer btn btn-light" 
              :to="props.modelValue[index].link"
            >
            Upravit text
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="!optionsDisabled" class="text-center">
      <a class="cursor-pointer text-success" @click="addItem">
        <i class="bi bi-plus text-success" style="font-size: 3rem"></i>
      </a>
    </div>
  </div>
</template>

<style>
.p-autocomplete.p-disabled {
  opacity: 0.95 !important;
}

.p-autocomplete-input:disabled {
  opacity: 0.95 !important;
}
</style>
