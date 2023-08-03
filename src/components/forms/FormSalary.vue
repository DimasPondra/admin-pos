<template>
    <div class="">
        <router-link to="/salaries">Back</router-link>
    </div>
    <br />
    <form @submit.prevent="handleSubmit">
        <input type="number" v-model="salaryStore.data.salary.nominal" />
        <br />
        <select id="role_id" v-model="salaryStore.data.salary.role_id">
            <option :value="null" selected disabled>Choose</option>
            <option v-for="role in roleStore.data.roles" :key="role.id" :value="role.id">{{ role.name }}</option>
        </select>
        <br />
        <button>Save</button>
    </form>
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
            if (route.params.id != undefined) {
                loadSalary();
            }
            loadRoles();
        });

        return { salaryStore, roleStore, handleSubmit };
    },
};
</script>
