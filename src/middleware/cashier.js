import { useAuthStore } from "../stores/auth";

export default (to, from, next) => {
    let authStore = useAuthStore();

    if (authStore.ability == "finance") {
        next({ name: "purchase" });
        return false;
    } else if (authStore.ability == "admin") {
        next({ name: "home" });
        return false;
    } else if (authStore.ability != "admin" && authStore.ability != "finance" && authStore.ability != "cashier") {
        authStore.$reset();

        next({ name: "login" });
        return false;
    }
};
