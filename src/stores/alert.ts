import type { AxiosResponse } from "axios";
import { defineStore } from "pinia";
import { computed, reactive } from "vue";

type AlertType = "info" | "danger" | "success" | null;

export const useAlertStore = defineStore("alert", () => {
  const alert = reactive<{
    message: string;
    type: AlertType;
    // normally a message is cleared after route change
    stay: boolean;
  }>({
    message: "",
    type: null,
    stay: false,
  });

  function setAlert(message: string, type: AlertType = null) {
    alert.message = message;
    alert.type = type ?? "info"
  }

  function setAlertByRes(res: AxiosResponse, scroll = true) {
    if (scroll) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setAlert(res.data?.message || "Zpráva se nenačetla", getTypeByCode(res.status));
  }

  function resetAlert(hard = false) {
    if (hard || !alert.stay) {
      alert.message = "";
      alert.type = null;
      alert.stay = false;
    }
  }

  const getTypeByCode = (code) => {
    if (code >= 100 && code <= 199) return "info";
    if (code >= 200 && code <= 299) return "success";
    if (code >= 300 && code <= 499) return "danger";
    return null;
  };

  return {
    alert,
    setAlert,
    setAlertByRes,
    resetAlert,
  };
});
