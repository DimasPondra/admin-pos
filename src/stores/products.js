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
        },
    });

    const alertStore = useAlertStore();
    const authStore = useAuthStore();

    const get = async () => {
        clear();

        try {
            const res = await axios.get("admin/products", {
                headers: {
                    Authorization: authStore.token,
                },
            });

            data.products = res.data.data;
        } catch (error) {
            alertStore.handleError(error);
        }
    };

    const save = async (data) => {
        try {
            await axios.post("admin/products/store", data, {
                headers: {
                    Authorization: authStore.token,
                },
            });

            alertStore.handleSuccess("successfully created.");
            clear();
            router.push("/products");
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
    };

    return { data, get, save };
});
