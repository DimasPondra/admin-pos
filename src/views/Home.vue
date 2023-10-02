<template>
    <div class="col-12 col-xl-9">
        <Navbar :navbar="navbar" @clicked="$emit('hide', 'open')" />

        <div class="content pb-5">
            <div class="row">
                <div class="col-12 col-md-8">
                    <div class="card" style="max-height: 250px; overflow-y: scroll">
                        <div class="card-body">
                            <table class="table table-responsive table-striped">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Stock (items)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in adminDashboardStore.data.product_stocks" :key="item">
                                        <td>{{ item.name }}</td>
                                        <td>{{ item.amount }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="card mt-3" style="max-height: 250px; overflow-y: scroll">
                        <div class="card-body">
                            <table class="table table-responsive table-striped">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Sales (items)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in adminDashboardStore.data.product_sales" :key="item">
                                        <td>{{ item.product_name }}</td>
                                        <td>{{ item.total }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-md-4">
                    <div class="card text-bg-light">
                        <div class="card-body">
                            <div class="mb-3">
                                <span>Income</span>
                                <h5 class="text-success">{{ adminDashboardStore.data.total.income }}</h5>
                            </div>
                            <div class="">
                                <span>Expense</span>
                                <h5 class="text-danger">
                                    {{ adminDashboardStore.data.total.expense }}
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div class="card text-bg-light mt-3">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-6">
                                    <span>Allowances</span>
                                    <h3>{{ allowances }}</h3>
                                </div>
                                <div class="col-6">
                                    <span>Tax</span>
                                    <h3>{{ tax }}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useAdminDashboardStore } from "../stores/admin-dashboard";

import Navbar from "../components/Navbar.vue";
import { Bar } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
    components: { Navbar, Bar },
    setup() {
        const route = useRoute();
        const adminDashboardStore = useAdminDashboardStore();
        const navbar = reactive({
            title: "Dashboard",
            link: null,
        });

        const filter = reactive({
            year: 2023,
        });

        const params = computed(() => {
            return {
                year: filter.year,
            };
        });

        const allowances = computed(() => {
            let value = "";

            adminDashboardStore.data.payroll_setting.forEach((element) => {
                if (element.name == "allowances") {
                    value = element.nominal;

                    if (element.unit_type == "percent") {
                        value += " %";
                    }
                }
            });

            return value;
        });

        const tax = computed(() => {
            let value = "";

            adminDashboardStore.data.payroll_setting.forEach((element) => {
                if (element.name == "tax") {
                    value = element.nominal;

                    if (element.unit_type == "percent") {
                        value += " %";
                    }
                }
            });

            return value;
        });

        watch(
            () => filter.year,
            () => {
                loadData();
            }
        );

        const loadData = async () => {
            await adminDashboardStore.get(params.value);
        };

        onMounted(() => {
            document.title = `Admin Panel - ${route.meta.title}`;
            loadData();
        });

        return { navbar, filter, adminDashboardStore, allowances, tax };
    },
};
</script>
