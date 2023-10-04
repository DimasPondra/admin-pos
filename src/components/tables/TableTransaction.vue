<template>
    <table class="table">
        <thead>
            <tr>
                <th>Cashier Name</th>
                <th>Total <small>(items)</small></th>
                <th>Sub Total</th>
                <th>Total</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="transaction in transactions" :key="transaction.id">
                <td>{{ transaction.user.username }}</td>
                <td>{{ transaction.details.length }}</td>
                <td>Rp {{ transaction.sub_total }}</td>
                <td>Rp {{ transaction.total }}</td>
                <td width="10%">
                    <div class="dropdown">
                        <button
                            class="btn btn-outline-primary dropdown-toggle"
                            type="button"
                            id="dropdownMenu"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        ></button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenu">
                            <li>
                                <router-link
                                    :to="`/transactions/${transaction.id}/show`"
                                    class="btn btn-sm btn-link w-100 text-start"
                                    >Show</router-link
                                >
                            </li>
                            <li>
                                <button
                                    @click="generatePDF(transaction.id)"
                                    class="btn btn-sm btn-link w-100 text-start"
                                >
                                    Download PDF
                                </button>
                            </li>
                        </ul>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { useTransactionStore } from "../../stores/transactions";

export default {
    props: {
        transactions: {
            type: Array,
            default: [],
        },
    },
    setup() {
        const transactionStore = useTransactionStore();

        const generatePDF = async (id) => {
            await transactionStore.generatePDF(id);
        };

        return { generatePDF };
    },
};
</script>
