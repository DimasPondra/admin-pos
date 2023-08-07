<template>
    <div class="col-12 col-xl-9">
        <Navbar :navbar="navbar" @clicked="$emit('hide', 'open')" />

        <div class="content">
            <div class="row">
                <TittlePage :title="title" />

                <FilterPayrollSetting
                    :filter="filter"
                    :unit_types="unitTypeStore.data.unit_types"
                    @clear_filter="clearFilter"
                />

                <div class="col-12">
                    <div class="statistics-card">
                        <div class="table-responsive">
                            <TablePayrollSetting
                                :payroll_settings="payrollSettingStore.data.payroll_settings"
                                @delete_payroll_setting="handleDelete"
                            />

                            <Pagination :pagination="payrollSettingStore.data.pagination" @current_page="changePage" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useUnitTypeStore } from "../../stores/unit-types";
import { usePayrollSettingStore } from "../../stores/payroll-settings";
import { onMounted, computed, reactive, watch } from "vue";
import { useRoute } from "vue-router";

import Navbar from "../../components/Navbar.vue";
import FilterPayrollSetting from "../../components/filters/FilterPayrollSetting.vue";
import Pagination from "../../components/Pagination.vue";
import TablePayrollSetting from "../../components/tables/TablePayrollSetting.vue";
import TittlePage from "../../components/TittlePage.vue";

export default {
    components: {
        Navbar,
        FilterPayrollSetting,
        Pagination,
        TablePayrollSetting,
        TittlePage,
    },
    setup() {
        const route = useRoute();
        const payrollSettingStore = usePayrollSettingStore();
        const unitTypeStore = useUnitTypeStore();
        const title = reactive({
            name: "Payroll Setting",
            link_create: "/payroll-settings/create",
        });
        const filter = reactive({
            name: "",
            unit_type_id: null,
        });
        const navbar = reactive({
            title: "Payroll Settings",
            link: null,
        });

        const params = computed(() => {
            return {
                name: filter.name,
                unit_type_id: filter.unit_type_id,
                include: "unit_type",
                page: payrollSettingStore.data.pagination.page,
                per_page: payrollSettingStore.data.pagination.per_page,
            };
        });

        watch(
            () => filter,
            () => {
                loadPayrollSettings(1);
            },
            { deep: true }
        );

        const loadPayrollSettings = async (value) => {
            params.value.page = value != null ? value : params.value.page;

            await payrollSettingStore.get(params.value);
        };

        const loadUnitTypes = async () => {
            await unitTypeStore.get();
        };

        onMounted(() => {
            document.title = `Admin Panel - ${route.meta.title}`;
            loadPayrollSettings();
            loadUnitTypes();
        });

        const handleDelete = async (id) => {
            await payrollSettingStore.deleteItem(id);
            loadPayrollSettings(1);
        };

        const clearFilter = () => {
            filter.name = "";
            filter.unit_type_id = null;
        };

        const changePage = async (value) => {
            await loadPayrollSettings(value);
        };

        return { payrollSettingStore, unitTypeStore, handleDelete, title, filter, navbar, clearFilter, changePage };
    },
};
</script>
