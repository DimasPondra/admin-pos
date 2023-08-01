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
</template>

<script>
import { useProductTypeStore } from "../../stores/product-types";
import { useProductStore } from "../../stores/products";
import { onMounted, computed, reactive, watch } from "vue";

export default {
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
            };
        });

        watch(
            () => filter.name,
            () => {
                loadProducts();
            }
        );

        watch(
            () => filter.product_type_id,
            () => {
                loadProducts();
            }
        );

        const loadProducts = async () => {
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
            loadProducts();
        };

        const clearFilter = () => {
            filter.name = "";
            filter.product_type_id = null;
            loadProducts();
        };

        return { filter, productStore, productTypeStore, handleDelete, clearFilter };
    },
};
</script>
