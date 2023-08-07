import AuthMiddleware from "../../middleware/auth";

export default [
    {
        path: "/products",
        name: "product",
        component: () => import("../../views/products/Product.vue"),
        meta: {
            middleware: [AuthMiddleware],
            name_page: "products",
            title: "Product",
        },
    },
    {
        path: "/products/create",
        name: "create-product",
        component: () => import("../../views/products/CreateProduct.vue"),
        meta: {
            middleware: [AuthMiddleware],
            name_page: "products",
            title: "Create Product",
        },
    },
    {
        path: "/products/:id/edit",
        name: "edit-product",
        component: () => import("../../views/products/EditProduct.vue"),
        meta: {
            middleware: [AuthMiddleware],
            name_page: "products",
            title: "Edit Product",
        },
    },
];
