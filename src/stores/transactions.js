import { defineStore } from "pinia";
import { reactive } from "vue";
import { useAuthStore } from "./auth";
import { useAlertStore } from "./alerts";
import axios from "axios";
import router from "../router";

export const useTransactionStore = defineStore("transaction", () => {
    const data = reactive({
        transactions: [],
        transaction: {
            id: null,
            sub_total: 0,
            total: 0,
            user: {},
            details: [],
        },
        pagination: {
            page: 1,
            total: 0,
            per_page: 1,
            option: {
                chunk: 3,
                chunksNavigation: "scroll",
                hideCount: true,
            },
        },
    });

    const authStore = useAuthStore();
    const alertStore = useAlertStore();

    const get = async (params) => {
        clear();

        try {
            const res = await axios.get("admin/transactions", {
                params: params,
                headers: {
                    Authorization: authStore.token,
                },
            });

            data.transactions = res.data.data;

            if (res.data.meta != null) {
                data.pagination.page = res.data.meta.current_page;
                data.pagination.total = res.data.meta.total;
                data.pagination.per_page = res.data.meta.per_page;
            }
        } catch (error) {
            alertStore.handleError(error);
        }
    };

    const show = async (id, params) => {
        clear();

        try {
            const res = await axios.get(`admin/transactions/${id}/show`, {
                params: params,
                headers: {
                    Authorization: authStore.token,
                },
            });

            data.transaction = res.data.data;
        } catch (error) {
            alertStore.handleError(error);
        }
    };

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

    const clear = () => {
        data.transaction.id = null;
        data.transaction.sub_total = 0;
        data.transaction.total = 0;
        data.transaction.user = {};
        data.transaction.details = [];
    };

    return { data, get, show, save };
});
