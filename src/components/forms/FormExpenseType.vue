<template>
    <div class="">
        <router-link to="/expense-types">Back</router-link>
    </div>
    <br />
    <form @submit.prevent="handleSubmit">
        <input type="text" v-model="expenseTypeStore.data.expense_type.name" />
        <br />
        <button>Save</button>
    </form>
</template>

<script>
import { useRoute } from "vue-router";
import { useExpenseTypeStore } from "../../stores/expense-types";
import { onMounted } from "vue";

export default {
    setup() {
        const expenseTypeStore = useExpenseTypeStore();
        const route = useRoute();

        const handleSubmit = async () => {
            await expenseTypeStore.save(expenseTypeStore.data.expense_type, route.params.id);
        };

        const loadExpenseType = async () => {
            await expenseTypeStore.show(route.params.id);
        };

        onMounted(() => {
            if (route.params.id != undefined) {
                loadExpenseType();
            }
        });

        return { expenseTypeStore, handleSubmit };
    },
};
</script>
