<template>
    <div class="col-12 statistics-card">
        <form @submit.prevent="handleSubmit">
            <div class="form-group mb-3">
                <label for="name" class="mb-2">
                    Name
                    <span class="required">*</span>
                </label>
                <input type="text" class="form-control" id="name" v-model="unitTypeStore.data.unit_type.name" />
            </div>

            <div class="d-flex justify-content-end">
                <button class="btn btn-sm btn-success">Save</button>
            </div>
        </form>
    </div>
</template>

<script>
import { useRoute } from "vue-router";
import { useUnitTypeStore } from "../../stores/unit-types";
import { onMounted } from "vue";

export default {
    setup() {
        const unitTypeStore = useUnitTypeStore();
        const route = useRoute();

        const handleSubmit = async () => {
            await unitTypeStore.save(unitTypeStore.data.unit_type, route.params.id);
        };

        const loadUnitType = async () => {
            await unitTypeStore.show(route.params.id);
        };

        onMounted(() => {
            document.title = `Admin Panel - ${route.meta.title}`;
            if (route.params.id != undefined) {
                loadUnitType();
            }
        });

        return { unitTypeStore, handleSubmit };
    },
};
</script>
