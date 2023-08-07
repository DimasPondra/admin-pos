<template>
    <div class="col-12 statistics-card">
        <form @submit.prevent="handleSubmit">
            <div class="form-group mb-3">
                <label for="name" class="mb-2">
                    Name
                    <span class="required">*</span>
                </label>
                <input
                    type="text"
                    class="form-control"
                    id="name"
                    v-model="payrollSettingStore.data.payroll_setting.name"
                />
                <br />
            </div>

            <div class="form-group mb-3">
                <label for="nominal">Nominal<span class="required">*</span></label>
                <input
                    type="number"
                    class="form-control"
                    id="nominal"
                    v-model="payrollSettingStore.data.payroll_setting.nominal"
                />
                <br />
            </div>

            <div class="form-group mb-3">
                <label for="unit_type_id" class="mb-2">
                    Unit Type
                    <span class="required">*</span>
                </label>
                <select
                    id="unit_type_id"
                    class="form-select"
                    v-model="payrollSettingStore.data.payroll_setting.unit_type_id"
                >
                    <option :value="null" selected disabled>Choose</option>
                    <option
                        v-for="unit_type in unitTypeStore.data.unit_types"
                        :key="unit_type.id"
                        :value="unit_type.id"
                    >
                        {{ unit_type.name }}
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
            document.title = `Admin Panel - ${route.meta.title}`;
            loadUnitTypes();
            if (route.params.id != undefined) {
                loadPayrollSetting();
            }
        });

        return { payrollSettingStore, unitTypeStore, handleSubmit };
    },
};
</script>
