<script lang="ts">
  import Login from './Login.svelte';
  import SignUp from './SignUp.svelte';

  let isLogin = false;

  function handleToggleForm() {
    isLogin = !isLogin;
  }
</script>

<div
  class="h-screen w-screen md:min-w-[400px] md:w-min md:h-2/3 overflow-hidden shadow-lg rounded-lg bg-white"
>
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
</div>
