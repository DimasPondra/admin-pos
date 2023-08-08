import AuthMiddleware from "../../middleware/auth";
import FinanceMiddleware from "../../middleware/finance";

export default [
    {
        path: "/payrolls",
        name: "payroll",
        component: () => import("../../views/payrolls/Payroll.vue"),
        meta: {
            middleware: [AuthMiddleware, FinanceMiddleware],
            name_page: "payrolls",
            title: "Payroll",
        },
    },
    {
        path: "/payrolls/:id/edit",
        name: "edit-payroll",
        component: () => import("../../views/payrolls/EditPayroll.vue"),
        meta: {
            middleware: [AuthMiddleware, FinanceMiddleware],
            name_page: "payrolls",
            title: "Edit Payroll",
        },
    },
];
