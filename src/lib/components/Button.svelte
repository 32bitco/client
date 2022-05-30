<script lang="ts">
  import classNames from 'classnames';

  import type { Variant } from '$lib/types/components';

  export let type: 'button' | 'submit' = 'button';
  export let disabled = false;
  export let fullWidth = false;
  export let variant: Variant = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export let icon: any | null = null;

  let customClassNames = '';
  export { customClassNames as class };

  let className = classNames(
    customClassNames,
    'border py-2 px-6 rounded-full text-sm flex items-center font-semibold ',
    {
      'w-full': fullWidth,
      'border-gray-600 text-gray-600 hover:bg-gray-100': !variant,
      '!text-white border-blue-600 bg-blue-600 hover:bg-blue-800 hover:!border-blue-800':
        variant === 'primary'
    }
  );
</script>

<button {type} {disabled} class={className} on:click>
  {#if icon}
    <figure class="mr-1 text-lg">
      <svelte:component this={icon} />
    </figure>
  {/if}
  <slot />
</button>
