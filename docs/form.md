# Návod na výrobu formulářů

Ukázka základního rozložení a jednotlivých input groups, včetně custom inputů.

## Lokalizace

Pokud budete chtít přidat "lokalizeční proměnou", zaleží jestli ji budete přidávat jako text do elementu nebo do atributu elementu

### Text do elemetnu

```html
<!-- formát -->
<element>{{ $t("name") }}</element>
<!-- příklad -->
<button>{{ $t("btn_confirm") }}</button>
```

### Text do atributu elementu

```html
<!-- formát -->
<element :atribut="$t('name')">text</element>
<!-- příklad -->
<input type="text" :placeholder="$t('enter_text')" />
```

## Základní rozložení

Zde je akorát potřeba změnit Název formuláře

```html
<div class="flex-lg-row-fluid me-lg-15 order-2 order-lg-1 mb-10 mb-lg-0">
  <div class="card card-flush pt-3 mb-5 mb-lg-10">
    <div class="card-header">
      <div class="card-title">
        <h2 class="fw-bold">Název formuláře</h2>
      </div>
    </div>
    <div class="card-body pt-0">
      <VForm
        class="form"
        @submit="submit"
        :validation-schema="validationSchema"
        v-slot="{ errors }"
      >
        <div class="modal-body px-lg-17">
          <div class="scroll-y me-n7 pe-7">
            <!-- Zde jdou jednotlivé input groups -->
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
```

## Input groups

První rozdělujeme jestli je jeden nebo více inputů na řádek.

Jeden input na jeden řádek

```html
<div class="d-flex flex-column mb-5 fv-row">
  <!-- přiřadit třídu required, pouze pokud je input vyžadovaný -->
  <label class="required fs-5 fw-semobold mb-2">{{ $t("payment_type") }}</label>
  <Field
    class="form-control"
    :class="errors.paymentMethodId ? 'is-invalid' : ''"
    name="paymentMethodId"
  />
  <ErrorMessage class="invalid-feedback" name="paymentMethodId" />
</div>
```

Dva (a více inputů) na jeden řádek.

```html
<div class="row mb-5">
  <div class="col-md-6 fv-row">
    <label class="required fs-5 fw-semobold mb-2">{{ $t("const_number") }}</label>
    <Field
      class="form-control"
      :class="errors.constNumber ? 'is-invalid' : ''"
      type="number"
      name="constNumber"
    />
    <ErrorMessage class="invalid-feedback" name="constNumber" />
  </div>

  <div class="col-md-6 fv-row">
    <label class="required fs-5 fw-semobold mb-2">{{ $t("spec_number") }}</label>
    <Field
      class="form-control"
      :class="errors.specNumber ? 'is-invalid' : ''"
      type="number"
      name="specNumber"
    />
    <ErrorMessage class="invalid-feedback" name="specNumber" />
  </div>
</div>
```

### Normal input groups

#### select

```html
<div class="d-flex flex-column mb-5 fv-row">
  <label class="required fs-5 fw-semobold mb-2">{{ $t("item_type") }}</label>
  <Field
    name="cardTypeId"
    class="form-select"
    :class="errors.cardTypeId ? 'is-invalid' : ''"
    as="select"
  >
    <option value="" disabled>{{ $t("choose_option") }}</option>
    <option v-for="item in store.options.productTypes" :key="item.id" :value="item.id">
      {{ item.name }}
    </option>
  </Field>
  <ErrorMessage class="invalid-feedback" name="cardTypeId" />
</div>
```

#### radio

```html
<div class="d-flex flex-column mb-5 fv-row">
  <label class="required fs-5 fw-semobold mb-2">{{ $t("vat_payer") }}</label>
  <div
    class="d-flex align-items-center gap-4 form-control"
    :class="errors.customerIsVatPayer ? 'is-invalid' : ''"
  >
    <div class="form-check form-check-custom form-check-solid gap-2">
      <label for="customerIsVatPayer" class="me-1">{{ $t("option_yes") }}</label>
      <Field class="form-check-input" name="customerIsVatPayer" type="radio" :value="1" />
    </div>
    <div class="form-check form-check-custom form-check-solid gap-2">
      <label for="customerIsVatPayer" class="me-1">{{ $t("option_no") }}</label>
      <Field class="form-check-input" name="customerIsVatPayer" type="radio" :value="0" />
    </div>
  </div>
  <ErrorMessage class="invalid-feedback" name="customerIsVatPayer" />
</div>
```

### Speciální input groups

#### date

```html
<div class="d-flex flex-column mb-5 fv-row">
  <label class="required fs-5 fw-semobold mb-2">{{ $t("date_zp") }}</label>
  <Field
    :class="errors.date ? 'is-invalid' : ''"
    name="date"
    v-slot="{ handleChange, value }"
    as="custom"
  >
    <FormDate
      :class="errors.date ? 'p-invalid' : ''"
      :modelValue="value"
      @update:modelValue="handleChange"
    />
  </Field>
  <ErrorMessage class="invalid-feedback" name="date" />
</div>
```

#### time

```html
<div class="d-flex flex-column mb-5 fv-row">
  <label class="required fs-5 fw-semobold mb-2">{{ $t("time") }}</label>
  <Field
    :class="errors.taskTime ? 'is-invalid' : ''"
    name="taskTime"
    v-slot="{ handleChange, value }"
    as="custom"
  >
    <FormTime
      :class="errors.taskTime ? 'p-invalid' : ''"
      :modelValue="value"
      @update:modelValue="handleChange"
    />
  </Field>
  <ErrorMessage class="invalid-feedback" name="taskTime" />
</div>
```

#### Text editor

```html
<div class="d-flex flex-column mb-5 fv-row">
  <label class="fs-5 fw-semobold mb-2">{{ $t("note") }}</label>
  <Field
    :class="errors.payDays ? 'is-invalid' : ''"
    name="description"
    v-slot="{ handleChange, value }"
    as="custom"
  >
    <TextEditor
      :modelValue="value"
      :class="errors.taskTime ? 'p-invalid' : ''"
      @update:modelValue="handleChange"
    />
  </Field>
  <ErrorMessage class="invalid-feedback" name="description" />
</div>
```

#### Multi select

```html
<div class="d-flex flex-column mb-5 fv-row">
  <label class="required fs-5 fw-semobold mb-2">{{ $t("users") }}</label>
  <Field
    name="taskUsersId"
    v-slot="{ handleChange, value }"
    :class="errors.taskUsersId ? 'is-invalid' : ''"
    as="custom"
  >
    <FormMultiSelect
      :modelValue="value"
      @update:modelValue="handleChange"
      :class="errors.taskUsersId ? 'p-invalid' : ''"
      :options="store.options.users"
    />
  </Field>
  <ErrorMessage class="invalid-feedback" name="taskUsersId" />
</div>
```
