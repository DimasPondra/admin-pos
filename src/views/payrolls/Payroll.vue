<template>
    <div class="col-12 col-xl-9">
        <Navbar :navbar="navbar" @clicked="$emit('hide', 'open')" />

        <div class="content">
            <div class="row">
                <TittlePage :title="title" />

                <div class="col-12">
                    <div class="statistics-card">
                        <div class="table-responsive">
                            <TablePayroll :payrolls="payrollStore.data.payrolls" />

                            <Pagination :pagination="payrollStore.data.pagination" @current_page="changePage" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { usePayrollStore } from "../../stores/payrolls";
import { onMounted, computed, reactive } from "vue";
import { useRoute } from "vue-router";

import Navbar from "../../components/Navbar.vue";
import Pagination from "../../components/Pagination.vue";
import TablePayroll from "../../components/tables/TablePayroll.vue";
import TittlePage from "../../components/TittlePage.vue";

export default {
    components: {
        Navbar,
        Pagination,
        TablePayroll,
        TittlePage,
    },
    setup() {
        const route = useRoute();
        const payrollStore = usePayrollStore();
        const title = reactive({
            name: "Payroll",
            link_create: "/payrolls/create",
        });
        const navbar = reactive({
            title: "Payrolls",
            link: null,
        });

        const params = computed(() => {
            return {
                include: "user",
                page: payrollStore.data.pagination.page,
                per_page: payrollStore.data.pagination.per_page,
            };
        });

        const loadPayrolls = async (value) => {
            params.value.page = value != null ? value : params.value.page;

            await payrollStore.get(params.value);
        };

        onMounted(() => {
            document.title = `Admin Panel - ${route.meta.title}`;
            loadPayrolls();
        });

        const changePage = async (value) => {
            await loadPayrolls(value);
        };

        return { payrollStore, title, navbar, changePage };
    },
};
</script>
