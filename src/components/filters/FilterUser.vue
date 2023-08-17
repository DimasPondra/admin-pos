<template>
    <div class="col-12 search-menu mb-4">
        <div class="row d-flex">
            <div class="col-12 col-md-3 d-flex">
                <input
                    type="text"
                    class="form-control border-0 shadow-sm"
                    name="username"
                    v-model="filter.username"
                    placeholder="Search username"
                />
            </div>

            <div class="col-12 col-md-3 d-flex">
                <select id="role_id" v-model="filter.role_id" class="form-control">
                    <option :value="null" selected disabled>Choose Role</option>
                    <option v-for="role in roles" :key="role.id" :value="role.id">
                        {{ role.name }}
                    </option>
                </select>
            </div>

            <div class="col-12 col-md-3 d-flex">
                <button @click="clearFilter" class="btn btn-sm btn-warning">Clear</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        filter: {
            type: Object,
            default: () => {},
        },
        roles: {
            type: Array,
            default: [],
        },
    },
    setup(props, context) {
        const clearFilter = () => {
            context.emit("clear_filter");
        };

        return { clearFilter };
    },
};
</script>
