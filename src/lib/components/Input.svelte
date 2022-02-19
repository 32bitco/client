<script lang="ts">
	import classNames from 'classnames';

	import WarningCircle from 'phosphor-svelte/lib/WarningCircle';

	export let name: string;
	export let type: 'text' | 'email' | 'password' | 'number' = 'text';
	export let value: string = '';
	export let placeholder: string;
	export let error: string | null = null;

	let customClassName: string | undefined = undefined;
	export { customClassName as class };

	const className = classNames(
		'bg-gray-200 border border-transparent rounded box-border text-black text-sm py-3 px-4 w-full outline-none active:border-blue-200 focus:border-blue-200 mb-2',
		error && 'border-red-500 active:border-red-500 focus:border-red-500 text-red-500 mb-0',
		customClassName
	);
</script>

<div class="flex flex-col">
	<div class="flex relative">
		<input id={name} {name} {type} {value} {placeholder} class={className} on:change />
		{#if error}
			<figure
				class="text-red-500 text-lg absolute items-center flex justify-center pointer-events-none p-4 m-0 right-0"
			>
				<WarningCircle />
			</figure>
		{/if}
	</div>
	{#if error}
		<p class="box-border text-red-500 text-xs my-2">{error}</p>
	{/if}
</div>
