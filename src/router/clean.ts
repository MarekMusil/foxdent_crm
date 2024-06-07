import { createRouter, createWebHashHistory, type RouteRecordRaw } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useConfigStore } from "@/stores/config";
import { useOptionsStore } from "@/stores/options";
import { useAlertStore } from "@/stores/alert";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/employees",
    component: () => import("@/layouts/main-layout/MainLayout.vue"),
    meta: {
      middleware: "auth",
    },
    children: [
      {
        path: "/employees",
        name: "employees",
        component: () => import("@/views/apps/employees/EmployeeList.vue"),
        meta: {
          pageTitle: "employees",
          breadcrumbs: ["Dashboards"],
        },
      },

      /**
       * Account
       */

      {
        path: "/account",
        name: "account",
        component: () => import("@/views/crafted/account/Account.vue"),
        meta: {
          breadcrumbs: ["Účet"],
        },
        children: [
          {
            path: "overview",
            name: "account-overview",
            component: () => import("@/views/crafted/account/Overview.vue"),
            meta: {
              pageTitle: "Overview",
            },
          },
          {
            path: "settings",
            name: "account-settings",
            component: () => import("@/views/crafted/account/Settings.vue"),
            meta: {
              pageTitle: "Settings",
            },
          },
        ],
      },

      /**
       *
       * Modules
       *
       */
      // Users
      {
        path: "/settings/users",
        name: "users",
        component: () => import("@/views/apps/users/UsersList.vue"),
        meta: {
          pageTitle: "Seznam uživatelů",
          breadcrumbs: ["Uživatelé", "Seznam"],
        },
      },
      {
        path: "/settings/users/create",
        name: "users-create",
        component: () => import("@/views/apps/users/UsersCreate.vue"),
        meta: {
          pageTitle: "Nový uživatel",
          breadcrumbs: ["Uživatelé", "Nový"],
        },
      },
      {
        path: "/settings/users/:id",
        name: "users-detail",
        component: () => import("@/views/apps/users/UsersDetail.vue"),
        meta: {
          pageTitle: "Detail uživatele",
          breadcrumbs: ["Uživatelé", "Detail"],
        },
      },
      // EMPLOYEES
      {
        path: "/employees",
        name: "employees",
        component: () => import("@/views/apps/employees/EmployeeList.vue"),
        meta: {
          pageTitle: "Seznam zaměstnanců",
          breadcrumbs: ["Zaměstnanci", "Seznam"],
        },
      },
      {
        path: "employees/create",
        name: "employees-create",
        component: () => import("@/views/apps/employees/EmployeeCreate.vue"),
        meta: {
          pageTitle: "Nový zaměstnanec",
          breadcrumbs: ["Zaměstnanci", "Nové"],
        },
      },
      {
        path: "employees/:id",
        name: "employees-detail",
        component: () => import("@/views/apps/employees/EmployeeDetail.vue"),
        meta: {
          pageTitle: "Detail zaměstnance",
          breadcrumbs: ["Zaměstnanci", "Detail"],
        },
      },
      // SLIDES
      {
        path: "/slides",
        name: "slides",
        component: () => import("@/views/apps/slides/SlideList.vue"),
        meta: {
          pageTitle: "Seznam stránek prezentace",
          breadcrumbs: ["Prezentace", "Seznam"],
        },
      },
      {
        path: "slides/create",
        name: "slides-create",
        component: () => import("@/views/apps/slides/SlideCreate.vue"),
        meta: {
          pageTitle: "Nová stránka prezentace",
          breadcrumbs: ["Prezentace", "Nový"],
        },
      },
      {
        path: "slides/:id",
        name: "slides-detail",
        component: () => import("@/views/apps/slides/SlideDetail.vue"),
        meta: {
          pageTitle: "Detail stránky prezentace",
          breadcrumbs: ["Prezentace", "Detail"],
        },
      },
      // PRICELISTS
      {
        path: "/pricelists",
        name: "pricelists",
        component: () => import("@/views/apps/pricelists/PricelistDetail.vue"),
        meta: {
          pageTitle: "Ceník",
          breadcrumbs: ["Ceník", "Seznam"],
        },
      },
      // PRICELISTS
      {
        path: "/services",
        name: "services",
        component: () => import("@/views/apps/services/ServiceDetail.vue"),
        meta: {
          pageTitle: "Služby",
          breadcrumbs: ["Služby", "Seznam"],
        },
      },
      // PRICELISTS
      {
        path: "/technologies",
        name: "technologies",
        component: () => import("@/views/apps/technologies/TechnologyDetail.vue"),
        meta: {
          pageTitle: "Technologie",
          breadcrumbs: ["Technologie", "Seznam"],
        },
      },
      // RATINGS
      {
        path: "/ratings",
        name: "ratings",
        component: () => import("@/views/apps/ratings/RatingDetail.vue"),
        meta: {
          pageTitle: "Reference",
          breadcrumbs: ["Reference", "Seznam"],
        },
      },
      // TEXTS
      {
        path: "/texts",
        name: "texts",
        component: () => import("@/views/apps/texts/TextList.vue"),
        meta: {
          pageTitle: "Seznam textů",
          breadcrumbs: ["Texty", "Seznam"],
        },
      },
      {
        path: "texts/create",
        name: "texts-create",
        component: () => import("@/views/apps/texts/TextCreate.vue"),
        meta: {
          pageTitle: "Nový text",
          breadcrumbs: ["Texty", "Nové"],
        },
      },
      {
        path: "texts/:id",
        name: "texts-detail",
        component: () => import("@/views/apps/texts/TextDetail.vue"),
        meta: {
          pageTitle: "Detail textu",
          breadcrumbs: ["Texty", "Detail"],
        },
      },
      //SETTINGS
      // CONTACT
      {
        path: "/settings/contact",
        name: "contact",
        component: () => import("@/views/apps/contact/ContactDetail.vue"),
        meta: {
          pageTitle: "Kontakt",
          breadcrumbs: ["Kontakt", "Detail"],
        },
      },
      {
        path: "/settings/insurances",
        name: "insurances",
        component: () => import("@/views/apps/insurance/InsuranceDetail.vue"),
        meta: {
          pageTitle: "Pojišťovny",
          breadcrumbs: ["Pojišťovny", "Seznam"],
        },
      },
      ],
  },

  /**
   * Auth routes
   */
  {
    path: "/accounts",
    component: () => import("@/layouts/AuthLayout.vue"),
    children: [
      {
        path: "/accounts/login",
        name: "accounts-login",
        component: () => import("@/views/crafted/authentication/basic-flow/SignIn.vue"),
        meta: {
          pageTitle: "Přihlášení",
        },
      },
      {
        path: "/accounts/passwords/reset",
        name: "accounts-passwords-reset",
        component: () => import("@/views/crafted/authentication/basic-flow/PasswordReset.vue"),
        meta: {
          pageTitle: "Reset hesla",
        },
      },
      {
        path: "/accounts/login-confirmation",
        name: "accounts-login-confirmation",
        component: () => import("@/views/crafted/authentication/basic-flow/SignInConfirmation.vue"),
        meta: {
          pageTitle: "Potvrzení přihlášení",
        },
      },
      {
        path: "/accounts/passwords/new",
        name: "accounts-passwords-new",
        component: () => import("@/views/crafted/authentication/basic-flow/PasswordNew.vue"),
        meta: {
          pageTitle: "Nové heslo",
        },
      },
      {
        path: "/accounts/activate",
        name: "accounts-activate",
        component: () => import("@/views/crafted/authentication/basic-flow/Activate.vue"),
        meta: {
          pageTitle: "Aktivace",
        },
      },
    ],
  },

  /**
   * services
   */

  {
    path: "/",
    children: [
      {
        path: "services/link",
        name: "services-link",
        component: () => import("@/views/services/link.vue"),
        meta: {
          pageTitle: "Načítání...",
        },
      },
    ],
  },

  /**
   * Error pages
   */
  {
    path: "/",
    component: () => import("@/layouts/SystemLayout.vue"),
    children: [
      {
        // the 404 route, when none of the above matches
        path: "/404",
        name: "404",
        component: () => import("@/views/crafted/authentication/Error404.vue"),
        meta: {
          pageTitle: "Error 404",
        },
      },
      {
        path: "/500",
        name: "500",
        component: () => import("@/views/crafted/authentication/Error500.vue"),
        meta: {
          pageTitle: "Error 500",
        },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const configStore = useConfigStore();
  const alertStore = useAlertStore();

  // current page view title
  document.title = `${to.meta.pageTitle} - ${import.meta.env.VITE_APP_NAME}`;

  // reset config to initial state
  configStore.resetLayoutConfig();

  // reset alerts
  alertStore.resetAlert();

  // verify auth token before each page change
  authStore.verifyAuth();

  // before page access check if page requires authentication
  if (to.meta.middleware == "auth") {
    // uncomment this if you want to disable middleware for pages that require auth
    if (authStore.isAuthenticated) {
      authStore.setUser();
      await useOptionsStore().fetchSystemsOptions();
      next();
    } else {
      next("/accounts/login");
    }
  } else {
    next();
  }

  // Scroll page to top on every route change
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

export default router;
