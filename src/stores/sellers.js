import { defineStore } from "pinia";
import { reactive } from "vue";
import { useAlertStore } from "./alerts";
import { useAuthStore } from "./auth";
import axios from "axios";
import router from "../router";

export const useSellerStore = defineStore("seller", () => {
    const data = reactive({
        sellers: [],
        seller: {
            id: null,
            name: "",
            slug: "",
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
        try {
            const res = await axios.get("admin/sellers", {
                params: params,
                headers: {
                    Authorization: authStore.token,
                },
            });

            data.sellers = res.data.data;

            if (res.data.meta != null) {
                data.pagination.page = res.data.meta.current_page;
                data.pagination.total = res.data.meta.total;
                data.pagination.per_page = res.data.meta.per_page;
            }
        } catch (error) {
            alertStore.handleError(error);
        }
    };

    const save = async (data) => {
        try {
            await axios.post("admin/sellers/store", data, {
                headers: {
                    Authorization: authStore.token,
                },
            });

            alertStore.handleSuccess("successfully created.");

            router.push("/sellers");
        } catch (error) {
            alertStore.handleError(error);
        }
    };

    return { data, get, save };
});
