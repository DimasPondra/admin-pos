import { defineStore } from "pinia";
import { reactive } from "vue";
import { useAuthStore } from "./auth";
import axios from "axios";
import router from "../router";

export const useRoleStore = defineStore("role", () => {
    const data = reactive({
        role: {
            id: null,
            name: "",
            slug: "",
        },
        roles: [],
    });

    const auth = useAuthStore();

    async function get() {
        try {
            const response = await axios.get("admin/roles", {
                headers: {
                    Authorization: auth.token,
                },
            });

            data.roles = response.data.data;
        } catch (error) {
            console.log(error);
        }
    }

    async function show(id) {
        try {
            const response = await axios.get(`admin/roles/${id}/show`, {
                headers: {
                    Authorization: auth.token,
                },
            });

            data.role = response.data.data;
        } catch (error) {
            console.log(error);
        }
    }

    async function save(data) {
        try {
            await axios.post("admin/roles/store", data, {
                headers: {
                    Authorization: auth.token,
                },
            });

            router.push("/roles");
        } catch (error) {
            console.log(error);
        }
    }

    return { data, get, show, save };
});
