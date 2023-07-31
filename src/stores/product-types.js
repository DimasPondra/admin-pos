import { defineStore } from "pinia";
import { reactive } from "vue";
import { useAuthStore } from "./auth";
import axios from "axios";
import router from "../router";

export const useProductTypeStore = defineStore("product-type", () => {
    const data = reactive({
        product_types: [],
        product_type: {
            id: null,
            name: "",
            slug: "",
        },
    });

    const auth = useAuthStore();

    const get = async () => {
        clear();

        try {
            const res = await axios.get("admin/product-types", {
                headers: {
                    Authorization: auth.token,
                },
            });

            data.product_types = res.data.data;
        } catch (error) {
            console.log(error);
        }
    };

    const show = async (id) => {
        clear();

        try {
            const res = await axios.get(`admin/product-types/${id}/show`, {
                headers: {
                    Authorization: auth.token,
                },
            });
            console.log(res.data.data);
            data.product_type = res.data.data;
        } catch (error) {
            console.log(error);
        }
    };

    const save = async (data, id) => {
        try {
            if (id == null) {
                await axios.post("admin/product-types/store", data, {
                    headers: {
                        Authorization: auth.token,
                    },
                });
            } else {
                await axios.patch(`admin/product-types/${id}/update`, data, {
                    headers: {
                        Authorization: auth.token,
                    },
                });
            }

            clear();
            router.push("/product-types");
        } catch (error) {
            console.log(error);
        }
    };

    const deleteItem = async (id) => {
        try {
            await axios.delete(`admin/product-types/${id}/delete`, {
                headers: {
                    Authorization: auth.token,
                },
            });
        } catch (error) {
            console.log(error);
        }
    };

    const clear = () => {
        data.product_type.id = null;
        data.product_type.name = "";
        data.product_type.slug = "";
    };

    return { data, get, show, save, deleteItem };
});
