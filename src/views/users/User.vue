<template>
    <div class="row">
        <TittlePage :title="title" />

        <FilterUser :filter="filter" :roles="roleStore.data.roles" @clear_filter="clearFilter" />

        <div class="col-12">
            <div class="statistics-card">
                <div class="table-responsive">
                    <TableUser :users="userStore.data.users" />

                    <Pagination :pagination="userStore.data.pagination" @current_page="changePage" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useRoleStore } from "../../stores/roles";
import { useUserStore } from "../../stores/users";
import { onMounted, reactive, computed, watch } from "vue";

import FilterUser from "../../components/filters/FilterUser.vue";
import Pagination from "../../components/Pagination.vue";
import TableUser from "../../components/tables/TableUser.vue";
import TittlePage from "../../components/TittlePage.vue";

export default {
    components: {
        FilterUser,
        Pagination,
        TableUser,
        TittlePage,
    },
    setup() {
        const userStore = useUserStore();
        const roleStore = useRoleStore();
        const title = reactive({
            name: "User",
            link_create: "/users/create",
        });
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

        return { userStore, roleStore, title, filter, clearFilter, changePage };
    },
};
</script>
