<template>
    <section v-if="route.meta.name_page == 'login'">
        <LayoutDefault />
    </section>
    <section v-else>
        <LayoutDashboard />
    </section>
</template>

<script>
import { useRoute } from "vue-router";

import LayoutDashboard from "./components/layouts/LayoutDashboard.vue";
import LayoutDefault from "./components/layouts/LayoutDefault.vue";

export default {
    components: {
        LayoutDashboard,
        LayoutDefault,
    },
    setup() {
        const route = useRoute();

        return { route };
    },
};
</script>
