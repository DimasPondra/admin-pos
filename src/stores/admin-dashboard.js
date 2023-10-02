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
        total: {
            transaction: 0,
            purchase: 0,
            payroll: 0,
            income: 0,
            expense: 0,
        },
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

            data.total.transaction = parseFloat(res.data.data.total.transaction);
            data.total.purchase = parseFloat(res.data.data.total.purchase);
            data.total.payroll = parseFloat(res.data.data.total.payroll);
            data.total.income = new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
            }).format(data.total.transaction);
            data.total.expense = new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
            }).format(data.total.purchase + data.total.payroll);
        } catch (error) {
            alertStore.handleError(error);
        }
    };

    return { data, get };
});
