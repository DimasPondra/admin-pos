<template>
    <div class="col-12 col-xl-9">
        <Navbar :navbar="navbar" @clicked="$emit('hide', 'open')" />

        <div class="content">
            <div class="row">
                <TittlePage :title="title" />

                <div class="col-12">
                    <div class="statistics-card">
                        <div class="table-responsive">
                            <TablePurchase :purchases="purchaseStore.data.purchases" @delete_purchase="handleDelete" />

                            <Pagination :pagination="purchaseStore.data.pagination" @current_page="changePage" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { usePurchaseStore } from "../../stores/purchases";
import { useRoute } from "vue-router";
import { reactive, onMounted, computed } from "vue";

import Pagination from "../../components/Pagination.vue";
import TablePurchase from "../../components/tables/TablePurchase.vue";
import Navbar from "../../components/Navbar.vue";
import TittlePage from "../../components/TittlePage.vue";

export default {
    components: { TablePurchase, Pagination, Navbar, TittlePage },
    setup() {
        const route = useRoute();
        const purchaseStore = usePurchaseStore();
        const title = reactive({
            name: "Purchase",
            link_create: "/purchases/create",
        });
        const navbar = reactive({
            title: "Purchases",
            link: null,
        });

        const params = computed(() => {
            return {
                include: "product,seller,user",
                page: purchaseStore.data.pagination.page,
                per_page: purchaseStore.data.pagination.per_page,
            };
        });

        const loadPurchases = async (value) => {
            params.value.page = value != null ? value : params.value.page;

            await purchaseStore.get(params.value);
        };

        onMounted(() => {
            document.title = `Finance Panel - ${route.meta.title}`;
            loadPurchases();
        });

        const handleDelete = async (id) => {
            await purchaseStore.deleteItem(id);
            loadPurchases(1);
        };

        const changePage = async (value) => {
            await loadPurchases(value);
        };

        return { purchaseStore, handleDelete, title, navbar, changePage };
    },
};
</script>
