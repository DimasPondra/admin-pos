<template>
    <div class="col-12 col-xl-9">
        <Navbar :navbar="navbar" @clicked="$emit('hide', 'open')" />

        <div class="content">
            <div class="row">
                <TittlePage :title="title" />

                <FilterProduct
                    :filter="filter"
                    :product_types="productTypeStore.data.product_types"
                    @clear_filter="clearFilter"
                />

                <div class="col-12">
                    <div class="statistics-card">
                        <div class="table-responsive">
                            <TableProduct :products="productStore.data.products" @delete_product="handleDelete" />

                            <Pagination :pagination="productStore.data.pagination" @current_page="changePage" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useProductTypeStore } from "../../stores/product-types";
import { useProductStore } from "../../stores/products";
import { onMounted, computed, reactive, watch } from "vue";
import { useRoute } from "vue-router";

import Navbar from "../../components/Navbar.vue";
import FilterProduct from "../../components/filters/FilterProduct.vue";
import Pagination from "../../components/Pagination.vue";
import TableProduct from "../../components/tables/TableProduct.vue";
import TittlePage from "../../components/TittlePage.vue";

export default {
    components: {
        Navbar,
        FilterProduct,
        Pagination,
        TableProduct,
        TittlePage,
    },
    setup() {
        const route = useRoute();
        const productStore = useProductStore();
        const productTypeStore = useProductTypeStore();
        const title = reactive({
            name: "Product",
            link_create: "/products/create",
        });
        const filter = reactive({
            name: "",
            product_type_id: null,
        });
        const navbar = reactive({
            title: "Products",
            link: null,
        });

        const params = computed(() => {
            return {
                name: filter.name,
                product_type_id: filter.product_type_id,
                include: "product_type",
                page: productStore.data.pagination.page,
                per_page: productStore.data.pagination.per_page,
            };
        });

        watch(
            () => filter,
            () => {
                loadProducts(1);
            },
            { deep: true }
        );

        const loadProducts = async (value) => {
            params.value.page = value != null ? value : params.value.page;

            await productStore.get(params.value);
        };

        const loadProductTypes = async () => {
            await productTypeStore.get();
        };

        onMounted(() => {
            document.title = `Admin Panel - ${route.meta.title}`;
            loadProducts();
            loadProductTypes();
        });

        const handleDelete = async (id) => {
            await productStore.deleteItem(id);
            loadProducts(1);
        };

        const clearFilter = () => {
            filter.name = "";
            filter.product_type_id = null;
        };

        const changePage = async (value) => {
            await loadProducts(value);
        };

        return { productStore, productTypeStore, handleDelete, title, filter, navbar, clearFilter, changePage };
    },
};
</script>
