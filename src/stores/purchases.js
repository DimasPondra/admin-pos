import { defineStore } from "pinia";
import { reactive } from "vue";
import { useAuthStore } from "./auth";
import { useAlertStore } from "./alerts";
import axios from "axios";
import router from "../router";

export const usePurchaseStore = defineStore("purchase", () => {
    const data = reactive({
        purchases: [],
        purchase: {
            id: null,
            date: "",
            amount: 0,
            price: 0,
            product_id: null,
            seller_id: null,
            user_id: null,
            product: {},
            seller: {},
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
            const res = await axios.get("finance/purchases", {
                params: params,
                headers: {
                    Authorization: authStore.token,
                },
            });

            data.purchases = res.data.data;

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
            const res = await axios.get(`finance/purchases/${id}/show`, {
                params: params,
                headers: {
                    Authorization: authStore.token,
                },
            });

            data.purchase = res.data.data;

            data.purchase.product_id = res.data.data.product.id;
            data.purchase.seller_id = res.data.data.seller.id;
            data.purchase.user_id = res.data.data.user.id;
        } catch (error) {
            alertStore.handleError(error);
        }
    };

    const save = async (data, id) => {
        try {
            if (id == null) {
                await axios.post("finance/purchases/store", data, {
                    headers: {
                        Authorization: authStore.token,
                    },
                });

                alertStore.handleSuccess("successfully created.");
            } else {
                await axios.patch(`finance/purchases/${id}/update`, data, {
                    headers: {
                        Authorization: authStore.token,
                    },
                });

                alertStore.handleSuccess("successfully updated.");
            }

            clear();
            router.push("/purchases");
        } catch (error) {
            alertStore.handleError(error);
        }
    };

    const deleteItem = async (id) => {
        try {
            await axios.delete(`finance/purchases/${id}/delete`, {
                headers: {
                    Authorization: authStore.token,
                },
            });

            alertStore.handleSuccess("successfully deleted.");
        } catch (error) {
            alertStore.handleError(error);
        }
    };

    const clear = () => {
        data.purchase.id = null;
        data.purchase.date = "";
        data.purchase.amount = 0;
        data.purchase.price = 0;
        data.purchase.product_id = null;
        data.purchase.seller_id = null;
        data.purchase.user_id = null;
        data.purchase.product = {};
        data.purchase.seller = {};
        data.purchase.user = {};
    };

    return { data, get, show, save, deleteItem };
});
