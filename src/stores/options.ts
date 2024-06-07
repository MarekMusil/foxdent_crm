import ApiService from "@/core/services/ApiService";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export interface MenuItem {
  heading?: string;
  sectionTitle?: string;
  route?: string;
  pages?: Array<MenuItem>;
  keenthemesIcon?: string;
  bootstrapIcon?: string;
  sub?: Array<MenuItem>;
}

interface SystemsOptions {
  [key: string]: any;
  menus: {
    menuLeft: MenuItem[];
    menuTop: MenuItem[];
  };
}

export const useOptionsStore = defineStore("systemOption", () => {
  const options = reactive<SystemsOptions>({} as SystemsOptions);
  const newNotification = ref(false);

  // make request to API only if options was not fetch yet or if hard is true
  function fetchSystemsOptions(hard = false) {
    if (hard || !Object.keys(options).length) {
      return ApiService.get("/systems/options").then(({ data }) => {
        Object.assign(options, data.data);
      });
    }
  }

  return {
    newNotification,
    options,
    fetchSystemsOptions,
  };
});
