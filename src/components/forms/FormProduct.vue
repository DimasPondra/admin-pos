<template>
    <div>
        <router-link to="/products">Back</router-link>
    </div>
    <br />
    <form @submit.prevent="handleSubmit">
        <div>
            <label for="name">Name</label>
            <input type="text" id="name" v-model="productStore.data.product.name" />
            <br />
        </div>

        <div>
            <label for="description">Description</label>
            <input type="text" id="description" v-model="productStore.data.product.description" />
            <br />
        </div>

        <div>
            <label for="price">Price</label>
            <input type="number" id="price" v-model="productStore.data.product.price" />
            <br />
        </div>

        <div>
            <label for="amount">Amount</label>
            <input type="number" id="amount" v-model="productStore.data.product.amount" />
            <br />
        </div>

        <div>
            <label for="product_type_id">Product Type</label>
            <select id="product_type_id" v-model="productStore.data.product.product_type_id">
                <option
                    v-for="product_type in productTypeStore.data.product_types"
                    :key="product_type.id"
                    :value="product_type.id"
                >
                    {{ product_type.name }}
                </option>
            </select>
            <br />
        </div>

        <button>Save</button>
    </form>
</template>

<script>
import { useRoute } from "vue-router";
import { useProductTypeStore } from "../../stores/product-types";
import { useProductStore } from "../../stores/products";
import { onMounted, computed } from "vue";

export default {
    setup() {
        const productStore = useProductStore();
        const productTypeStore = useProductTypeStore();
        const route = useRoute();

        const params = computed(() => {
            return { include: "product_type" };
        });

        const handleSubmit = async () => {
            await productStore.save(productStore.data.product, route.params.id);
        };

        const loadProductTypes = async () => {
            await productTypeStore.get();
        };

        const loadProduct = async () => {
            await productStore.show(route.params.id, params.value);
        };

        onMounted(() => {
            loadProductTypes();
            if (route.params.id != undefined) {
                loadProduct();
            }
        });

        return { productStore, productTypeStore, handleSubmit };
    },
};
</script>
