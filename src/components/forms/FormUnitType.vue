<template>
    <div class="">
        <router-link to="/unit-types">Back</router-link>
    </div>
    <br />
    <form @submit.prevent="handleSubmit">
        <input type="text" v-model="unitTypeStore.data.unit_type.name" />
        <br />
        <button>Save</button>
    </form>
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
            if (route.params.id != undefined) {
                loadUnitType();
            }
        });

        return { unitTypeStore, handleSubmit };
    },
};
</script>
