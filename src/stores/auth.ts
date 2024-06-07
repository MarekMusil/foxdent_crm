import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import TokenService from "@/core/services/TokenService";
import { useAlertStore } from "./alert";

export interface User {
  name: string;
  email: string;
  id: number;
  roleId: number;
  roleName: string;
}

export const useAuthStore = defineStore("auth", () => {
  const errors = ref({});
  const user = ref<User>({} as User);
  const isAuthenticated = ref(!!TokenService.getToken());
  // holds a token from login to be used in the pin confirmation page (prihlaseni -> prihlaseni-potvrzeni)
  const loginPinToken = ref<string | null>(null);

  const alertStore = useAlertStore();

  function setAuth(payload: { user: User; bearerToken: string }) {
    isAuthenticated.value = true;
    user.value = payload.user;
    errors.value = {};
    TokenService.saveToken(payload.bearerToken);
    localStorage.setItem("user", JSON.stringify(user.value));
  }

  function setError(error: object) {
    alertStore.setAlert(Object.values(error)[0], "danger");
    errors.value = { ...error };
  }

  function purgeAuth() {
    isAuthenticated.value = false;
    user.value = {} as User;
    errors.value = {};
    TokenService.destroyToken();
  }

  function loginPin(userPin: number) {
    return ApiService.post("/accounts/login/app", {
      userPin,
      userId: user.value.id,
      loginToken: loginPinToken.value,
    })
      .then(({ data }) => {
        loginPinToken.value = null;
        setAuth(data.data);
      })
      .catch(({ response }) => {
        setError({
          overeni: response.data.message || "Nastala chyba v ověřování uživatele.",
        });
      });
  }

  function login(credentials: { userEmail: string; userPassword: string }) {
    return ApiService.post("/accounts/check_login/app", credentials)
      .then(({ data }) => {
        // save token to be used in the pin confirmation page (prihlaseni -> prihlaseni-potvrzeni)
        if (data.data?.user?.loginToken && data.data?.user?.id) {
          loginPinToken.value = data.data.user.loginToken;
          user.value.id = data.data.user.id;
        } else {
          setError({ prihlasovani: "Nastala chyba v ověřování uživatele." });
        }
      })
      .catch(({ response }) => {
        setError({
          prihlaseni: response.data.message || "Nastala chyba v ověřování uživatele.",
        });
      });
  }

  function logout() {
    purgeAuth();
  }

  async function forgotPassword(userEmail: string) {
    return ApiService.post("/accounts/passwords/reset", { userEmail })
      .then((response) => {
        alertStore.setAlert(response.data.message, "success");
      })
      .catch(({ response }) => {
        alertStore.setAlert(response.data.message, "danger");
      });
  }

  async function requestNewPassword(payload: object) {
    return ApiService.post("/accounts/passwords/new", payload)
      .then((response) => {
        alertStore.setAlert(response.data.message, "success");
      })
      .catch(({ response }) => {
        alertStore.setAlert(response.data.message, "danger");
      });
  }

  function verifyAuth() {
    if (TokenService.getToken()) {
      ApiService.setHeader();
    } else if (!loginPinToken.value) {
      purgeAuth();
    }
  }

  // set user state from localStorage
  function setUser(hard = false) {
    if (hard || !Object.keys(user.value).length) {
      user.value = JSON.parse(localStorage.getItem("user") || "{}");
    }
  }

  return {
    errors,
    user,
    isAuthenticated,
    loginPinToken,
    login,
    loginPin,
    logout,
    forgotPassword,
    requestNewPassword,
    verifyAuth,
    setUser,
  };
});
