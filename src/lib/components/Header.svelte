<script lang="ts">
  import { userStore } from '$lib/stores/user';
  import Avatar from './Avatar.svelte';
  import Button from './Button.svelte';

  import type { AuthenticationUseCase } from './Authenticate/index.svelte';

  // @binded
  export let authenticateUseCase: AuthenticationUseCase;
</script>

<header
  class="fixed top-0 flex justify-between items-center px-4 md:px-12 bg-white h-[64px] shadow-md w-full"
>
  <figure>
    <img src="https://via.placeholder.com/120x40" alt="Nexus Logo" height="40" width="120" />
  </figure>
  <div class="flex gap-4">
    {#if $userStore.user}
      <article class="flex items-center">
        <Avatar size="sm" user={$userStore.user} />
        <span class="pl-2">
          Hi, {$userStore.user.username}!
        </span>
      </article>
    {:else}
      <Button variant="primary" on:click={() => (authenticateUseCase = 'login')}>Log in</Button>
      <Button on:click={() => (authenticateUseCase = 'signup')}>Sign up</Button>
    {/if}
  </div>
</header>
