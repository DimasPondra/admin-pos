import { defineStore } from "pinia";
import { reactive } from "vue";
import { useAuthStore } from "./auth";
import axios from "axios";
import router from "../router";
import { useAlertStore } from "./alerts";

export const useProductTypeStore = defineStore("product-type", () => {
    const data = reactive({
        product_types: [],
        product_type: {
            id: null,
            name: "",
            slug: "",
        },
    });

    const authStore = useAuthStore();
    const alertStore = useAlertStore();

    const get = async (params) => {
        clear();

        try {
            const res = await axios.get("admin/product-types", {
                params: params,
                headers: {
                    Authorization: authStore.token,
                },
            });

            data.product_types = res.data.data;
        } catch (error) {
            alertStore.handleError(error);
        }
    };

    const show = async (id) => {
        clear();

        try {
            const res = await axios.get(`admin/product-types/${id}/show`, {
                headers: {
                    Authorization: authStore.token,
                },
            });

            data.product_type = res.data.data;
        } catch (error) {
            alertStore.handleError(error);
        }
    };

    const save = async (data, id) => {
        try {
            if (id == null) {
                await axios.post("admin/product-types/store", data, {
                    headers: {
                        Authorization: authStore.token,
                    },
                });

                alertStore.handleSuccess("successfully created.");
            } else {
                await axios.patch(`admin/product-types/${id}/update`, data, {
                    headers: {
                        Authorization: authStore.token,
                    },
                });

                alertStore.handleSuccess("successfully updated.");
            }

            clear();
            router.push("/product-types");
        } catch (error) {
            alertStore.handleError(error);
        }
    };

    const deleteItem = async (id) => {
        try {
            await axios.delete(`admin/product-types/${id}/delete`, {
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
        data.product_type.id = null;
        data.product_type.name = "";
        data.product_type.slug = "";
    };

    return { data, get, show, save, deleteItem };
});
