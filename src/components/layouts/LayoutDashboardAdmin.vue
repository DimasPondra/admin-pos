<template>
    <div class="screen-cover d-xl-none" :class="style.cover"></div>

    <div class="row">
        <Sidebar :navbar="style.navbar" @closed="toggleNavbar" />

        <RouterView @hide="toggleNavbar" />
    </div>
</template>

<script>
import Sidebar from "../Sidebar.vue";
import { reactive } from "vue";
import { RouterView } from "vue-router";

export default {
    components: {
        Sidebar,
    },
    setup() {
        const style = reactive({
            cover: "d-none",
            navbar: "d-none",
        });

        const toggleNavbar = (value) => {
            if (value == "open") {
                style.cover = "";
                style.navbar = "";
            } else {
                style.cover = "d-none";
                style.navbar = "d-none";
            }
        };

        return { style, toggleNavbar };
    },
};
</script>
