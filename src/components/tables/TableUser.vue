<template>
    <table class="table">
        <thead>
            <tr>
                <th>Avatar</th>
                <th>Name</th>
                <th>Role</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in users" :key="user.id">
                <td>
                    <div v-if="user.file == null">-</div>
                    <div v-else>
                        <img :src="user.file.url" alt="image" width="25" class="rounded" />
                    </div>
                </td>
                <td>{{ user.username }}</td>
                <td>{{ user.role.name }}</td>
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
                                <router-link :to="`users/${user.id}/edit`" class="btn btn-sm btn-link w-100 text-start"
                                    >Edit</router-link
                                >
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
        users: {
            type: Array,
            default: [],
        },
    },
};
</script>
