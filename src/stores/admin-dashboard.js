import { defineStore } from "pinia";
import { reactive } from "vue";
import { useAuthStore } from "./auth";
import { useAlertStore } from "./alerts";
import axios from "axios";

export const useAdminDashboardStore = defineStore("admin-dashboard", () => {
    const data = reactive({
        product_stocks: [],
        product_sales: [],
        payroll_setting: [],
        total: {},
    });

    const authStore = useAuthStore();
    const alertStore = useAlertStore();

    const get = async (params) => {
        try {
            const res = await axios.get("admin/dashboard", {
                params: params,
                headers: {
                    Authorization: authStore.token,
                },
            });

            data.product_stocks = res.data.data.product_stocks;
            data.product_sales = res.data.data.product_sales;
            data.payroll_setting = res.data.data.payroll_setting;
            data.total = res.data.data.total;
        } catch (error) {
            alertStore.handleError(error);
        }
    };

    return { data, get };
});
