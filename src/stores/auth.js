import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import SecureLS from "secure-ls";
import router from "../router";

const secureLS = new SecureLS({
    encodingType: "aes",
    encryptionSecret: "oktafianto",
});

export const useAuthStore = defineStore(
    "auth",
    () => {
        const token = ref("");

        async function login(user) {
            try {
                const response = await axios.post("auth/login", user);
                token.value = "Bearer " + response.data.access_token;

                router.push("/");
            } catch (error) {
                console.log(error);
            }
        }

        async function logout() {
            try {
                await axios.post("auth/logout", "", {
                    headers: {
                        Authorization: token.value,
                    },
                });

                token.value = null;
                router.push("/login");
            } catch (error) {
                console.log(error);
            }
        }

        return { token, login, logout };
    },
    {
        persist: {
            key: "token",
            paths: ["token"],
            storage: {
                getItem: (key) => secureLS.get(key),
                setItem: (key, value) => secureLS.set(key, value),
            },
        },
    }
);
