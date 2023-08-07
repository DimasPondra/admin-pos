import AuthMiddleware from "../../middleware/auth";

export default [
    {
        path: "/roles",
        name: "role",
        component: () => import("../../views/roles/Role.vue"),
        meta: {
            middleware: [AuthMiddleware],
            name_page: "roles",
            title: "Role",
        },
    },
    {
        path: "/roles/create",
        name: "create-role",
        component: () => import("../../views/roles/CreateRole.vue"),
        meta: {
            middleware: [AuthMiddleware],
            name_page: "roles",
            title: "Create Role",
        },
    },
    {
        path: "/roles/:id/edit",
        name: "edit-role",
        component: () => import("../../views/roles/EditRole.vue"),
        meta: {
            middleware: [AuthMiddleware],
            name_page: "roles",
            title: "Edit Role",
        },
    },
];
