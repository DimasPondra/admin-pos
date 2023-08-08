<template>
    <div class="col-12 col-xl-9">
        <Navbar :navbar="navbar" @clicked="$emit('hide', 'open')" />

        <div class="content">
            <div class="row">
                <div class="col-12">
                    <h2 class="content-title mb-4">Edit Payroll</h2>
                </div>

                <FormPayroll />
            </div>
        </div>
    </div>
</template>

<script>
import { reactive } from "vue";

import FormPayroll from "../../components/forms/FormPayroll.vue";
import Navbar from "../../components/Navbar.vue";

export default {
    components: {
        FormPayroll,
        Navbar,
    },
    setup() {
        const navbar = reactive({
            title: "Payroll",
            link: "/payrolls",
        });

        return { navbar };
    },
};
</script>
