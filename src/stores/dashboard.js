import axios from "axios";
import { defineStore } from "pinia";
import { reactive } from "vue";
import { useAuthStore } from "./auth";
import { useAlertStore } from "./alerts";

export const useDashboardStore = defineStore("dashboard", () => {
    const data = reactive({
        chartData: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [
                {
                    label: "Purchase",
                    backgroundColor: "#EB6440",
                    data: [],
                    borderWidth: 2,
                    borderRadius: 5,
                },
                {
                    label: "Payroll",
                    backgroundColor: "#F7B633",
                    data: [],
                    borderWidth: 2,
                    borderRadius: 5,
                },
                {
                    label: "Transaction",
                    backgroundColor: "#03C988",
                    data: [],
                    borderWidth: 2,
                    borderRadius: 5,
                },
            ],
        },
        chartOptions: {
            responsive: true,
            plugins: {
                legend: {
                    position: "bottom",
                    align: "end",
                    labels: {
                        boxWidth: 10,
                    },
                },
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                    },
                },
                y: {
                    border: {
                        display: false,
                    },
                    grid: {
                        display: true,
                    },
                    ticks: {
                        callback: (value, index, values) => {
                            if (value >= 1000000) {
                                return "IDR " + (value / 1000000).toLocaleString() + "M";
                            } else if (value >= 1000) {
                                return "IDR " + (value / 1000).toLocaleString() + "K";
                            } else {
                                return "IDR " + value.toLocaleString();
                            }
                        },
                    },
                },
            },
        },
        nominal: {
            purchase: 0,
            payroll: 0,
            transaction: 0,
            income: 0,
            expense: 0,
        },
        popular_products: [],
        loading: true,
    });

    const authStore = useAuthStore();
    const alertStore = useAlertStore();

    const get = async (params) => {
        data.loading = true;

        try {
            const res = await axios.get("finance/dashboard", {
                params: params,
                headers: {
                    Authorization: authStore.token,
                },
            });

            /** Data graph */
            let purchaseDatasets = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            let payrollDatasets = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            let transactionDatasets = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

            res.data.data.graph.purchase.forEach((element) => {
                purchaseDatasets[element.month - 1] = parseFloat(element.total);
            });
            res.data.data.graph.payroll.forEach((element) => {
                payrollDatasets[element.month - 1] = parseFloat(element.total);
            });
            res.data.data.graph.transaction.forEach((element) => {
                transactionDatasets[element.month - 1] = parseFloat(element.total);
            });

            data.chartData.datasets[0].data = purchaseDatasets;
            data.chartData.datasets[1].data = payrollDatasets;
            data.chartData.datasets[2].data = transactionDatasets;

            /** Nominal income & expense */
            data.nominal.purchase = parseFloat(res.data.data.total.purchase);
            data.nominal.payroll = parseFloat(res.data.data.total.payroll);
            data.nominal.transaction = parseFloat(res.data.data.total.transaction);
            data.nominal.income = new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
            }).format(data.nominal.transaction);
            data.nominal.expense = new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
            }).format(data.nominal.purchase + data.nominal.payroll);

            /** Popular products */
            data.popular_products = res.data.data.popular_products.slice(0, 5);

            data.loading = false;
        } catch (error) {
            alertStore.handleError(error);
        }
    };

    return { data, get };
});
