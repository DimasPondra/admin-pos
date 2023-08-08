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
    {
        path: "/purchases/create",
        name: "create-purchase",
        component: () => import("../../views/purchases/CreatePurchase.vue"),
        meta: {
            middleware: [AuthMiddleware, FinanceMiddleware],
            name_page: "purchases",
            title: "Create Purchase",
        },
    },
    {
        path: "/purchases/:id/edit",
        name: "edit-purchase",
        component: () => import("../../views/purchases/EditPurchase.vue"),
        meta: {
            middleware: [AuthMiddleware, FinanceMiddleware],
            name_page: "purchases",
            title: "Edit Purchase",
        },
    },
];
