<template>
    <div class="col-12 statistics-card">
        <form @submit.prevent="handleSubmit">
            <div v-if="route.params.id == undefined">
                <div class="form-group mb-3">
                    <label for="user_id" class="mb-2">
                        User
                        <span class="required">*</span>
                    </label>
                    <select id="user_id" class="form-select" v-model="payrollStore.data.payroll.user_id">
                        <option :value="null" selected disabled>Choose</option>
                        <option v-for="user in userStore.data.users" :key="user.id" :value="user.id">
                            {{ user.username }}
                        </option>
                    </select>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12 col-md-6">
                    <div class="form-group mb-3">
                        <label for="status" class="mb-2">
                            Status
                            <span class="required">*</span>
                        </label>
                        <select id="status" class="form-select" v-model="payrollStore.data.payroll.status">
                            <option :value="null" selected disabled>Choose</option>
                            <option value="Pending">Pending</option>
                            <option value="Paid">Paid</option>
                        </select>
                    </div>
                </div>
                <div class="col-sm-12 col-md-6">
                    <div class="form-group mb-3">
                        <label for="date" class="mb-2">
                            Payment Date
                            <span class="required" v-if="payrollStore.data.payroll.status == 'Paid'">*</span>
                        </label>
                        <input
                            type="date"
                            class="form-control"
                            id="date"
                            v-model="payrollStore.data.payroll.payment_date"
                        />
                    </div>
                </div>
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
import { useUserStore } from "../../stores/users";

export default {
    setup() {
        const payrollStore = usePayrollStore();
        const userStore = useUserStore();
        const route = useRoute();

        const params = computed(() => {
            return { include: "user" };
        });

        const handleSubmit = async () => {
            await payrollStore.save(payrollStore.data.payroll, route.params.id);
        };

        const loadUsers = async () => {
            await userStore.get();
        };

        const loadPayroll = async () => {
            await payrollStore.show(route.params.id, params.value);
        };

        onMounted(() => {
            document.title = `Finance Panel - ${route.meta.title}`;
            if (route.params.id != undefined) {
                loadPayroll();
            }
            loadUsers();
        });

        return { payrollStore, userStore, route, handleSubmit };
    },
};
</script>
