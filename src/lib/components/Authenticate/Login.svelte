<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Input from '../Input.svelte';

  const dispatch = createEventDispatcher();
</script>

<div>
  <form on:submit={() => console.log('Submit')}>
    <div>
      <Input type="email" name="email" label="Email" />
    </div>
    <div>
      <Input type="password" name="password" label="Password" />
    </div>
    <div class="md:grid md:grid-cols-2 md:gap-4">
      <input type="submit" value="Login" />
      <button on:click={() => dispatch('toggleForm')}>Create an account</button>
    </div>
  </form>
</div>
