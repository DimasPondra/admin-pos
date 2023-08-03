<template>
    <div class="col-12 d-flex justify-content-between">
        <h2 class="content-title mb-4">List {{ title.name }}</h2>
        <div class="btn mb-2 mb-md-0">
            <router-link :to="title.link_create" class="btn btn-sm btn-primary"
                >Add new {{ titleLowerCase }}</router-link
            >
        </div>
    </div>
</template>

<script>
import { computed } from "vue";

export default {
    props: {
        title: {
            type: Object,
            default: () => {},
        },
    },
    setup(props) {
        const titleLowerCase = computed(() => props.title.name.toLowerCase());

        return { titleLowerCase };
    },
};
</script>
