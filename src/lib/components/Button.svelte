<script lang="ts">
	import classNames from 'classnames';

	import type { Variant } from '$lib/types/components';

	export let fullWidth = false;
	export let label: string | undefined = undefined;
	export let variant: Variant = 'default';
	export let icon: any | null = null;

	let className = classNames('py-1 px-3 rounded text-sm flex items-center', {
		'w-full': fullWidth,
		'text-white bg-neutral-700 border-neutral-600 hover:bg-neutral-600': variant === 'primary'
	});
</script>

<button class={className}>
	{#if icon}
		<figure class="mr-1 text-lg">
			<svelte:component this={icon} />
		</figure>
	{/if}
	{#if typeof label !== 'undefined'}
		{label}
	{/if}
</button>
