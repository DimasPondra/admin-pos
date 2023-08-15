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

            <router-link to="/sellers" class="sidebar-item" :class="route.meta.name_page == 'sellers' ? 'active' : ''">
                <font-awesome-icon icon="fa-solid fa-shop" />
                <span>Seller</span>
            </router-link>

            <h5 class="sidebar-title">User</h5>

            <router-link to="/roles" class="sidebar-item" :class="route.meta.name_page == 'roles' ? 'active' : ''">
                <font-awesome-icon icon="fa-solid fa-user-shield" />
                <span>Role</span>
            </router-link>

            <router-link to="/users" class="sidebar-item" :class="route.meta.name_page == 'users' ? 'active' : ''">
                <font-awesome-icon icon="fa-solid fa-user" />
                <span>User</span>
            </router-link>

            <router-link
                to="/salaries"
                class="sidebar-item"
                :class="route.meta.name_page == 'salaries' ? 'active' : ''"
            >
                <font-awesome-icon icon="fa-solid fa-dollar-sign" />
                <span>Salary</span>
            </router-link>

            <h5 class="sidebar-title">Transaction</h5>

            <router-link
                to="/transactions"
                class="sidebar-item"
                :class="route.meta.name_page == 'transactions' ? 'active' : ''"
            >
                <font-awesome-icon icon="fa-solid fa-file-invoice" />
                <span>Transaction</span>
            </router-link>

            <h5 class="sidebar-title">Setting</h5>

            <router-link
                to="/expense-types"
                class="sidebar-item"
                :class="route.meta.name_page == 'expense-types' ? 'active' : ''"
            >
                <font-awesome-icon icon="fa-solid fa-list-check" />
                <span>Expense Type</span>
            </router-link>

            <router-link
                to="/unit-types"
                class="sidebar-item"
                :class="route.meta.name_page == 'unit-types' ? 'active' : ''"
            >
                <font-awesome-icon icon="fa-solid fa-percent" />
                <span>Unit Type</span>
            </router-link>

            <router-link
                to="/payroll-settings"
                class="sidebar-item"
                :class="route.meta.name_page == 'payroll-settings' ? 'active' : ''"
            >
                <font-awesome-icon icon="fa-solid fa-receipt" />
                <span>Payroll Setting</span>
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
