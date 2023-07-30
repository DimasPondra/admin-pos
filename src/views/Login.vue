<template>
    <form @submit.prevent="handleSubmit">
        <input type="text" v-model="crendential.username" />
        <br />
        <input type="password" v-model="crendential.password" />
        <br />
        <button>Sign In</button>
    </form>
</template>

<script>
import { reactive } from "vue";
import { useAuthStore } from "../stores/auth";

export default {
    setup() {
        const crendential = reactive({
            username: "",
            password: "",
        });

        const auth = useAuthStore();

        async function handleSubmit() {
            await auth.login(crendential);
        }

        return { crendential, handleSubmit };
    },
};
</script>
