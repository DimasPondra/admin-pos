import { defineStore } from "pinia";
import { reactive } from "vue";
import { useToast } from "vue-toastification";
import { useAuthStore } from "./auth";
import router from "../router";

export const useAlertStore = defineStore("alert", () => {
    const data = reactive({
        code: null,
        message: "",
    });

    const toast = useToast();
    const authStore = useAuthStore();

    const handleSuccess = (message) => {
        data.message = message;
        toast.success(data.message);
    };

    const handleError = (error) => {
        data.code = error.response.status;
        data.message = error.response.data.message;

        if (data.code == 400) {
            toast.error(data.message);
        } else if (data.code == 401) {
            toast.error(data.message);

            authStore.$reset();

            router.push("/login");
        } else if (data.code == 403) {
            toast.error(data.message);
        } else if (data.code == 404) {
            router.push("/");
        } else if (data.code == 422) {
            toast.error(data.message);
        }
    };

    return { data, handleSuccess, handleError };
});
