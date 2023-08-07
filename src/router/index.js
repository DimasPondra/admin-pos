import { createRouter, createWebHistory } from "vue-router";

import Role from "./routes/roles";
import ProductType from "./routes/product-types";
import User from "./routes/users";
import Product from "./routes/products";
import Seller from "./routes/sellers";
import Salary from "./routes/salaries";
import ExpenseType from "./routes/expense-types";
import UnitType from "./routes/unit-types";
import PayrollSetting from "./routes/payroll-settings";

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
                name_page: "dashboard",
                title: "Dashboard",
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
        ...Role,
        ...ProductType,
        ...User,
        ...Product,
        ...Seller,
        ...Salary,
        ...ExpenseType,
        ...UnitType,
        ...PayrollSetting,
    ],
});

router.beforeEach(VueRouteMiddleware());
export default router;
