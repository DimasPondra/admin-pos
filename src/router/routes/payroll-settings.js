import AuthMiddleware from "../../middleware/auth";

export default [
    {
        path: "/payroll-settings",
        name: "payroll-setting",
        component: () => import("../../views/payroll-settings/PayrollSetting.vue"),
        meta: {
            middleware: [AuthMiddleware],
            name_page: "payroll-settings",
            title: "Payroll Setting",
        },
    },
    {
        path: "/payroll-settings/create",
        name: "create-payroll-setting",
        component: () => import("../../views/payroll-settings/CreatePayrollSetting.vue"),
        meta: {
            middleware: [AuthMiddleware],
            name_page: "payroll-settings",
            title: "Create Payroll Setting",
        },
    },
    {
        path: "/payroll-settings/:id/edit",
        name: "edit-payroll-setting",
        component: () => import("../../views/payroll-settings/EditPayrollSetting.vue"),
        meta: {
            middleware: [AuthMiddleware],
            name_page: "payroll-settings",
            title: "Edit Payroll Setting",
        },
    },
];
