<template>
    <div class="col-12 col-xl-9">
        <Navbar :navbar="navbar" @clicked="$emit('hide', 'open')" />

        <div class="content">
            <div class="row">
                <div class="col-12">
                    <h2 class="content-title mb-4">Edit Role</h2>
                </div>

                <FormRole />
            </div>
        </div>
    </div>
</template>

<script>
import { reactive } from "vue";

import FormRole from "../../components/forms/FormRole.vue";
import Navbar from "../../components/Navbar.vue";

export default {
    components: {
        FormRole,
        Navbar,
    },
    setup() {
        const navbar = reactive({
            title: "Role",
            link: "/roles",
        });

        return { navbar };
    },
};
</script>
