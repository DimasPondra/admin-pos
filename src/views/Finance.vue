<template>
    <div class="col-12 col-xl-9">
        <Navbar :navbar="navbar" @clicked="$emit('hide', 'open')" />

        <div class="content pb-5">
            <div class="row">
                <div class="col-12 col-md-3">
                    <div class="input-group mb-3">
                        <input type="number" class="form-control" id="year" v-model="filter.year" />
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-12 col-md-8">
                    <div class="card text-bg-light">
                        <div class="card-body" v-if="dashboardStore.data.loading">Loading ....</div>
                        <div class="card-body" v-else>
                            <div class="row mb-5">
                                <div class="col-6">
                                    <span>Income</span>
                                    <h4 class="text-success">{{ dashboardStore.data.nominal.income }}</h4>
                                </div>
                                <div class="col-6">
                                    <span>Expense</span>
                                    <h4 class="text-danger">{{ dashboardStore.data.nominal.expense }}</h4>
                                </div>
                            </div>
                            <Bar
                                id="my-chart-id"
                                :options="dashboardStore.data.chartOptions"
                                :data="dashboardStore.data.chartData"
                            />
                        </div>
                    </div>
                </div>

                <div class="col-12 col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <h5>5 Popular Products</h5>
                            <ul class="list-group list-group-flush mt-3">
                                <li
                                    class="list-group-item px-0"
                                    v-for="(product, index) in dashboardStore.data.popular_products"
                                    :key="index"
                                >
                                    <h6>{{ product.product_name }}</h6>
                                    <p class="mb-0">
                                        <small>Sold {{ product.total }} items.</small>
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, reactive, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useDashboardStore } from "../stores/dashboard";

import Navbar from "../components/Navbar.vue";
import { Bar } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
    components: { Navbar, Bar },
    setup() {
        const route = useRoute();
        const dashboardStore = useDashboardStore();
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

        watch(
            () => filter.year,
            () => {
                loadData();
            }
        );

        const loadData = async () => {
            await dashboardStore.get(params.value);
        };

        onMounted(() => {
            document.title = `Finance Panel - ${route.meta.title}`;
            loadData();
        });

        return { navbar, filter, dashboardStore };
    },
};
</script>
