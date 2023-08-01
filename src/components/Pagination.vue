<template>
    <div class="d-flex mt-4 justify-content-end">
        <pagination
            v-model="pagination.page"
            :records="pagination.total"
            :per-page="pagination.per_page"
            @paginate="changePage($event)"
            :options="pagination.option"
        />
    </div>
</template>

<script>
export default {
    props: {
        pagination: {
            type: Object,
            default: () => {},
        },
    },
    setup(props, context) {
        const changePage = (value) => {
            context.emit("current_page", value);
        };
        return { changePage };
    },
};
</script>
