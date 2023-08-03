<template>
    <table class="table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="role in roles" :key="role.id">
                <td>{{ role.name }}</td>
                <td width="10%">
                    <div class="dropdown">
                        <button
                            class="btn btn-outline-primary dropdown-toggle"
                            type="button"
                            id="dropdownMenu"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        ></button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenu">
                            <li>
                                <router-link :to="`roles/${role.id}/edit`" class="btn btn-sm btn-link w-100 text-start"
                                    >Edit</router-link
                                >
                            </li>
                            <li>
                                <button
                                    onclick="return confirm('Are you sure to delete?')"
                                    @click="handleDelete(role.id)"
                                    class="btn btn-sm btn-link w-100 text-start"
                                >
                                    Delete
                                </button>
                            </li>
                        </ul>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    props: {
        roles: {
            type: Array,
            default: [],
        },
    },
    setup(props, context) {
        const handleDelete = (value) => {
            context.emit("delete_role", value);
        };

        return { handleDelete };
    },
};
</script>
