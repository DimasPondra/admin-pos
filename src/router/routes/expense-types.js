import AuthMiddleware from "../../middleware/auth";

export default [
    {
        path: "/expense-types",
        name: "expense-type",
        component: () => import("../../views/expense-types/ExpenseType.vue"),
        meta: {
            middleware: [AuthMiddleware],
        },
    },
    {
        path: "/expense-types/create",
        name: "create-expense-type",
        component: () => import("../../views/expense-types/CreateExpenseType.vue"),
        meta: {
            middleware: [AuthMiddleware],
        },
    },
    {
        path: "/expense-types/:id/edit",
        name: "edit-expense-type",
        component: () => import("../../views/expense-types/EditExpenseType.vue"),
        meta: {
            middleware: [AuthMiddleware],
        },
    },
];
