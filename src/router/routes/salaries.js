import AuthMiddleware from "../../middleware/auth";
import AdminMiddleware from "../../middleware/admin";

export default [
    {
        path: "/salaries",
        name: "salary",
        component: () => import("../../views/salaries/Salary.vue"),
        meta: {
            middleware: [AuthMiddleware, AdminMiddleware],
            name_page: "salaries",
            title: "Salary",
        },
    },
    {
        path: "/salaries/create",
        name: "create-salary",
        component: () => import("../../views/salaries/CreateSalary.vue"),
        meta: {
            middleware: [AuthMiddleware, AdminMiddleware],
            name_page: "salaries",
            title: "Create Salary",
        },
    },
    {
        path: "/salaries/:id/edit",
        name: "edit-salary",
        component: () => import("../../views/salaries/EditSalary.vue"),
        meta: {
            middleware: [AuthMiddleware, AdminMiddleware],
            name_page: "salaries",
            title: "Edit Salary",
        },
    },
];
