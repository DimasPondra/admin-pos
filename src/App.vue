<template>
    <section v-if="route.meta.name_page == 'login'">
        <LayoutDefault />
    </section>
    <section v-else>
        <LayoutDashboardAdmin />
    </section>
</template>

<script>
import { useRoute } from "vue-router";

import LayoutDashboardAdmin from "./components/layouts/LayoutDashboardAdmin.vue";
import LayoutDefault from "./components/layouts/LayoutDefault.vue";

export default {
    components: {
        LayoutDashboardAdmin,
        LayoutDefault,
    },
    setup() {
        const route = useRoute();

        return { route };
    },
};
</script>
