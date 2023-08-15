import AuthMiddleware from "../../middleware/auth";
import AdminMiddleware from "../../middleware/admin";

export default [
    {
        path: "/transactions",
        name: "transaction",
        component: () => import("../../views/transactions/Transaction.vue"),
        meta: {
            middleware: [AuthMiddleware, AdminMiddleware],
            name_page: "transactions",
            title: "Transaction",
        },
    },
    {
        path: "/transactions/:id/show",
        name: "show-transaction",
        component: () => import("../../views/transactions/ShowTransaction.vue"),
        meta: {
            middleware: [AuthMiddleware, AdminMiddleware],
            name_page: "transactions",
            title: "Show Transaction",
        },
    },
];
