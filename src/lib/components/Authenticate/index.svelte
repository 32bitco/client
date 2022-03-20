<script lang="ts">
  import Login from './Login.svelte';
  import SignUp from './SignUp.svelte';

  let isLogin = true;
  function handleToggleForm() {
    isLogin = !isLogin;
  }
</script>

<div>
  {#if isLogin}
    <Login on:toggleForm={handleToggleForm} />
  {:else}
    <SignUp on:toggleForm={handleToggleForm} />
  {/if}
</div>
