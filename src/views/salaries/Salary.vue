<template>
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
</template>

<script>
import { onMounted, reactive, computed } from "vue";
import { useSalaryStore } from "../../stores/salaries";

import Pagination from "../../components/Pagination.vue";
import TableSalary from "../../components/tables/TableSalary.vue";
import TittlePage from "../../components/TittlePage.vue";

export default {
    components: {
        Pagination,
        TableSalary,
        TittlePage,
    },
    setup() {
        const salaryStore = useSalaryStore();
        const title = reactive({
            name: "Salary",
            link_create: "/salaries/create",
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
            loadSalaries();
        });

        const handleDelete = async (id) => {
            await salaryStore.deleteItem(id);
            loadSalaries(1);
        };

        const changePage = async (value) => {
            await loadSalaries(value);
        };

        return { salaryStore, handleDelete, title, changePage };
    },
};
</script>
