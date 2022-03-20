<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>

<div>
  <form on:submit={() => console.log('Submit')}>
    <div>
      <label for="email">Email: </label>
      <input type="text" name="email" id="email" required />
    </div>
    <div>
      <label for="password">Password: </label>
      <input type="password" name="password" id="password" required />
    </div>
    <div>
      <input type="submit" value="Login" />
    </div>
  </form>
  <div>
    <button on:click={() => dispatch('toggleForm')}>Login?</button>
  </div>
</div>
