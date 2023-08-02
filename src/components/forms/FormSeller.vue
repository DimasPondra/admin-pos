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
import { useSellerStore } from "../../stores/sellers";

export default {
    setup() {
        const sellerStore = useSellerStore();

        const handleSubmit = async () => {
            await sellerStore.save(sellerStore.data.seller);
        };

        return { sellerStore, handleSubmit };
    },
};
</script>
