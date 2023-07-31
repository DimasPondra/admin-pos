<template>
    <div class="">
        <router-link to="/product-types">Back</router-link>
    </div>
    <br />
    <form @submit.prevent="handleSubmit">
        <input type="text" v-model="productTypeStore.data.product_type.name" />
        <br />
        <button>Save</button>
    </form>
</template>

<script>
import { useRoute } from "vue-router";
import { useProductTypeStore } from "../../stores/product-types";
import { onMounted } from "vue";

export default {
    setup() {
        const productTypeStore = useProductTypeStore();
        const route = useRoute();

        const handleSubmit = async () => {
            await productTypeStore.save(productTypeStore.data.product_type, route.params.id);
        };

        const loadProductType = async () => {
            await productTypeStore.show(route.params.id);
        };

        onMounted(() => {
            if (route.params.id != undefined) {
                loadProductType();
            }
        });

        return { productTypeStore, handleSubmit };
    },
};
</script>
