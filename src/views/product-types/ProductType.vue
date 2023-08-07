<template>
    <div class="col-12 col-xl-9">
        <Navbar :navbar="navbar" @clicked="$emit('hide', 'open')" />

        <div class="content">
            <div class="row">
                <TittlePage :title="title" />

                <FilterProductType :filter="filter" @clear_filter="clearFilter" />

                <div class="col-12">
                    <div class="statistics-card">
                        <div class="table-responsive">
                            <TableProductType
                                :product_types="productTypeStore.data.product_types"
                                @delete_product_type="handleDelete"
                            />

                            <Pagination :pagination="productTypeStore.data.pagination" @current_page="changePage" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useProductTypeStore } from "../../stores/product-types";
import { onMounted, reactive, computed, watch } from "vue";
import { useRoute } from "vue-router";

import Navbar from "../../components/Navbar.vue";
import FilterProductType from "../../components/filters/FilterProductType.vue";
import Pagination from "../../components/Pagination.vue";
import TableProductType from "../../components/tables/TableProductType.vue";
import TittlePage from "../../components/TittlePage.vue";

export default {
    components: {
        Navbar,
        FilterProductType,
        Pagination,
        TableProductType,
        TittlePage,
    },
    setup() {
        const route = useRoute();
        const productTypeStore = useProductTypeStore();
        const title = reactive({
            name: "Product Type",
            link_create: "/product-types/create",
        });
        const filter = reactive({
            name: "",
        });
        const navbar = reactive({
            title: "Product Types",
            link: null,
        });

        const params = computed(() => {
            return {
                name: filter.name,
                page: productTypeStore.data.pagination.page,
                per_page: productTypeStore.data.pagination.per_page,
            };
        });

        watch(
            () => filter.name,
            () => {
                loadProductTypes(1);
            }
        );

        const loadProductTypes = async (value) => {
            params.value.page = value != null ? value : params.value.page;

            await productTypeStore.get(params.value);
        };

        onMounted(() => {
            document.title = `Admin Panel - ${route.meta.title}`;
            loadProductTypes();
        });

        const handleDelete = async (id) => {
            await productTypeStore.deleteItem(id);
            loadProductTypes(1);
        };

        const clearFilter = () => {
            filter.name = "";
        };

        const changePage = async (value) => {
            await loadProductTypes(value);
        };

        return { productTypeStore, handleDelete, title, filter, navbar, clearFilter, changePage };
    },
};
</script>
