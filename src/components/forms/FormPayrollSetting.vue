<template>
    <div>
        <router-link to="/payroll-settings">Back</router-link>
    </div>
    <br />
    <form @submit.prevent="handleSubmit">
        <div>
            <label for="name">Name</label>
            <input type="text" id="name" v-model="payrollSettingStore.data.payroll_setting.name" />
            <br />
        </div>

        <div>
            <label for="nominal">Nominal</label>
            <input type="number" id="nominal" v-model="payrollSettingStore.data.payroll_setting.nominal" />
            <br />
        </div>

        <div>
            <label for="unit_type_id">Unit Type</label>
            <select id="unit_type_id" v-model="payrollSettingStore.data.payroll_setting.unit_type_id">
                <option v-for="unit_type in unitTypeStore.data.unit_types" :key="unit_type.id" :value="unit_type.id">
                    {{ unit_type.name }}
                </option>
            </select>
            <br />
        </div>

        <button>Save</button>
    </form>
</template>

<script>
import { useRoute } from "vue-router";
import { useUnitTypeStore } from "../../stores/unit-types";
import { usePayrollSettingStore } from "../../stores/payroll-settings";
import { onMounted, computed } from "vue";

export default {
    setup() {
        const payrollSettingStore = usePayrollSettingStore();
        const unitTypeStore = useUnitTypeStore();
        const route = useRoute();

        const params = computed(() => {
            return { include: "unit_type" };
        });

        const handleSubmit = async () => {
            await payrollSettingStore.save(payrollSettingStore.data.payroll_setting, route.params.id);
        };

        const loadUnitTypes = async () => {
            await unitTypeStore.get();
        };

        const loadPayrollSetting = async () => {
            await payrollSettingStore.show(route.params.id, params.value);
        };

        onMounted(() => {
            loadUnitTypes();
            if (route.params.id != undefined) {
                loadPayrollSetting();
            }
        });

        return { payrollSettingStore, unitTypeStore, handleSubmit };
    },
};
</script>
