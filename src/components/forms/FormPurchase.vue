<template>
    <div class="col-12 statistics-card">
        <form @submit.prevent="handleSubmit">
            <div class="row">
                <div class="col-sm-12 col-md-6">
                    <div class="form-group mb-3">
                        <label for="product_id" class="mb-2">
                            Product
                            <span class="required">*</span>
                        </label>
                        <select id="product_id" class="form-select" v-model="purchaseStore.data.purchase.product_id">
                            <option :value="null" selected disabled>Choose</option>
                            <option v-for="product in productStore.data.products" :key="product.id" :value="product.id">
                                {{ product.name }}
                            </option>
                        </select>
                    </div>
                </div>

                <div class="col-sm-12 col-md-6">
                    <div class="form-group mb-3">
                        <label for="date" class="mb-2">
                            Date
                            <span class="required">*</span>
                        </label>
                        <input type="date" class="form-control" id="date" v-model="purchaseStore.data.purchase.date" />
                    </div>
                </div>
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
                            v-model="purchaseStore.data.purchase.price"
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
                            v-model="purchaseStore.data.purchase.amount"
                        />
                    </div>
                </div>

                <div class="col-sm-12 col-md-4">
                    <div class="form-group mb-3">
                        <label for="seller_id" class="mb-2">
                            Seller
                            <span class="required">*</span>
                        </label>
                        <select id="seller_id" class="form-select" v-model="purchaseStore.data.purchase.seller_id">
                            <option :value="null" selected disabled>Choose</option>
                            <option v-for="seller in sellerStore.data.sellers" :key="seller.id" :value="seller.id">
                                {{ seller.name }}
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
import { onMounted, computed } from "vue";
import { useProductStore } from "../../stores/products";
import { usePurchaseStore } from "../../stores/purchases";
import { useSellerStore } from "../../stores/sellers";

export default {
    setup() {
        const productStore = useProductStore();
        const sellerStore = useSellerStore();
        const purchaseStore = usePurchaseStore();
        const route = useRoute();

        const params = computed(() => {
            return { include: "product,seller,user" };
        });

        const handleSubmit = async () => {
            await purchaseStore.save(purchaseStore.data.purchase, route.params.id);
        };

        const loadProducts = async () => {
            await productStore.get();
        };

        const loadSellers = async () => {
            await sellerStore.get();
        };

        const loadPurchase = async () => {
            await purchaseStore.show(route.params.id, params.value);
        };

        onMounted(() => {
            document.title = `Finance Panel - ${route.meta.title}`;
            loadProducts();
            loadSellers();
            if (route.params.id != undefined) {
                loadPurchase();
            }
        });

        return { purchaseStore, productStore, sellerStore, handleSubmit };
    },
};
</script>
