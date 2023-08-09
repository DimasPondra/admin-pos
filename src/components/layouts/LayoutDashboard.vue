<template>
    <div class="screen-cover d-xl-none" :class="style.cover"></div>

    <div class="row" v-if="authStore.ability == 'admin'">
        <Sidebar :navbar="style.navbar" @closed="toggleNavbar" />

        <RouterView @hide="toggleNavbar" />
    </div>

    <div class="row" v-else-if="authStore.ability == 'finance'">
        <SidebarFinance :navbar="style.navbar" @closed="toggleNavbar" />

        <RouterView @hide="toggleNavbar" />
    </div>

    <div class="row" v-else-if="authStore.ability == 'cashier'">
        <SidebarCashier :navbar="style.navbar" @closed="toggleNavbar" />

        <RouterView @hide="toggleNavbar" />
    </div>
</template>

<script>
import Sidebar from "../Sidebar.vue";
import SidebarCashier from "../SidebarCashier.vue";
import SidebarFinance from "../SidebarFinance.vue";

import { reactive } from "vue";
import { RouterView } from "vue-router";
import { useAuthStore } from "../../stores/auth";

export default {
    components: {
        Sidebar,
        SidebarCashier,
        SidebarFinance,
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

        const authStore = useAuthStore();

        return { style, toggleNavbar, authStore };
    },
};
</script>
