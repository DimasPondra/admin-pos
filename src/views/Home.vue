<template>
    <button @click="handleLogout">Logout</button>
</template>

<script>
import { useAuthStore } from "../stores/auth";

export default {
    setup() {
        const auth = useAuthStore();

        async function handleLogout() {
            await auth.logout();
        }

        return { handleLogout };
    },
};
</script>
