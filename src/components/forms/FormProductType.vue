<template>
    <div class="col-12 statistics-card">
        <form @submit.prevent="handleSubmit">
            <div class="form-group mb-3">
                <label for="name" class="mb-2">
                    Name
                    <span class="required">*</span>
                </label>
                <input type="text" class="form-control" id="name" v-model="productTypeStore.data.product_type.name" />
            </div>

            <div class="d-flex justify-content-end">
                <button class="btn btn-sm btn-success">Save</button>
            </div>
        </form>
    </div>
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
