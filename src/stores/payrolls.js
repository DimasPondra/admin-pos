import { defineStore } from "pinia";
import { reactive } from "vue";
import { useAuthStore } from "./auth";
import { useAlertStore } from "./alerts";
import axios from "axios";
import router from "../router";

export const usePayrollStore = defineStore("payroll", () => {
    const data = reactive({
        payrolls: [],
        payroll: {
            id: null,
            role: "",
            basic_salary: 0,
            allowances: 0,
            tax: 0,
            net_pay: 0,
            payment_date: 0,
            status: 0,
            user_id: null,
            user: {},
        },
        pagination: {
            page: 1,
            total: 0,
            per_page: 10,
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
            const res = await axios.get("finance/payrolls", {
                params: params,
                headers: {
                    Authorization: authStore.token,
                },
            });

            data.payrolls = res.data.data;

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
            const res = await axios.get(`finance/payrolls/${id}/show`, {
                params: params,
                headers: {
                    Authorization: authStore.token,
                },
            });

            data.payroll = res.data.data;

            data.payroll.user_id = res.data.data.user.id;
        } catch (error) {
            alertStore.handleError(error);
        }
    };

    const save = async (data, id) => {
        try {
            if (id == null) {
                await axios.post("finance/payrolls/store", data, {
                    headers: {
                        Authorization: authStore.token,
                    },
                });

                alertStore.handleSuccess("successfully created.");
            } else {
                await axios.patch(`finance/payrolls/${id}/update`, data, {
                    headers: {
                        Authorization: authStore.token,
                    },
                });

                alertStore.handleSuccess("successfully updated.");
            }

            clear();
            router.push("/payrolls");
        } catch (error) {
            alertStore.handleError(error);
        }
    };

    const clear = () => {
        data.payroll.id = null;
        data.payroll.role = "";
        data.payroll.basic_salary = 0;
        data.payroll.allowances = 0;
        data.payroll.tax = 0;
        data.payroll.net_pay = 0;
        data.payroll.payment_date = null;
        data.payroll.status = "";
        data.payroll.user_id = null;
        data.payroll.user = {};
    };

    return { data, get, show, save };
});
