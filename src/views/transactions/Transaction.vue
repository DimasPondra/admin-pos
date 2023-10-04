<template>
    <div class="col-12 col-xl-9">
        <Navbar :navbar="navbar" @clicked="$emit('hide', 'open')" />

        <div class="content">
            <div class="row">
                <TittlePage :title="title" />

                <div class="col-12">
                    <div class="statistics-card">
                        <div class="table-responsive">
                            <TableTransaction :transactions="transactionStore.data.transactions" />

                            <Pagination :pagination="transactionStore.data.pagination" @current_page="changePage" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useTransactionStore } from "../../stores/transactions";
import { reactive, onMounted, computed } from "vue";
import { useRoute } from "vue-router";

import Navbar from "../../components/Navbar.vue";
import Pagination from "../../components/Pagination.vue";
import TableTransaction from "../../components/tables/TableTransaction.vue";
import TittlePage from "../../components/TittlePage.vue";

export default {
    components: {
        Navbar,
        Pagination,
        TableTransaction,
        TittlePage,
    },
    setup() {
        const route = useRoute();
        const transactionStore = useTransactionStore();
        const title = reactive({
            name: "Transaction",
            link_create: null,
        });
        const navbar = reactive({
            title: "Transactions",
            link: null,
        });

        const params = computed(() => {
            return {
                include: "user,details,product",
                page: transactionStore.data.pagination.page,
                per_page: transactionStore.data.pagination.per_page,
            };
        });

        const loadTransactions = async (value) => {
            params.value.page = value != null ? value : params.value.page;

            await transactionStore.get(params.value);
        };

        onMounted(() => {
            document.title = `Admin Panel - ${route.meta.title}`;
            loadTransactions();
        });

        const changePage = async (value) => {
            await loadTransactions(value);
        };

        return { transactionStore, title, navbar, changePage };
    },
};
</script>
