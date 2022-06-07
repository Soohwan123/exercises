import { onMounted } from "vue";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      // Home Page
      {
        path: "/",
        name: "home",
        component: () => import("pages/HomePage.vue"),
      },

      // DataUtil
      {
        path: "/datautil",
        name: "datautil",
        component: () => import("components/DataUtil.vue"),
      },

      // Categories
      {
        path: "/categories",
        name: "categories",
        component: () => import("components/CategoryList.vue"),
      },

      //Tray
      {
        path: "/tray",
        name: "tray",
        component: () => import("components/TrayContainer.vue"),
      },

      //Register
      {
        path: "/register",
        name: "register",
        component: () => import("components/RegisterUser.vue"),
      },

      //Login
      {
        path: "/login",
        name: "login",
        component: () => import("components/LoginUser.vue"),
      },

      //Logout
      {
        path: "/logout",
        name: "logout",
        component: () => import("components/LogoutUser.vue"),
      },

      //TrayList
      {
        path: "/traylist",
        name: "traylist",
        component: () => import("components/TrayList.vue"),
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];
export default routes;
