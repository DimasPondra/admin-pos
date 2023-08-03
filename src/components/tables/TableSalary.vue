<template>
    <table class="table">
        <thead>
            <tr>
                <th>Nominal</th>
                <th>Role</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="salary in salaries" :key="salary.id">
                <td>{{ salary.nominal }}</td>
                <td>{{ salary.role.name }}</td>
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
                                <router-link
                                    :to="`salaries/${salary.id}/edit`"
                                    class="btn btn-sm btn-link w-100 text-start"
                                    >Edit</router-link
                                >
                            </li>
                            <li>
                                <button
                                    onclick="return confirm('Are you sure to delete?')"
                                    @click="handleDelete(salary.id)"
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
        salaries: {
            type: Array,
            default: [],
        },
    },
    setup(props, context) {
        const handleDelete = (value) => {
            context.emit("delete_salary", value);
        };

        return { handleDelete };
    },
};
</script>
