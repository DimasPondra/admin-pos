import AuthMiddleware from "../../middleware/auth";

export default [
    {
        path: "/unit-types",
        name: "unit-type",
        component: () => import("../../views/unit-types/UnitType.vue"),
        meta: {
            middleware: [AuthMiddleware],
        },
    },
    {
        path: "/unit-types/create",
        name: "create-unit-type",
        component: () => import("../../views/unit-types/CreateUnitType.vue"),
        meta: {
            middleware: [AuthMiddleware],
        },
    },
    {
        path: "/unit-types/:id/edit",
        name: "edit-unit-type",
        component: () => import("../../views/unit-types/EditUnitType.vue"),
        meta: {
            middleware: [AuthMiddleware],
        },
    },
];
