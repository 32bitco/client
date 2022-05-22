<script lang="ts">
  import { onMount } from 'svelte';

  import Header from '$lib/components/Header.svelte';
  import { userStore } from '$lib/stores/user';

  import '$lib/styles/app.css';

  onMount(async () => {
    await userStore.me();
  });
</script>

<div id="nexus" class="min-h-screen min-w-screen bg-slate-100 overflow-x-hidden overflow-y-scroll">
  <Header />
  <slot />
</div>
