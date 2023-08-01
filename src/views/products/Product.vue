<template>
    <div>
        <router-link to="/products/create">create</router-link>
        <br /><br />
        <input type="text" v-model="filter.name" placeholder="search name" />
        <select id="product_type_id" v-model="filter.product_type_id">
            <option :value="null" selected disabled>Choose</option>
            <option
                v-for="product_type in productTypeStore.data.product_types"
                :key="product_type.id"
                :value="product_type.id"
            >
                {{ product_type.name }}
            </option>
        </select>
        <button @click="clearFilter">clear</button>
    </div>
    <br />
    <div v-for="product in productStore.data.products" :key="product.id">
        <div>
            {{ product.name }}
            <br />
            {{ product.slug }}
            <br />
            <router-link :to="`products/${product.id}/edit`">edit</router-link>
            <br />
            <button onclick="return confirm('Are you sure to delete?')" @click="handleDelete(product.id)">
                delete
            </button>
        </div>
        <br />
    </div>

    <Pagination :pagination="productStore.data.pagination" @current_page="changePage" />
</template>

<script>
import { useProductTypeStore } from "../../stores/product-types";
import { useProductStore } from "../../stores/products";
import { onMounted, computed, reactive, watch } from "vue";
import Pagination from "../../components/Pagination.vue";

export default {
    components: {
        Pagination,
    },
    setup() {
        const productStore = useProductStore();
        const productTypeStore = useProductTypeStore();
        const filter = reactive({
            name: "",
            product_type_id: null,
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
            () => filter.name,
            () => {
                loadProducts(1);
            }
        );

        watch(
            () => filter.product_type_id,
            () => {
                loadProducts(1);
            }
        );

        const loadProducts = async (value) => {
            params.value.page = value != null ? value : params.value.page;

            await productStore.get(params.value);
        };

        const loadProductTypes = async () => {
            await productTypeStore.get();
        };

        onMounted(() => {
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
            loadProducts(1);
        };

        const changePage = async (value) => {
            await loadProducts(value);
        };

        return { filter, productStore, productTypeStore, handleDelete, clearFilter, changePage };
    },
};
</script>
