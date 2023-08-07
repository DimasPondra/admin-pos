<template>
    <div class="col-12 statistics-card">
        <form @submit.prevent="handleSubmit">
            <div class="form-group mb-3">
                <label for="name" class="mb-2">
                    Name
                    <span class="required">*</span>
                </label>
                <input type="text" class="form-control" id="name" v-model="productStore.data.product.name" />
            </div>

            <div class="form-group mb-3">
                <label for="description" class="mb-2"> Description </label>
                <textarea
                    class="form-control"
                    id="description"
                    rows="5"
                    v-model="productStore.data.product.description"
                ></textarea>
            </div>

            <div class="row">
                <div class="col-sm-12 col-md-4">
                    <div class="form-group mb-3">
                        <label for="price" class="mb-2">
                            Price
                            <span class="required">*</span>
                        </label>
                        <input
                            type="number"
                            class="form-control"
                            id="price"
                            v-model="productStore.data.product.price"
                        />
                    </div>
                </div>

                <div class="col-sm-12 col-md-4">
                    <div class="form-group mb-3">
                        <label for="amount" class="mb-2">
                            Amount
                            <span class="required">*</span>
                        </label>
                        <input
                            type="number"
                            class="form-control"
                            id="amount"
                            v-model="productStore.data.product.amount"
                        />
                    </div>
                </div>

                <div class="col-sm-12 col-md-4">
                    <div class="form-group mb-3">
                        <label for="product_type_id" class="mb-2">
                            Product Type
                            <span class="required">*</span>
                        </label>
                        <select
                            id="product_type_id"
                            class="form-select"
                            v-model="productStore.data.product.product_type_id"
                        >
                            <option
                                v-for="product_type in productTypeStore.data.product_types"
                                :key="product_type.id"
                                :value="product_type.id"
                            >
                                {{ product_type.name }}
                            </option>
                        </select>
                    </div>
                </div>
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
