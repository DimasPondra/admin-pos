<template>
    <div class="col-12 col-xl-9">
        <Navbar :navbar="navbar" @clicked="$emit('hide', 'open')" />

        <div class="content">
            <div class="row">
                <div class="col-12">
                    <h2 class="content-title mb-4">Create User</h2>
                </div>

                <FormUser />
            </div>
        </div>
    </div>
</template>

<script>
import { reactive } from "vue";

import FormUser from "../../components/forms/FormUser.vue";
import Navbar from "../../components/Navbar.vue";

export default {
    components: {
        FormUser,
        Navbar,
    },
    setup() {
        const navbar = reactive({
            title: "User",
            link: "/users",
        });

        return { navbar };
    },
};
</script>
