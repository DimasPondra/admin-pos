import AuthMiddleware from "../../middleware/auth";

export default [
    {
        path: "/product-types",
        name: "product-type",
        component: () => import("../../views/product-types/ProductType.vue"),
        meta: {
            middleware: [AuthMiddleware],
            name_page: "product-types",
            title: "Product Type",
        },
    },
    {
        path: "/product-types/create",
        name: "create-product-type",
        component: () => import("../../views/product-types/CreateProductType.vue"),
        meta: {
            middleware: [AuthMiddleware],
            name_page: "product-types",
            title: "Create Product Type",
        },
    },
    {
        path: "/product-types/:id/edit",
        name: "edit-product-type",
        component: () => import("../../views/product-types/EditProductType.vue"),
        meta: {
            middleware: [AuthMiddleware],
            name_page: "product-types",
            title: "Edit Product Type",
        },
    },
];
