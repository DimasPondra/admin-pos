<template>
    <div class="">
        <router-link to="/sellers/create">create</router-link>
        <br /><br />
        <input type="text" v-model="filter.name" placeholder="search name" />
        <button @click="clearFilter">clear</button>
    </div>
    <br />
    <div v-for="seller in sellerStore.data.sellers" :key="seller.id">
        <div>
            {{ seller.name }}
            <br />
            {{ seller.slug }}
            <br />
            <!-- <router-link :to="`product-types/${seller.id}/edit`">edit</router-link>
            <br />
            <button
                class="btn btn-sm btn-danger"
                onclick="return confirm('Are you sure to delete?')"
                @click="handleDelete(seller.id)"
            >
                delete
            </button> -->
        </div>
        <br />
    </div>

    <Pagination :pagination="sellerStore.data.pagination" @current_page="changePage" />
</template>

<script>
import { useSellerStore } from "../../stores/sellers";
import { onMounted, reactive, computed, watch } from "vue";
import Pagination from "../../components/Pagination.vue";

export default {
    components: {
        Pagination,
    },
    setup() {
        const sellerStore = useSellerStore();
        const filter = reactive({
            name: "",
        });

        const params = computed(() => {
            return {
                name: filter.name,
                page: sellerStore.data.pagination.page,
                per_page: sellerStore.data.pagination.per_page,
            };
        });

        watch(
            () => filter.name,
            () => {
                loadSellers(1);
            }
        );

        const loadSellers = async (value) => {
            params.value.page = value != null ? value : params.value.page;

            await sellerStore.get(params.value);
        };

        onMounted(() => {
            loadSellers();
        });

        const clearFilter = () => {
            filter.name = "";
        };

        const changePage = async (value) => {
            await loadSellers(value);
        };

        return { sellerStore, filter, clearFilter, changePage };
    },
};
</script>
