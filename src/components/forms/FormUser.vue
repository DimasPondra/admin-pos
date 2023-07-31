<template>
    <div>
        <router-link to="/users">Back</router-link>
    </div>
    <br />
    <form @submit.prevent="handleSubmit">
        <div v-if="route.params.id == undefined">
            <label for="username">Username</label>
            <input type="text" id="username" v-model="userStore.data.user.username" />
            <br />
        </div>

        <label for="password">Password</label>
        <input type="password" id="password" v-model="userStore.data.user.password" />
        <br />

        <div v-if="route.params.id == undefined">
            <label for="role_id">Role</label>
            <select id="role_id">
                <option v-for="role in roleStore.data.roles" :key="role.id" :value="role.id">{{ role.name }}</option>
            </select>
            <br />
        </div>

        <button>Save</button>
    </form>
</template>

<script>
import { useRoute } from "vue-router";
import { useRoleStore } from "../../stores/roles";
import { useUserStore } from "../../stores/users";
import { onMounted } from "vue";

export default {
    setup() {
        const userStore = useUserStore();
        const roleStore = useRoleStore();
        const route = useRoute();

        const handleSubmit = async () => {
            await userStore.save(userStore.data.user, route.params.id);
        };

        const loadRoles = async () => {
            await roleStore.get();
        };

        onMounted(() => {
            loadRoles();
        });

        return { userStore, roleStore, route, handleSubmit };
    },
};
</script>
