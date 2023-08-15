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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useTransactionStore } from "../../stores/transactions";
import { reactive, onMounted } from "vue";
import { useRoute } from "vue-router";

import Navbar from "../../components/Navbar.vue";
import TableTransaction from "../../components/tables/TableTransaction.vue";
import TittlePage from "../../components/TittlePage.vue";

export default {
    components: {
        Navbar,
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

        const loadTransactions = async () => {
            await transactionStore.get();
        };

        onMounted(() => {
            document.title = `Admin Panel - ${route.meta.title}`;
            loadTransactions();
        });

        return { transactionStore, title, navbar };
    },
};
</script>
