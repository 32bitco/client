<script lang="ts">
  import Card from '$lib/components/Card.svelte';
  import Login from './Login.svelte';
  import SignUp from './SignUp.svelte';

  let isLogin = true;

  function handleToggleForm() {
    isLogin = !isLogin;
  }
</script>

<Card class="mx-auto w-max col-span-6 col-start-1 md:col-span-6 md:col-start-4">
  <div class="px-8 py-6 z-10">
    <h3 class="text-2xl font-bold text-center mb-4">
      {#if isLogin}
        Login into your account
      {:else}
        Create an account
      {/if}
    </h3>
    {#if isLogin}
      <Login on:toggleForm={handleToggleForm} />
    {:else}
      <SignUp on:toggleForm={handleToggleForm} />
    {/if}
  </div>
</Card>
