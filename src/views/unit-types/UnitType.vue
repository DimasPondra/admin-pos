<template>
    <div class="col-12 col-xl-9">
        <Navbar :navbar="navbar" @clicked="$emit('hide', 'open')" />

        <div class="content">
            <div class="row">
                <TittlePage :title="title" />

                <FilterUnitType :filter="filter" @clear_filter="clearFilter" />

                <div class="col-12">
                    <div class="statistics-card">
                        <div class="table-responsive">
                            <TableUnitType
                                :unit_types="unitTypeStore.data.unit_types"
                                @delete_unit_type="handleDelete"
                            />

                            <Pagination :pagination="unitTypeStore.data.pagination" @current_page="changePage" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useUnitTypeStore } from "../../stores/unit-types";
import { onMounted, reactive, computed, watch } from "vue";
import { useRoute } from "vue-router";

import Navbar from "../../components/Navbar.vue";
import FilterUnitType from "../../components/filters/FilterUnitType.vue";
import Pagination from "../../components/Pagination.vue";
import TableUnitType from "../../components/tables/TableUnitType.vue";
import TittlePage from "../../components/TittlePage.vue";

export default {
    components: {
        Navbar,
        FilterUnitType,
        Pagination,
        TableUnitType,
        TittlePage,
    },
    setup() {
        const route = useRoute();
        const unitTypeStore = useUnitTypeStore();
        const title = reactive({
            name: "Unit Type",
            link_create: "/unit-types/create",
        });
        const filter = reactive({
            name: "",
        });
        const navbar = reactive({
            title: "Unit Types",
            link: null,
        });

        const params = computed(() => {
            return {
                name: filter.name,
                page: unitTypeStore.data.pagination.page,
                per_page: unitTypeStore.data.pagination.per_page,
            };
        });

        watch(
            () => filter.name,
            () => {
                loadUnitTypes(1);
            }
        );

        const loadUnitTypes = async (value) => {
            params.value.page = value != null ? value : params.value.page;

            await unitTypeStore.get(params.value);
        };

        onMounted(() => {
            document.title = `Admin Panel - ${route.meta.title}`;
            loadUnitTypes();
        });

        const handleDelete = async (id) => {
            await unitTypeStore.deleteItem(id);
            loadUnitTypes(1);
        };

        const clearFilter = () => {
            filter.name = "";
        };

        const changePage = async (value) => {
            await loadUnitTypes(value);
        };

        return { unitTypeStore, handleDelete, title, filter, navbar, clearFilter, changePage };
    },
};
</script>
