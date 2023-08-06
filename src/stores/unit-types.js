import { defineStore } from "pinia";
import { reactive } from "vue";
import { useAuthStore } from "./auth";
import axios from "axios";
import router from "../router";
import { useAlertStore } from "./alerts";

export const useUnitTypeStore = defineStore("unit-type", () => {
    const data = reactive({
        unit_types: [],
        unit_type: {
            id: null,
            name: "",
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
            const res = await axios.get("admin/unit-types", {
                params: params,
                headers: {
                    Authorization: authStore.token,
                },
            });

            data.unit_types = res.data.data;

            if (res.data.meta != null) {
                data.pagination.page = res.data.meta.current_page;
                data.pagination.total = res.data.meta.total;
                data.pagination.per_page = res.data.meta.per_page;
            }
        } catch (error) {
            alertStore.handleError(error);
        }
    };

    const show = async (id) => {
        clear();

        try {
            const res = await axios.get(`admin/unit-types/${id}/show`, {
                headers: {
                    Authorization: authStore.token,
                },
            });

            data.unit_type = res.data.data;
        } catch (error) {
            alertStore.handleError(error);
        }
    };

    const save = async (data, id) => {
        try {
            if (id == null) {
                await axios.post("admin/unit-types/store", data, {
                    headers: {
                        Authorization: authStore.token,
                    },
                });

                alertStore.handleSuccess("successfully created.");
            } else {
                await axios.patch(`admin/unit-types/${id}/update`, data, {
                    headers: {
                        Authorization: authStore.token,
                    },
                });

                alertStore.handleSuccess("successfully updated.");
            }

            clear();
            router.push("/unit-types");
        } catch (error) {
            alertStore.handleError(error);
        }
    };

    const deleteItem = async (id) => {
        try {
            await axios.delete(`admin/unit-types/${id}/delete`, {
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
        data.unit_type.id = null;
        data.unit_type.name = "";
    };

    return { data, get, show, save, deleteItem };
});
