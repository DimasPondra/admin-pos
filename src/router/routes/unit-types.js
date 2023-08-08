import AuthMiddleware from "../../middleware/auth";
import AdminMiddleware from "../../middleware/admin";

export default [
    {
        path: "/unit-types",
        name: "unit-type",
        component: () => import("../../views/unit-types/UnitType.vue"),
        meta: {
            middleware: [AuthMiddleware, AdminMiddleware],
            name_page: "unit-types",
            title: "Unit Type",
        },
    },
    {
        path: "/unit-types/create",
        name: "create-unit-type",
        component: () => import("../../views/unit-types/CreateUnitType.vue"),
        meta: {
            middleware: [AuthMiddleware, AdminMiddleware],
            name_page: "unit-types",
            title: "Create Unit Type",
        },
    },
    {
        path: "/unit-types/:id/edit",
        name: "edit-unit-type",
        component: () => import("../../views/unit-types/EditUnitType.vue"),
        meta: {
            middleware: [AuthMiddleware, AdminMiddleware],
            name_page: "unit-types",
            title: "Edit Unit Type",
        },
    },
];
