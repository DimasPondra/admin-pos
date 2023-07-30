import { createRouter, createWebHistory } from "vue-router";

import VueRouteMiddleware from "vue-route-middleware";
import AuthMiddleware from "../middleware/auth";
import GuestMiddleware from "../middleware/guest";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("../views/Home.vue"),
            meta: {
                middleware: [AuthMiddleware],
            },
        },
        {
            path: "/login",
            name: "login",
            component: () => import("../views/Login.vue"),
            meta: {
                middleware: [GuestMiddleware],
            },
        },
    ],
});

router.beforeEach(VueRouteMiddleware());
export default router;
