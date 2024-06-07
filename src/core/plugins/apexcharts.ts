import type { App } from "vue";
import VueApexCharts from "vue3-apexcharts";
import apexchartsVueLocale from "@/assets/localization/apexcharts.json";
import type { ApexOptions } from "apexcharts";

/**
 * Initialize VueApexChart component
 * @param app vue instance
 */

declare global {
  interface Window {
    Apex: ApexOptions;
  }
}

export function initApexCharts(app: App<Element>) {
  app.use(VueApexCharts, {});
  window.Apex.chart = {
    locales: [apexchartsVueLocale],
    defaultLocale: "cz",
  };
}
