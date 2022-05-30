<script lang="ts">
  import { userStore } from '$lib/stores/user';
  import Button from './Button.svelte';

  // @binded
  export let isAuthenticationModalOpen: boolean;
</script>

<header
  class="fixed top-0 flex justify-between items-center px-12 bg-white h-[64px] shadow-md w-full"
>
  <figure>
    <img src="https://via.placeholder.com/120x40" alt="Nexus Logo" height="40" width="120" />
  </figure>
  <div class="flex gap-4">
    {#if $userStore.user}
      Hi, {$userStore.user.username}!
    {:else}
      <Button variant="primary" on:click={() => (isAuthenticationModalOpen = true)}>Log in</Button>
      <Button on:click={() => (isAuthenticationModalOpen = true)}>Sign up</Button>
    {/if}
  </div>
</header>
