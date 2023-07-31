import { useAuthStore } from "../stores/auth";

export default (to, from, next) => {
    let auth = useAuthStore();

    if (auth.token != null) {
        next({ name: "home" });
        return false;
    }
};
