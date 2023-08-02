import AuthMiddleware from "../../middleware/auth";

export default [
    {
        path: "/sellers",
        name: "seller",
        component: () => import("../../views/sellers/Seller.vue"),
        meta: {
            middleware: [AuthMiddleware],
        },
    },
    {
        path: "/sellers/create",
        name: "create-seller",
        component: () => import("../../views/sellers/CreateSeller.vue"),
        meta: {
            middleware: [AuthMiddleware],
        },
    },
];
