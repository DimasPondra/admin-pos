<template>
    <div class="col-12 col-lg-3 col-navbar d-xl-block" :class="navbar">
        <aside class="sidebar">
            <router-link to="" class="sidebar-logo">
                <div class="d-flex justify-content-start align-items-center">
                    <img src="" alt="logo" />
                    <span>Cashier Panel</span>
                </div>

                <button id="toggle-navbar" @click="toggleNavbar()">
                    <font-awesome-icon icon="fa-solid fa-xmark" />
                </button>
            </router-link>

            <h5 class="sidebar-title">Cart</h5>

            <router-link to="/carts" class="sidebar-item" :class="route.meta.name_page == 'carts' ? 'active' : ''">
                <font-awesome-icon icon="fa-solid fa-file-circle-plus" />
                <span>Cart</span>
            </router-link>

            <h5 class="sidebar-title">Others</h5>

            <button @click="handleLogout" class="sidebar-item border-0">
                <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" />
                <span>Logout</span>
            </button>
        </aside>
    </div>
</template>

<script>
import { useRoute } from "vue-router";
import { useAuthStore } from "../stores/auth";

export default {
    props: {
        navbar: {
            type: String,
            default: "",
        },
    },
    setup(props, context) {
        const route = useRoute();
        const authStore = useAuthStore();

        const toggleNavbar = () => {
            context.emit("closed", "close");
        };

        const handleLogout = async () => {
            await authStore.logout();
        };

        return { route, toggleNavbar, handleLogout };
    },
};
</script>
