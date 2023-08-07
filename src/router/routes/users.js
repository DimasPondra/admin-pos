import AuthMiddleware from "../../middleware/auth";

export default [
    {
        path: "/users",
        name: "user",
        component: () => import("../../views/users/User.vue"),
        meta: {
            middleware: [AuthMiddleware],
            name_page: "users",
            title: "User",
        },
    },
    {
        path: "/users/create",
        name: "create-user",
        component: () => import("../../views/users/CreateUser.vue"),
        meta: {
            middleware: [AuthMiddleware],
            name_page: "users",
            title: "Create User",
        },
    },
    {
        path: "/users/:id/edit",
        name: "edit-user",
        component: () => import("../../views/users/EditUser.vue"),
        meta: {
            middleware: [AuthMiddleware],
            name_page: "users",
            title: "Edit User",
        },
    },
];
