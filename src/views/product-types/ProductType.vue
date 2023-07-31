<template>
    <div class="">
        <router-link to="/product-types/create">create</router-link>
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
            <button onclick="return confirm('Are you sure to delete?')" @click="handleDelete(product_type.id)">
                delete
            </button>
        </div>
        <br />
    </div>
</template>

<script>
import { useProductTypeStore } from "../../stores/product-types";
import { onMounted } from "vue";

export default {
    setup() {
        const productTypeStore = useProductTypeStore();

        const loadProductTypes = async () => {
            await productTypeStore.get();
        };

        onMounted(() => {
            loadProductTypes();
        });

        const handleDelete = async (id) => {
            await productTypeStore.deleteItem(id);
            loadProductTypes();
        };

        return { productTypeStore, handleDelete };
    },
};
</script>
