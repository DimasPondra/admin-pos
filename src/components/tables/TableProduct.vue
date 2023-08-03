<template>
    <table class="table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Slug</th>
                <th>Price</th>
                <th>Amount</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="product in products" :key="product.id">
                <td>{{ product.name }}</td>
                <td>{{ product.slug }}</td>
                <td>{{ product.price }}</td>
                <td>{{ product.amount }}</td>
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
                                    :to="`products/${product.id}/edit`"
                                    class="btn btn-sm btn-link w-100 text-start"
                                    >Edit</router-link
                                >
                            </li>
                            <li>
                                <button
                                    onclick="return confirm('Are you sure to delete?')"
                                    @click="handleDelete(product.id)"
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
        products: {
            type: Array,
            default: [],
        },
    },
    setup(props, context) {
        const handleDelete = (value) => {
            context.emit("delete_product", value);
        };

        return { handleDelete };
    },
};
</script>
