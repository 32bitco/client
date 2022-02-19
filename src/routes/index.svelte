<script lang="ts">
	import Authenticate from '$lib/modules/auth/components/Authenticate/index.svelte';

	import '$lib/styles/app.css';
</script>

<div
	style="background-image: url('/images/login-background.jpeg');"
	class="bg-gray-200 bg-no-repeat bg-cover h-screen"
>
	<div class="bg-gray-900/25 flex items-center justify-center h-screen w-screen">
		<Authenticate />
	</div>
</div>
