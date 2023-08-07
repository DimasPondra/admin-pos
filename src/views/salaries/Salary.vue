<template>
    <div class="col-12 col-xl-9">
        <Navbar :navbar="navbar" @clicked="$emit('hide', 'open')" />

        <div class="content">
            <div class="row">
                <TittlePage :title="title" />

                <div class="col-12">
                    <div class="statistics-card">
                        <div class="table-responsive">
                            <TableSalary :salaries="salaryStore.data.salaries" @delete_salary="handleDelete" />

                            <Pagination :pagination="salaryStore.data.pagination" @current_page="changePage" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, reactive, computed } from "vue";
import { useSalaryStore } from "../../stores/salaries";
import { useRoute } from "vue-router";

import Navbar from "../../components/Navbar.vue";
import Pagination from "../../components/Pagination.vue";
import TableSalary from "../../components/tables/TableSalary.vue";
import TittlePage from "../../components/TittlePage.vue";

export default {
    components: {
        Navbar,
        Pagination,
        TableSalary,
        TittlePage,
    },
    setup() {
        const route = useRoute();
        const salaryStore = useSalaryStore();
        const title = reactive({
            name: "Salary",
            link_create: "/salaries/create",
        });
        const navbar = reactive({
            title: "Salaries",
            link: null,
        });

        const params = computed(() => {
            return {
                include: "role",
                page: salaryStore.data.pagination.page,
                per_page: salaryStore.data.pagination.per_page,
            };
        });

        const loadSalaries = async (value) => {
            params.value.page = value != null ? value : params.value.page;

            await salaryStore.get(params.value);
        };

        onMounted(() => {
            document.title = `Admin Panel - ${route.meta.title}`;
            loadSalaries();
        });

        const handleDelete = async (id) => {
            await salaryStore.deleteItem(id);
            loadSalaries(1);
        };

        const changePage = async (value) => {
            await loadSalaries(value);
        };

        return { salaryStore, handleDelete, title, navbar, changePage };
    },
};
</script>
