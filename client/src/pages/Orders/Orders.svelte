<script>
    import { user } from "../../store/users";
</script>

{#if $user !== null && $user.role.role === "admin"}

{:else}

{/if}

