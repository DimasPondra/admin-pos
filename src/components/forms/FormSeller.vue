<template>
    <div class="">
        <router-link to="/sellers">Back</router-link>
    </div>
    <br />
    <form @submit.prevent="handleSubmit">
        <input type="text" v-model="sellerStore.data.seller.name" />
        <br />
        <button>Save</button>
    </form>
</template>

<script>
import { useRoute } from "vue-router";
import { useSellerStore } from "../../stores/sellers";
import { onMounted } from "vue";

export default {
    setup() {
        const sellerStore = useSellerStore();
        const route = useRoute();

        const handleSubmit = async () => {
            await sellerStore.save(sellerStore.data.seller, route.params.id);
        };

        const loadSeller = async () => {
            await sellerStore.show(route.params.id);
        };

        onMounted(() => {
            if (route.params.id != undefined) {
                loadSeller();
            }
        });

        return { sellerStore, handleSubmit };
    },
};
</script>
