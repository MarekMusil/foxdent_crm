import { createApp } from "vue";
import { createPinia } from "pinia";
import { Tooltip } from "bootstrap";
import App from "./App.vue";

/*
TIP: To get started with clean router change path to @/router/clean.ts.
 */
// import router from "./router";
import router from "./router/clean";
import PrimeVue from "primevue/config";
import i18n from "@/core/plugins/i18n";

//imports for app initialization
import ApiService from "@/core/services/ApiService";
import { initApexCharts } from "@/core/plugins/apexcharts";
import { initInlineSvg } from "@/core/plugins/inline-svg";
import { initVeeValidate } from "@/core/plugins/vee-validate";
import { initKtIcon } from "@/core/plugins/keenthemes";
import { initYup } from "./core/plugins/yup";

// primevue
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import primeVueLocale from "@/assets/localization/primevue.json";
// - components

import PrimeEditor from "primevue/editor";
import PrimaMultiSelect from "primevue/multiselect";
import ConfirmationService from "primevue/confirmationservice";
import ToastService from "primevue/toastservice";

// vue-advanced-cropper
import "vue-advanced-cropper/dist/style.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue, {
  locale: primeVueLocale,
});
app.use(ConfirmationService);
app.use(ToastService);

app.component("PrimeEditor", PrimeEditor);
app.component("PrimaMultiSelect", PrimaMultiSelect);

ApiService.init(app);
initApexCharts(app);
initInlineSvg(app);
initKtIcon(app);
initVeeValidate();
initYup();

app.use(i18n);

app.directive("tooltip", (el) => {
  new Tooltip(el);
});

app.mount("#app");
