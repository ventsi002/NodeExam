<script>
	import { useNavigate, useLocation } from "svelte-navigator";
	import { user } from "../store/users.js";

	const navigate = useNavigate();
	const location = useLocation();

	$: if (!$user) {
		navigate("/login", {
			state: { from: $location.pathname },
			replace: true,
		});
	}

    $: if ($user) {
        navigate("/", { replace: true });
  }
</script>

{#if $user.role.role === "admin"}
	<slot />
{:else}
    <p>Access denied.</p>
{/if}