<script lang="ts">
  import classNames from 'classnames';
  import Spinner from 'phosphor-svelte/lib/Spinner';

  import type { Variant } from '$lib/types/components';

  export let type: 'button' | 'submit' = 'button';
  export let fullWidth = false;
  export let variant: Variant = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export let icon: any | null = null;
  export let disabled = false;
  export let isLoading = false;

  let customClassNames = '';
  export { customClassNames as class };

  let className = classNames(
    customClassNames,
    'border py-2 px-6 rounded-full text-sm flex items-center font-semibold ',
    {
      'w-full': fullWidth,
      '!opacity-50 !text-gray-400': isLoading || disabled,
      '!cursor-not-allowed': disabled,
      '!cursor-progress': isLoading,
      'border-gray-200 text-gray-600 hover:bg-gray-100': !variant,
      '!text-white border-blue-600 bg-blue-600 hover:bg-blue-800 hover:!border-blue-800':
        variant === 'primary'
    }
  );
</script>

<button {type} class={className} disabled={isLoading || disabled} on:click>
  {#if isLoading}
    <figure class="mr-2 text-lg">
      <Spinner class="h-5 w-5 animate-spin" />
    </figure>
  {:else if icon}
    <figure class="mr-2 text-lg">
      <svelte:component this={icon} class="h-5 w-5" />
    </figure>
  {/if}
  <slot />
</button>
