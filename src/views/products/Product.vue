<template>
    <div>
        <router-link to="/products/create">create</router-link>
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
import { useProductStore } from "../../stores/products";
import { onMounted } from "vue";

export default {
    setup() {
        const productStore = useProductStore();

        const loadProducts = async () => {
            await productStore.get();
        };

        onMounted(() => {
            loadProducts();
        });

        const handleDelete = async (id) => {
            await productStore.deleteItem(id);
            loadProducts();
        };

        return { productStore, handleDelete };
    },
};
</script>
