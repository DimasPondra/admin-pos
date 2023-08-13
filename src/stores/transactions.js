import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import { useAlertStore } from "./alerts";
import axios from "axios";
import router from "../router";

export const useTransactionStore = defineStore("transaction", () => {
    const authStore = useAuthStore();
    const alertStore = useAlertStore();

    const save = async (data) => {
        try {
            await axios.post("cashier/transactions/store", data, {
                headers: {
                    Authorization: authStore.token,
                },
            });

            alertStore.handleSuccess("successfully created.");

            router.push("/carts");
        } catch (error) {
            alertStore.handleError(error);
        }
    };

    return { save };
});
