<template>
    <div class="col-12 col-xl-9">
        <Navbar :navbar="navbar" @clicked="$emit('hide', 'open')" />

        <div class="content">
            <div class="row"></div>
        </div>
    </div>
</template>

<script>
import { reactive, onMounted } from "vue";
import { useRoute } from "vue-router";

import Navbar from "../components/Navbar.vue";

export default {
    components: {
        Navbar,
    },
    setup() {
        const route = useRoute();
        const navbar = reactive({
            title: "Dashboard",
            link: null,
        });

        onMounted(() => {
            document.title = `Admin Panel - ${route.meta.title}`;
        });

        return { navbar };
    },
};
</script>
