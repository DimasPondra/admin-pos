<template>
    <div class="col-12 statistics-card">
        <form @submit.prevent="handleSubmit">
            <div class="form-group mb-3">
                <label for="name" class="mb-2">
                    Name
                    <span class="required">*</span>
                </label>
                <input type="text" class="form-control" id="name" v-model="sellerStore.data.seller.name" />
            </div>

            <div class="d-flex justify-content-end">
                <button class="btn btn-sm btn-success">Save</button>
            </div>
        </form>
    </div>
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
            document.title = `Admin Panel - ${route.meta.title}`;
            if (route.params.id != undefined) {
                loadSeller();
            }
        });

        return { sellerStore, handleSubmit };
    },
};
</script>
