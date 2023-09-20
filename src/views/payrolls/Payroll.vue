<template>
    <div class="col-12 col-xl-9">
        <Navbar :navbar="navbar" @clicked="$emit('hide', 'open')" />

        <div class="content">
            <div class="row">
                <TittlePage :title="title" @handleGeneratePDF="handleGeneratePDF" />

                <FilterPayroll :filter="filter" @clear_filter="clearFilter" />

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
import { onMounted, computed, reactive, watch } from "vue";
import { useRoute } from "vue-router";

import Navbar from "../../components/Navbar.vue";
import FilterPayroll from "../../components/filters/FilterPayroll.vue";
import Pagination from "../../components/Pagination.vue";
import TablePayroll from "../../components/tables/TablePayroll.vue";
import TittlePage from "../../components/TittlePage.vue";

export default {
    components: {
        Navbar,
        FilterPayroll,
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
            generate: true,
        });
        const filter = reactive({
            name: "",
            status: "",
            month: "",
            year: "",
        });
        const navbar = reactive({
            title: "Payrolls",
            link: null,
        });

        const params = computed(() => {
            return {
                name: filter.name,
                status: filter.status,
                month: filter.month,
                year: filter.year,
                include: "user",
                page: payrollStore.data.pagination.page,
                per_page: payrollStore.data.pagination.per_page,
            };
        });

        const PDFParams = computed(() => {
            return {
                month: filter.month,
                year: filter.year,
            };
        });

        watch(
            () => filter,
            () => {
                loadPayrolls(1);
            },
            { deep: true }
        );

        const loadPayrolls = async (value) => {
            params.value.page = value != null ? value : params.value.page;

            await payrollStore.get(params.value);
        };

        onMounted(() => {
            document.title = `Admin Panel - ${route.meta.title}`;
            loadPayrolls();
        });

        const clearFilter = () => {
            filter.name = "";
            filter.status = "";
            filter.month = "";
            filter.year = "";
        };

        const changePage = async (value) => {
            await loadPayrolls(value);
        };

        const handleGeneratePDF = async () => {
            await payrollStore.generatePDF(PDFParams.value);
        };

        return { payrollStore, title, filter, navbar, clearFilter, changePage, handleGeneratePDF };
    },
};
</script>
