<template>
    <div class="row">
        <TittlePage :title="title" />

        <FilterRole :filter="filter" @clear_filter="clearFilter" />

        <div class="col-12">
            <div class="statistics-card">
                <div class="table-responsive">
                    <TableRole :roles="roleStore.data.roles" @delete_role="handleDelete" />

                    <Pagination :pagination="roleStore.data.pagination" @current_page="changePage" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useRoleStore } from "../../stores/roles";
import { onMounted, reactive, computed, watch } from "vue";

import FilterRole from "../../components/filters/FilterRole.vue";
import Pagination from "../../components/Pagination.vue";
import TableRole from "../../components/tables/TableRole.vue";
import TittlePage from "../../components/TittlePage.vue";

export default {
    components: {
        FilterRole,
        Pagination,
        TableRole,
        TittlePage,
    },
    setup() {
        const roleStore = useRoleStore();
        const title = reactive({
            name: "Role",
            link_create: "/roles/create",
        });
        const filter = reactive({
            name: "",
        });

        const params = computed(() => {
            return {
                name: filter.name,
                page: roleStore.data.pagination.page,
                per_page: roleStore.data.pagination.per_page,
            };
        });

        watch(
            () => filter.name,
            () => {
                loadRoles(1);
            }
        );

        const loadRoles = async (value) => {
            params.value.page = value != null ? value : params.value.page;

            await roleStore.get(params.value);
        };

        onMounted(() => {
            loadRoles();
        });

        const handleDelete = async (id) => {
            await roleStore.deleteItem(id);
            loadRoles(1);
        };

        const clearFilter = () => {
            filter.name = "";
        };

        const changePage = async (value) => {
            await loadRoles(value);
        };

        return { roleStore, handleDelete, title, filter, clearFilter, changePage };
    },
};
</script>
