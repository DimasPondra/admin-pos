import { defineStore } from "pinia";
import { reactive } from "vue";
import { useAlertStore } from "./alerts";
import axios from "axios";
import { useAuthStore } from "./auth";
import router from "../router";

export const useProductStore = defineStore("product", () => {
    const data = reactive({
        products: [],
        product: {
            id: null,
            name: "",
            slug: "",
            description: "",
            price: 0,
            amount: 0,
            product_type_id: null,
            product_type: {},
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

    const alertStore = useAlertStore();
    const authStore = useAuthStore();

    const get = async (params) => {
        clear();

        try {
            const res = await axios.get("admin/products", {
                params: params,
                headers: {
                    Authorization: authStore.token,
                },
            });

            data.products = res.data.data;

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
            const res = await axios.get(`admin/products/${id}/show`, {
                params: params,
                headers: {
                    Authorization: authStore.token,
                },
            });

            data.product = res.data.data;
            data.product.product_type_id = res.data.data.product_type.id;
        } catch (error) {
            alertStore.handleError(error);
        }
    };

    const save = async (data, id) => {
        try {
            if (id == null) {
                await axios.post("admin/products/store", data, {
                    headers: {
                        Authorization: authStore.token,
                    },
                });

                alertStore.handleSuccess("successfully created.");
            } else {
                await axios.patch(`admin/products/${id}/update`, data, {
                    headers: {
                        Authorization: authStore.token,
                    },
                });

                alertStore.handleSuccess("successfully updated.");
            }

            clear();
            router.push("/products");
        } catch (error) {
            alertStore.handleError(error);
        }
    };

    const deleteItem = async (id) => {
        try {
            await axios.delete(`admin/products/${id}/delete`, {
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
        data.product.id = null;
        data.product.name = "";
        data.product.slug = "";
        data.product.description = "";
        data.product.price = 0;
        data.product.amount = 0;
        data.product.product_type_id = null;
        data.product.product_type = {};
    };

    return { data, get, show, save, deleteItem };
});
