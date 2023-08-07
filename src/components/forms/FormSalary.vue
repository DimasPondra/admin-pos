<template>
    <div class="col-12 statistics-card">
        <form @submit.prevent="handleSubmit">
            <div class="form-group mb-3">
                <label for="nominal" class="mb-2">
                    Nominal
                    <span class="required">*</span>
                </label>
                <input type="number" class="form-control" id="nominal" v-model="salaryStore.data.salary.nominal" />
            </div>

            <div class="form-group mb-3">
                <label for="role_id" class="mb-2">
                    Role
                    <span class="required">*</span>
                </label>
                <select id="role_id" class="form-select" v-model="salaryStore.data.salary.role_id">
                    <option :value="null" selected disabled>Choose</option>
                    <option v-for="role in roleStore.data.roles" :key="role.id" :value="role.id">
                        {{ role.name }}
                    </option>
                </select>
            </div>

            <div class="d-flex justify-content-end">
                <button class="btn btn-sm btn-success">Save</button>
            </div>
        </form>
    </div>
</template>

<script>
import { useRoute } from "vue-router";
import { useSalaryStore } from "../../stores/salaries";
import { onMounted, computed } from "vue";
import { useRoleStore } from "../../stores/roles";

export default {
    setup() {
        const salaryStore = useSalaryStore();
        const roleStore = useRoleStore();
        const route = useRoute();

        const params = computed(() => {
            return {
                include: "role",
            };
        });

        const handleSubmit = async () => {
            await salaryStore.save(salaryStore.data.salary, route.params.id);
        };

        const loadRoles = async () => {
            await roleStore.get();
        };

        const loadSalary = async () => {
            await salaryStore.show(route.params.id, params.value);
        };

        onMounted(() => {
            document.title = `Admin Panel - ${route.meta.title}`;
            if (route.params.id != undefined) {
                loadSalary();
            }
            loadRoles();
        });

        return { salaryStore, roleStore, handleSubmit };
    },
};
</script>
