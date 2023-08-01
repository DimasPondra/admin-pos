<template>
    <div class="">
        <router-link to="/product-types/create">create</router-link>
        <br /><br />
        <input type="text" v-model="filter.name" placeholder="search name" />
        <button @click="clearFilter">clear</button>
    </div>
    <br />
    <div v-for="product_type in productTypeStore.data.product_types" :key="product_type.id">
        <div>
            {{ product_type.name }}
            <br />
            {{ product_type.slug }}
            <br />
            <router-link :to="`product-types/${product_type.id}/edit`">edit</router-link>
            <br />
            <button
                class="btn btn-sm btn-danger"
                onclick="return confirm('Are you sure to delete?')"
                @click="handleDelete(product_type.id)"
            >
                delete
            </button>
        </div>
        <br />
    </div>

    <Pagination :pagination="productTypeStore.data.pagination" @current_page="changePage" />
</template>

<script>
import { useProductTypeStore } from "../../stores/product-types";
import { onMounted, reactive, computed, watch } from "vue";
import "@popperjs/core";
import "bootstrap/dist/js/bootstrap.bundle";
import Pagination from "../../components/Pagination.vue";

export default {
    components: {
        Pagination,
    },
    setup() {
        const productTypeStore = useProductTypeStore();
        const filter = reactive({
            name: "",
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
            loadProductTypes();
        });

        const handleDelete = async (id) => {
            await productTypeStore.deleteItem(id);
            loadProductTypes(1);
        };

        const clearFilter = () => {
            filter.name = "";
            loadProductTypes(1);
        };

        const changePage = async (value) => {
            await loadProductTypes(value);
        };

        return { filter, productTypeStore, handleDelete, clearFilter, changePage };
    },
};
</script>
