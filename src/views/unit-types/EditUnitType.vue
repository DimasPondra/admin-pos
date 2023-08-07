<template>
    <div class="col-12 col-xl-9">
        <Navbar :navbar="navbar" @clicked="$emit('hide', 'open')" />

        <div class="content">
            <div class="row">
                <div class="col-12">
                    <h2 class="content-title mb-4">Edit Unit Type</h2>
                </div>

                <FormUnitType />
            </div>
        </div>
    </div>
</template>

<script>
import { reactive } from "vue";

import FormUnitType from "../../components/forms/FormUnitType.vue";
import Navbar from "../../components/Navbar.vue";

export default {
    components: {
        FormUnitType,
        Navbar,
    },
    setup() {
        const navbar = reactive({
            title: "Unit Type",
            link: "/unit-types",
        });

        return { navbar };
    },
};
</script>
