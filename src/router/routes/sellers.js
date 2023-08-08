import AuthMiddleware from "../../middleware/auth";
import AdminMiddleware from "../../middleware/admin";

export default [
    {
        path: "/sellers",
        name: "seller",
        component: () => import("../../views/sellers/Seller.vue"),
        meta: {
            middleware: [AuthMiddleware, AdminMiddleware],
            name_page: "sellers",
            title: "Seller",
        },
    },
    {
        path: "/sellers/create",
        name: "create-seller",
        component: () => import("../../views/sellers/CreateSeller.vue"),
        meta: {
            middleware: [AuthMiddleware, AdminMiddleware],
            name_page: "sellers",
            title: "Create Seller",
        },
    },
    {
        path: "/sellers/:id/edit",
        name: "edit-seller",
        component: () => import("../../views/sellers/EditSeller.vue"),
        meta: {
            middleware: [AuthMiddleware, AdminMiddleware],
            name_page: "sellers",
            title: "Edit Seller",
        },
    },
];
