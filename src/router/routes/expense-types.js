import AuthMiddleware from "../../middleware/auth";
import AdminMiddleware from "../../middleware/admin";

export default [
    {
        path: "/expense-types",
        name: "expense-type",
        component: () => import("../../views/expense-types/ExpenseType.vue"),
        meta: {
            middleware: [AuthMiddleware, AdminMiddleware],
            name_page: "expense-types",
            title: "Expense Type",
        },
    },
    {
        path: "/expense-types/create",
        name: "create-expense-type",
        component: () => import("../../views/expense-types/CreateExpenseType.vue"),
        meta: {
            middleware: [AuthMiddleware, AdminMiddleware],
            name_page: "expense-types",
            title: "Create Expense Type",
        },
    },
    {
        path: "/expense-types/:id/edit",
        name: "edit-expense-type",
        component: () => import("../../views/expense-types/EditExpenseType.vue"),
        meta: {
            middleware: [AuthMiddleware, AdminMiddleware],
            name_page: "expense-types",
            title: "Edit Expense Type",
        },
    },
];
