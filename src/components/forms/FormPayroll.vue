<template>
    <div class="col-12 statistics-card">
        <form @submit.prevent="handleSubmit">
            <div class="form-group mb-3">
                <label for="date" class="mb-2">
                    Payment Date
                    <span class="required">*</span>
                </label>
                <input type="date" class="form-control" id="date" v-model="payrollStore.data.payroll.payment_date" />
            </div>

            <div class="d-flex justify-content-end">
                <button class="btn btn-sm btn-success">Save</button>
            </div>
        </form>
    </div>
</template>

<script>
import { useRoute } from "vue-router";
import { onMounted, computed } from "vue";
import { usePayrollStore } from "../../stores/payrolls";

export default {
    setup() {
        const payrollStore = usePayrollStore();
        const route = useRoute();

        const params = computed(() => {
            return { include: "user" };
        });

        const handleSubmit = async () => {
            await payrollStore.save(payrollStore.data.payroll, route.params.id);
        };

        const loadPayroll = async () => {
            await payrollStore.show(route.params.id, params.value);
        };

        onMounted(() => {
            document.title = `Finance Panel - ${route.meta.title}`;
            if (route.params.id != undefined) {
                loadPayroll();
            }
        });

        return { payrollStore, handleSubmit };
    },
};
</script>
