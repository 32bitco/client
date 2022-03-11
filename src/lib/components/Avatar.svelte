<script lang="ts">
	import classNames from 'classnames';

	import type { User } from '$lib/types/domain';

	export let user: User;
	export let size = 'small';

	const sizeClassNames = classNames({
		'h-[25px] w-[25px]': size === 'small'
	});

	const initialsClassNames = classNames(
		'flex items-center justify-center text-sm',
		sizeClassNames,
		{
			'bg-blue-400 text-white': user.firstName.charAt(0) === 'E'
		}
	);

	const imageSideSize = {
		small: 25
	};
</script>

<figure class="rounded-full overflow-hidden">
	{#if user.avatar}
		<img
			src={user.avatar.url}
			alt={`${user.firstName} ${user.lastName} avatar`}
			height={imageSideSize[size]}
			width={imageSideSize[size]}
		/>
	{:else}
		<span class={initialsClassNames}>{user.firstName.charAt(0)}{user.lastName.charAt(0)}</span>
	{/if}
</figure>
