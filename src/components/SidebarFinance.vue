<template>
    <div class="col-12 col-lg-3 col-navbar d-xl-block" :class="navbar">
        <aside class="sidebar">
            <router-link to="" class="sidebar-logo">
                <div class="d-flex justify-content-start align-items-center">
                    <img src="../assets/cashier_icon.png" alt="logo" width="40" />
                    <span>Finance Panel</span>
                </div>

                <button id="toggle-navbar" @click="toggleNavbar()">
                    <font-awesome-icon icon="fa-solid fa-xmark" />
                </button>
            </router-link>

            <h5 class="sidebar-title">Daily Use</h5>

            <router-link
                to="/dashboard-finance"
                class="sidebar-item"
                :class="route.meta.name_page == 'dashboard-finance' ? 'active' : ''"
            >
                <font-awesome-icon icon="fa-solid fa-house" />
                <span>Overview</span>
            </router-link>

            <h5 class="sidebar-title">Purchase</h5>

            <router-link
                to="/purchases"
                class="sidebar-item"
                :class="route.meta.name_page == 'purchases' ? 'active' : ''"
            >
                <font-awesome-icon icon="fa-solid fa-file-circle-plus" />
                <span>Purchase</span>
            </router-link>

            <h5 class="sidebar-title">Payroll</h5>

            <router-link
                to="/payrolls"
                class="sidebar-item"
                :class="route.meta.name_page == 'payrolls' ? 'active' : ''"
            >
                <font-awesome-icon icon="fa-solid fa-file-invoice-dollar" />
                <span>Payroll</span>
            </router-link>

            <h5 class="sidebar-title">Others</h5>

            <router-link
                to="/account-profiles"
                class="sidebar-item"
                :class="route.meta.name_page == 'account-profiles' ? 'active' : ''"
            >
                <font-awesome-icon icon="fa-solid fa-user-gear" />
                <span>Account Profile</span>
            </router-link>

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
