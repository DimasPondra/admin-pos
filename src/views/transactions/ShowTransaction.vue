<template>
    <div class="col-12 col-xl-9">
        <Navbar :navbar="navbar" @clicked="$emit('hide', 'open')" />

        <div class="content">
            <div class="row">
                <div class="col-12">
                    <h2 class="content-title mb-4">Show Transaction</h2>
                </div>

                <div class="col-12 statistics-card mb-0">
                    <div class="card">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-12 col-md-6">
                                    <h6 class="card-title">
                                        Name: {{ transactionStore.data.transaction.user.username }}
                                    </h6>
                                    <h6 class="card-title">
                                        Items: {{ transactionStore.data.transaction.details.length }}
                                    </h6>
                                </div>
                                <div class="col-12 col-md-6">
                                    <h6 class="card-title">
                                        Sub Total: Rp {{ transactionStore.data.transaction.sub_total }}
                                    </h6>
                                    <h6 class="card-title">Total: Rp {{ transactionStore.data.transaction.total }}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-12">
                    <h2 class="content-title mb-4">Products</h2>
                </div>

                <div
                    class="col-12 col-md-3"
                    v-for="detail in transactionStore.data.transaction.details"
                    :key="detail.id"
                >
                    <div class="card mb-4">
                        <div class="card-body">
                            <h6 class="card-title mb-0">{{ detail.product.name }}</h6>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Rp {{ detail.price }}</li>
                            <li class="list-group-item">
                                {{ detail.amount }} <span v-if="detail.amount > 1">items</span>
                                <span v-else>item</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useTransactionStore } from "../../stores/transactions";
import { computed, onMounted, reactive } from "vue";
import { useRoute } from "vue-router";

import Navbar from "../../components/Navbar.vue";

export default {
    components: {
        Navbar,
    },
    setup() {
        const navbar = reactive({
            title: "Transaction",
            link: "/transactions",
        });

        const transactionStore = useTransactionStore();
        const route = useRoute();

        const params = computed(() => {
            return {
                include: "user,details,product",
            };
        });

        const loadTransaction = async () => {
            await transactionStore.show(route.params.id, params.value);
        };

        onMounted(() => {
            document.title = `Admin Panel - ${route.meta.title}`;
            loadTransaction();
        });

        return { transactionStore, navbar };
    },
};
</script>
