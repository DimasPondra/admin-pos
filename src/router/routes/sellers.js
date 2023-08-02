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
];
