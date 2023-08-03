<template>
    <div class="row">
        <TittlePage :title="title" />

        <FilterSeller :filter="filter" @clear_filter="clearFilter" />

        <div class="col-12">
            <div class="statistics-card">
                <div class="table-responsive">
                    <TableSeller :sellers="sellerStore.data.sellers" @delete_seller="handleDelete" />

                    <Pagination :pagination="sellerStore.data.pagination" @current_page="changePage" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useSellerStore } from "../../stores/sellers";
import { onMounted, reactive, computed, watch } from "vue";

import FilterSeller from "../../components/filters/FilterSeller.vue";
import Pagination from "../../components/Pagination.vue";
import TableSeller from "../../components/tables/TableSeller.vue";
import TittlePage from "../../components/TittlePage.vue";

export default {
    components: {
        FilterSeller,
        Pagination,
        TableSeller,
        TittlePage,
    },
    setup() {
        const sellerStore = useSellerStore();
        const title = reactive({
            name: "Seller",
            link_create: "/sellers/create",
        });
        const filter = reactive({
            name: "",
        });

        const params = computed(() => {
            return {
                name: filter.name,
                page: sellerStore.data.pagination.page,
                per_page: sellerStore.data.pagination.per_page,
            };
        });

        watch(
            () => filter.name,
            () => {
                loadSellers(1);
            }
        );

        const loadSellers = async (value) => {
            params.value.page = value != null ? value : params.value.page;

            await sellerStore.get(params.value);
        };

        onMounted(() => {
            loadSellers();
        });

        const handleDelete = async (id) => {
            await sellerStore.deleteItem(id);
            loadSellers(1);
        };

        const clearFilter = () => {
            filter.name = "";
        };

        const changePage = async (value) => {
            await loadSellers(value);
        };

        return { sellerStore, handleDelete, title, filter, clearFilter, changePage };
    },
};
</script>
