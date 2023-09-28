import axios from "axios";
import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import SecureLS from "secure-ls";
import router from "../router";
import { useAlertStore } from "./alerts";

const secureLS = new SecureLS({
    encodingType: "aes",
    encryptionSecret: "oktafianto",
});

export const useAuthStore = defineStore(
    "auth",
    () => {
        const token = ref("");
        const ability = ref("");
        const data = reactive({
            profile: {
                id: null,
                username: "",
                role: {},
                file: {},
                payrolls: [],
            },
        });

        const alertStore = useAlertStore();

        const login = async (user) => {
            try {
                const res = await axios.post("auth/login", user);
                token.value = "Bearer " + res.data.access_token;
                ability.value = res.data.ability;

                if (ability.value == "admin") {
                    router.push("/");
                } else if (ability.value == "finance") {
                    router.push("/purchases");
                } else if (ability.value == "cashier") {
                    router.push("/carts");
                }
            } catch (error) {
                alertStore.handleError(error);
            }
        };

        const logout = async () => {
            try {
                await axios.post("auth/logout", "", {
                    headers: {
                        Authorization: token.value,
                    },
                });

                $reset();
                router.push("/login");
            } catch (error) {
                alertStore.handleError(error);
            }
        };

        const show = async (params) => {
            clear();

            try {
                const res = await axios.get("auth/show", {
                    params: params,
                    headers: {
                        Authorization: token.value,
                    },
                });

                data.profile = res.data.data;
                data;
            } catch (error) {
                alertStore.handleError(error);
            }
        };

        const changePassword = async (data) => {
            try {
                await axios.patch("auth/change-password", data, {
                    headers: {
                        Authorization: token.value,
                    },
                });

                alertStore.handleSuccess("change password successfully.");
            } catch (error) {
                alertStore.handleError(error);
            }
        };

        const $reset = () => {
            token.value = null;
            ability.value = null;
        };

        const clear = () => {
            data.profile.id = null;
            data.profile.username = "";
            data.profile.role = {};
            data.profile.file = {};
            data.profile.payrolls = [];
        };

        return { token, ability, data, login, logout, show, changePassword, $reset };
    },
    {
        persist: [
            {
                key: "token",
                paths: ["token"],
                storage: {
                    getItem: (key) => secureLS.get(key),
                    setItem: (key, value) => secureLS.set(key, value),
                },
            },
            {
                key: "ability",
                paths: ["ability"],
                storage: {
                    getItem: (key) => secureLS.get(key),
                    setItem: (key, value) => secureLS.set(key, value),
                },
            },
        ],
    }
);
