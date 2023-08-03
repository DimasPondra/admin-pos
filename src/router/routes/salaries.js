import AuthMiddleware from "../../middleware/auth";

export default [
    {
        path: "/salaries",
        name: "salary",
        component: () => import("../../views/salaries/Salary.vue"),
        meta: {
            middleware: [AuthMiddleware],
        },
    },
    {
        path: "/salaries/create",
        name: "create-salary",
        component: () => import("../../views/salaries/CreateSalary.vue"),
        meta: {
            middleware: [AuthMiddleware],
        },
    },
];
