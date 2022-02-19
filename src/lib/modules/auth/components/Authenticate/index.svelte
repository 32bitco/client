<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import LogIn from './LogIn.svelte';

	let useCase: 'login' | 'signup' = 'login';
</script>

<div
	class="bg-white flex flex-col items-center justify-center sm:p-6 sm:w-max sm:h-max h-screen w-screen"
>
	<header class="flex items-center justify-center flex-col mb-4 w-1/4">
		<figure class="flex items-center justify-center mx-auto">
			<img alt="Logo" src="/images/logo.png" width="90" />
		</figure>
		<h1>Nexus</h1>
	</header>
	{#if useCase === 'login'}
		<LogIn changeUseCase={() => (useCase = 'signup')} />
	{:else}
		<h1>Signup Form</h1>
		<Button label="Already have an account" on:click={() => (useCase = 'login')} />
	{/if}
</div>
