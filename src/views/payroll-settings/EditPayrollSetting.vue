<template>
    <div class="col-12 col-xl-9">
        <Navbar :navbar="navbar" @clicked="$emit('hide', 'open')" />

        <div class="content">
            <div class="row">
                <div class="col-12">
                    <h2 class="content-title mb-4">Edit Payroll Setting</h2>
                </div>

                <FormPayrollSetting />
            </div>
        </div>
    </div>
</template>

<script>
import { reactive } from "vue";

import FormPayrollSetting from "../../components/forms/FormPayrollSetting.vue";
import Navbar from "../../components/Navbar.vue";

export default {
    components: {
        FormPayrollSetting,
        Navbar,
    },
    setup() {
        const navbar = reactive({
            title: "Payroll Setting",
            link: "/payroll-settings",
        });

        return { navbar };
    },
};
</script>
