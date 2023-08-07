<template>
    <div class="col-12 col-xl-9">
        <Navbar :navbar="navbar" @clicked="$emit('hide', 'open')" />

        <div class="content">
            <div class="row">
                <div class="col-12">
                    <h2 class="content-title mb-4">Create Bank</h2>
                </div>

                <FormProductType />
            </div>
        </div>
    </div>
</template>

<script>
import { reactive } from "vue";

import FormProductType from "../../components/forms/FormProductType.vue";
import Navbar from "../../components/Navbar.vue";

export default {
    components: {
        FormProductType,
        Navbar,
    },
    setup() {
        const navbar = reactive({
            title: "Product Type",
            link: "/product-types",
        });

        return { navbar };
    },
};
</script>
