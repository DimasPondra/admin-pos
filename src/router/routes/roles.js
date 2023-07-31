import AuthMiddleware from "../../middleware/auth";

export default [
    {
        path: "/roles",
        name: "role",
        component: () => import("../../views/roles/Role.vue"),
        meta: {
            middleware: [AuthMiddleware],
        },
    },
    {
        path: "/roles/create",
        name: "create-role",
        component: () => import("../../views/roles/CreateRole.vue"),
        meta: {
            middleware: [AuthMiddleware],
        },
    },
    {
        path: "/roles/:id/edit",
        name: "edit-role",
        component: () => import("../../views/roles/EditRole.vue"),
        meta: {
            middleware: [AuthMiddleware],
        },
    },
];