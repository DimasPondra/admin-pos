<template>
    <div class="col-12 col-lg-3 col-navbar d-xl-block" :class="navbar">
        <aside class="sidebar">
            <router-link to="" class="sidebar-logo">
                <div class="d-flex justify-content-start align-items-center">
                    <img src="" alt="logo" />
                    <span>Admin Panel</span>
                </div>

                <button id="toggle-navbar" @click="toggleNavbar()">
                    <font-awesome-icon icon="fa-solid fa-xmark" />
                </button>
            </router-link>

            <h5 class="sidebar-title">Daily Use</h5>

            <router-link to="/" class="sidebar-item" :class="route.meta.name_page == 'dashboard' ? 'active' : ''">
                <font-awesome-icon icon="fa-solid fa-house" />
                <span>Overview</span>
            </router-link>

            <h5 class="sidebar-title">Product</h5>

            <router-link
                to="/product-types"
                class="sidebar-item"
                :class="route.meta.name_page == 'product-types' ? 'active' : ''"
            >
                <font-awesome-icon icon="fa-solid fa-tag" />
                <span>Product Type</span>
            </router-link>

            <router-link
                to="/products"
                class="sidebar-item"
                :class="route.meta.name_page == 'products' ? 'active' : ''"
            >
                <font-awesome-icon icon="fa-solid fa-store" />
                <span>Product</span>
            </router-link>
        </aside>
    </div>
</template>

<script>
import { useRoute } from "vue-router";

export default {
    props: {
        navbar: {
            type: String,
            default: "",
        },
    },
    setup(props, context) {
        const route = useRoute();

        const toggleNavbar = () => {
            context.emit("closed", "close");
        };

        return { route, toggleNavbar };
    },
};
</script>
