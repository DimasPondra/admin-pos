import { useAuthStore } from "../stores/auth";

export default (to, from, next) => {
    let authStore = useAuthStore();

    if (authStore.ability == "finance") {
        next({ name: "dashboard-finance" });
        return false;
    } else if (authStore.ability == "cashier") {
        next({ name: "cart" });
        return false;
    } else if (authStore.ability != "admin" && authStore.ability != "finance" && authStore.ability != "cashier") {
        authStore.$reset();

        next({ name: "login" });
        return false;
    }
};
