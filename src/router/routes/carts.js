import AuthMiddleware from "../../middleware/auth";
import CashierMiddleware from "../../middleware/cashier";

export default [
    {
        path: "/carts",
        name: "cart",
        component: () => import("../../views/carts/Cart.vue"),
        meta: {
            middleware: [AuthMiddleware, CashierMiddleware],
            name_page: "carts",
            title: "Cart",
        },
    },
    {
        path: "/carts/create",
        name: "create-cart",
        component: () => import("../../views/carts/CreateCart.vue"),
        meta: {
            middleware: [AuthMiddleware, CashierMiddleware],
            name_page: "carts",
            title: "Create Cart",
        },
    },
    {
        path: "/carts/:id/edit",
        name: "edit-cart",
        component: () => import("../../views/carts/EditCart.vue"),
        meta: {
            middleware: [AuthMiddleware, CashierMiddleware],
            name_page: "carts",
            title: "Edit Cart",
        },
    },
];
