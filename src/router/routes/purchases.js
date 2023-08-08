import AuthMiddleware from "../../middleware/auth";
import FinanceMiddleware from "../../middleware/finance";

export default [
    {
        path: "/purchases",
        name: "purchase",
        component: () => import("../../views/purchases/Purchase.vue"),
        meta: {
            middleware: [AuthMiddleware, FinanceMiddleware],
            name_page: "purchases",
            title: "Purchase",
        },
    },
    // {
    //     path: "/expense-types/create",
    //     name: "create-expense-type",
    //     component: () => import("../../views/expense-types/CreateExpenseType.vue"),
    //     meta: {
    //         middleware: [AuthMiddleware],
    //         name_page: "expense-types",
    //         title: "Create Expense Type",
    //     },
    // },
    // {
    //     path: "/expense-types/:id/edit",
    //     name: "edit-expense-type",
    //     component: () => import("../../views/expense-types/EditExpenseType.vue"),
    //     meta: {
    //         middleware: [AuthMiddleware],
    //         name_page: "expense-types",
    //         title: "Edit Expense Type",
    //     },
    // },
];
