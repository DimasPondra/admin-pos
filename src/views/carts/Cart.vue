<template>
    <div class="col-12 col-xl-9">
        <Navbar :navbar="navbar" @clicked="$emit('hide', 'open')" />

        <div class="content">
            <div class="row">
                <div class="col-8">
                    <div class="statistics-card p-0">
                        <div class="row">
                            <div class="col-3 px-1" v-for="product in productStore.data.products" :key="product.id">
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
                    </div>
                </div>

                <div class="col-4">
                    <div class="statistics-card p-0">
                        <div class="card">
                            <div class="card-body overflow-y-auto custom-card">
                                <ul class="list-group list-group-flush">
                                    <li v-for="cart in cartStore.data.carts" :key="cart.id" class="list-group-item">
                                        <h6>{{ cart.product.name }}</h6>
                                        <p>Rp {{ cart.product.price }}</p>
                                        <p class="text-end">
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
                                <h6>Total</h6>
                                <p class="text-end">Rp {{ total }}</p>
                            </div>
                            <a class="btn btn-sm btn-success d-block">Pay</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from "../../components/Navbar.vue";

import { reactive, onMounted, computed } from "vue";
import { useProductStore } from "../../stores/products";
import { useCartStore } from "../../stores/carts";

export default {
    components: { Navbar },
    setup() {
        const productStore = useProductStore();
        const cartStore = useCartStore();
        const navbar = reactive({
            title: "Carts",
            link: null,
        });

        const cartParams = computed(() => {
            return {
                include: "product",
            };
        });

        const total = computed(() => {
            const items = cartStore.data.carts;
            let nominal = 0;

            items.forEach((item) => {
                nominal += item.amount * parseInt(item.product.price);
            });

            return nominal;
        });

        const loadProducts = async () => {
            await productStore.get();
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
            loadProducts();
            loadCarts();
        });

        return { productStore, total, cartStore, handleSubmit, handlePlus, handleMinus, navbar };
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
