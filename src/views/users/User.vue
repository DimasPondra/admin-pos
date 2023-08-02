<template>
    <div>
        <router-link to="/users/create">create</router-link>
        <br /><br />
        <input type="text" v-model="filter.username" placeholder="search username" />
        <select id="role_id" v-model="filter.role_id">
            <option :value="null" selected disabled>Choose</option>
            <option v-for="role in roleStore.data.roles" :key="role.id" :value="role.id">{{ role.name }}</option>
        </select>
        <button @click="clearFilter">clear</button>
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

    <Pagination :pagination="userStore.data.pagination" @current_page="changePage" />
</template>

<script>
import { useRoleStore } from "../../stores/roles";
import { useUserStore } from "../../stores/users";
import { onMounted, reactive, computed, watch } from "vue";
import Pagination from "../../components/Pagination.vue";

export default {
    components: {
        Pagination,
    },
    setup() {
        const userStore = useUserStore();
        const roleStore = useRoleStore();
        const filter = reactive({
            username: "",
            role_id: null,
        });

        const params = computed(() => {
            return {
                username: filter.username,
                role_id: filter.role_id,
                include: "role",
                page: userStore.data.pagination.page,
                per_page: userStore.data.pagination.per_page,
            };
        });

        watch(
            () => filter,
            () => {
                loadUsers(1);
            },
            { deep: true }
        );

        const loadUsers = async (value) => {
            params.value.page = value != null ? value : params.value.page;

            await userStore.get(params.value);
        };

        const loadRoles = async () => {
            await roleStore.get();
        };

        onMounted(() => {
            loadUsers();
            loadRoles();
        });

        const clearFilter = () => {
            filter.username = "";
            filter.role_id = null;
        };

        const changePage = async (value) => {
            await loadUsers(value);
        };

        return { userStore, roleStore, filter, clearFilter, changePage };
    },
};
</script>
