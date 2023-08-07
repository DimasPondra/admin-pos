import AuthMiddleware from "../../middleware/auth";

export default [
    {
        path: "/payroll-settings",
        name: "payroll-setting",
        component: () => import("../../views/payroll-settings/PayrollSetting.vue"),
        meta: {
            middleware: [AuthMiddleware],
        },
    },
    {
        path: "/payroll-settings/create",
        name: "create-payroll-setting",
        component: () => import("../../views/payroll-settings/CreatePayrollSetting.vue"),
        meta: {
            middleware: [AuthMiddleware],
        },
    },
    {
        path: "/payroll-settings/:id/edit",
        name: "edit-payroll-setting",
        component: () => import("../../views/payroll-settings/EditPayrollSetting.vue"),
        meta: {
            middleware: [AuthMiddleware],
        },
    },
];
