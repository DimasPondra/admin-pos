<template>
    <div>{{ role.data.roles }}</div>
</template>

<script>
import { useRoleStore } from "../../stores/roles";
import { onMounted } from "vue";

export default {
    setup() {
        const role = useRoleStore();

        async function loadRoles() {
            await role.get();
        }

        onMounted(() => {
            loadRoles();
        });

        return { role, loadRoles };
    },
};
</script>
