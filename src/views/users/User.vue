<template>
    <div>
        <router-link to="/users/create">create</router-link>
    </div>
    <br />
    <div v-for="user in userStore.data.users" :key="user.id">
        <div>
            {{ user.username }}
            <br />
            <router-link :to="`users/${user.id}/edit`">edit</router-link>
            <br />
        </div>
        <br />
    </div>
</template>

<script>
import { useUserStore } from "../../stores/users";
import { onMounted } from "vue";

export default {
    setup() {
        const userStore = useUserStore();

        const loadUsers = async () => {
            await userStore.get();
        };

        onMounted(() => {
            loadUsers();
        });

        return { userStore };
    },
};
</script>
