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
import Purchase from "./routes/purchases";
import Payroll from "./routes/payrolls";

import VueRouteMiddleware from "vue-route-middleware";
import AuthMiddleware from "../middleware/auth";
import GuestMiddleware from "../middleware/guest";
import AdminMiddleware from "../middleware/admin";

const router = createRouter({
    scrollBehavior(to, from, savedPosition) {
        return { top: 0 };
    },
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("../views/Home.vue"),
            meta: {
                middleware: [AuthMiddleware, AdminMiddleware],
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
                name_page: "login",
                title: "Login",
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
        ...Purchase,
        ...Payroll,
    ],
});

router.beforeEach(VueRouteMiddleware());
export default router;
