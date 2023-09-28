import AuthMiddleware from "../../middleware/auth";

export default [
    {
        path: "/account-profiles",
        name: "account-profile",
        component: () => import("../../views/account-profiles/AccountProfile.vue"),
        meta: {
            middleware: [AuthMiddleware],
            name_page: "account-profiles",
            title: "Account Profile",
        },
    },
];
