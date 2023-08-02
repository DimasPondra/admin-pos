import { defineStore } from "pinia";
import { reactive } from "vue";
import { useAuthStore } from "./auth";
import { useAlertStore } from "./alerts";
import axios from "axios";
import router from "../router";

export const useUserStore = defineStore("user", () => {
    const data = reactive({
        users: [],
        user: {
            id: null,
            username: "",
            password: "",
            role_id: null,
            file_id: null,
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
            const res = await axios.get("admin/users", {
                params: params,
                headers: {
                    Authorization: authStore.token,
                },
            });

            data.users = res.data.data;

            if (res.data.meta != null) {
                data.pagination.page = res.data.meta.current_page;
                data.pagination.total = res.data.meta.total;
                data.pagination.per_page = res.data.meta.per_page;
            }
        } catch (error) {
            alertStore.handleError(error);
        }
    };

    const save = async (data, id) => {
        try {
            if (id == null) {
                await axios.post("admin/users/store", data, {
                    headers: {
                        Authorization: authStore.token,
                    },
                });

                alertStore.handleSuccess("successfully created.");
            } else {
                await axios.patch(`admin/users/${id}/update`, data, {
                    headers: {
                        Authorization: authStore.token,
                    },
                });

                alertStore.handleSuccess("successfully updated.");
            }

            clear();
            router.push("/users");
        } catch (error) {
            alertStore.handleError(error);
        }
    };

    const clear = () => {
        data.user.id = null;
        data.user.username = "";
        data.user.password = "";
        data.user.role_id = null;
        data.user.file_id = null;
    };

    return { data, get, save };
});
