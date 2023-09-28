<template>
    <div class="col-12 col-xl-9">
        <Navbar :navbar="navbar" @clicked="$emit('hide', 'open')" />

        <div class="content">
            <div class="row">
                <div class="col-12 col-md-8">
                    <div class="statistics-card p-0">
                        <FilterProduct
                            :filter="filter"
                            :product_types="productTypeStore.data.product_types"
                            @clear_filter="clearFilter"
                        />

                        <div class="row">
                            <div
                                class="col-6 col-md-4 col-lg-3 px-1 mb-2"
                                v-for="product in productStore.data.products"
                                :key="product.id"
                            >
                                <div class="card">
                                    <img src="@/assets/logo.svg" class="card-img-top image" alt="image" />
                                    <div class="card-body">
                                        <h6 class="card-title">{{ product.name }}</h6>
                                        <small>
                                            <p class="card-text">Rp {{ product.price }}</p>
                                        </small>
                                    </div>
                                    <a @click="handleSubmit(product.id)" class="btn btn-primary btn-sm d-block">Add</a>
                                </div>
                            </div>
                        </div>

                        <Pagination :pagination="productStore.data.pagination" @current_page="changePage" />
                    </div>
                </div>

                <div class="col-12 col-md-4">
                    <div class="statistics-card p-0">
                        <div class="card">
                            <div class="card-body overflow-y-auto custom-card">
                                <ul class="list-group list-group-flush">
                                    <li
                                        v-for="cart in cartStore.data.carts"
                                        :key="cart.id"
                                        class="list-group-item px-2"
                                    >
                                        <h6 class="mb-1">{{ cart.product.name }}</h6>
                                        <p class="mb-0">Rp {{ cart.product.price }}</p>
                                        <p class="text-end mb-0">
                                            <font-awesome-icon icon="fa-solid fa-minus" @click="handleMinus(cart.id)" />
                                            <span class="mx-3">
                                                {{ cart.amount }}
                                            </span>
                                            <font-awesome-icon icon="fa-solid fa-plus" @click="handlePlus(cart.id)" />
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div class="card mt-3">
                            <div class="card-body">
                                <h6 class="mb-1">Total</h6>
                                <p class="text-end mb-0">Rp {{ total }}</p>
                            </div>
                            <a class="btn btn-sm btn-success d-block" @click="handlePayment">Pay</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from "../../components/Navbar.vue";

import { reactive, onMounted, computed, watch } from "vue";
import { useProductStore } from "../../stores/products";
import { useCartStore } from "../../stores/carts";
import { useRoute } from "vue-router";
import { useProductTypeStore } from "../../stores/product-types";
import { useTransactionStore } from "../../stores/transactions";

import Pagination from "../../components/Pagination.vue";
import FilterProduct from "../../components/filters/FilterProduct.vue";

export default {
    components: { Navbar, Pagination, FilterProduct },
    setup() {
        const route = useRoute();
        const productStore = useProductStore();
        const cartStore = useCartStore();
        const productTypeStore = useProductTypeStore();
        const transactionStore = useTransactionStore();
        const navbar = reactive({
            title: "Carts",
            link: null,
        });
        const filter = reactive({
            name: "",
            product_type_id: null,
        });

        const cartParams = computed(() => {
            return {
                include: "product",
            };
        });

        const productParams = computed(() => {
            return {
                name: filter.name,
                product_type_id: filter.product_type_id,
                page: productStore.data.pagination.page,
                per_page: 8,
            };
        });

        watch(
            () => filter,
            () => {
                loadProducts(1);
            },
            { deep: true }
        );

        const total = computed(() => {
            const items = cartStore.data.carts;
            let nominal = 0;

            items.forEach((item) => {
                nominal += item.amount * parseInt(item.product.price);
            });

            return nominal;
        });

        const loadProducts = async (value) => {
            productParams.value.page = value != null ? value : productParams.value.page;

            await productStore.get(productParams.value);
        };

        const loadProductTypes = async () => {
            await productTypeStore.get();
        };

        const loadCarts = async () => {
            await cartStore.get(cartParams.value);
        };

        const handleSubmit = async (id) => {
            const data = reactive({
                product_id: id,
                amount: 1,
            });

            await cartStore.save(data);

            loadCarts();
        };

        const handlePlus = async (id) => {
            await cartStore.show(id);

            const changeAmount = reactive({
                amount: cartStore.data.cart.amount + 1,
            });

            await cartStore.save(changeAmount, id);

            loadCarts();
        };

        const handleMinus = async (id) => {
            await cartStore.show(id);

            if (cartStore.data.cart.amount == 1) {
                await cartStore.deleteItem(id);
            } else {
                const changeAmount = reactive({
                    amount: cartStore.data.cart.amount - 1,
                });

                await cartStore.save(changeAmount, id);
            }

            loadCarts();
        };

        onMounted(() => {
            document.title = `Cashier Panel - ${route.meta.title}`;
            loadProducts();
            loadProductTypes();
            loadCarts();
        });

        const clearFilter = () => {
            filter.name = "";
            filter.product_type_id = null;
        };

        const changePage = async (value) => {
            await loadProducts(value);
        };

        const handlePayment = async () => {
            await transactionStore.save(null);

            loadCarts();
        };

        return {
            productStore,
            productTypeStore,
            total,
            cartStore,
            handleSubmit,
            handlePlus,
            handleMinus,
            clearFilter,
            changePage,
            handlePayment,
            navbar,
            filter,
        };
    },
};
</script>

<style scoped>
.image {
    height: 80px;
    object-fit: cover;
}

.custom-card {
    height: 300px;
}
</style>
