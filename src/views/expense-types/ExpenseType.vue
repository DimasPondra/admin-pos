<template>
    <div class="col-12 col-xl-9">
        <Navbar :navbar="navbar" @clicked="$emit('hide', 'open')" />

        <div class="content">
            <div class="row">
                <TittlePage :title="title" />

                <FilterExpenseType :filter="filter" @clear_filter="clearFilter" />

                <div class="col-12">
                    <div class="statistics-card">
                        <div class="table-responsive">
                            <TableExpenseType
                                :expense_types="expenseTypeStore.data.expense_types"
                                @delete_expense_type="handleDelete"
                            />

                            <Pagination :pagination="expenseTypeStore.data.pagination" @current_page="changePage" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useExpenseTypeStore } from "../../stores/expense-types";
import { reactive, onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";

import Navbar from "../../components/Navbar.vue";
import FilterExpenseType from "../../components/filters/FilterExpenseType.vue";
import Pagination from "../../components/Pagination.vue";
import TableExpenseType from "../../components/tables/TableExpenseType.vue";
import TittlePage from "../../components/TittlePage.vue";

export default {
    components: {
        Navbar,
        FilterExpenseType,
        Pagination,
        TableExpenseType,
        TittlePage,
    },
    setup() {
        const route = useRoute();
        const expenseTypeStore = useExpenseTypeStore();
        const title = reactive({
            name: "Expense Type",
            link_create: "/expense-types/create",
        });
        const filter = reactive({
            name: "",
        });
        const navbar = reactive({
            title: "Expense Types",
            link: null,
        });

        const params = computed(() => {
            return {
                name: filter.name,
                page: expenseTypeStore.data.pagination.page,
                per_page: expenseTypeStore.data.pagination.per_page,
            };
        });

        watch(
            () => filter.name,
            () => {
                loadExpenseTypes(1);
            }
        );

        const loadExpenseTypes = async (value) => {
            params.value.page = value != null ? value : params.value.page;

            await expenseTypeStore.get(params.value);
        };

        onMounted(() => {
            document.title = `Admin Panel - ${route.meta.title}`;
            loadExpenseTypes();
        });

        const handleDelete = async (id) => {
            await expenseTypeStore.deleteItem(id);
            loadExpenseTypes(1);
        };

        const clearFilter = () => {
            filter.name = "";
        };

        const changePage = async (value) => {
            await loadExpenseTypes(value);
        };

        return { expenseTypeStore, handleDelete, title, filter, navbar, clearFilter, changePage };
    },
};
</script>
