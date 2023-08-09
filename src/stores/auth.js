import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
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

        const $reset = () => {
            token.value = null;
            ability.value = null;
        };

        return { token, ability, login, logout, $reset };
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
