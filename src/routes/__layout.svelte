<script lang="ts">
  import { onMount } from 'svelte';

  import { userStore } from '$lib/stores/user';

  import '$lib/styles/app.css';

  onMount(async () => {
    await userStore.me();
  });
</script>

<slot />
