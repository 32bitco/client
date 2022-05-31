<script lang="ts">
  import Feed from '$lib/components/Feed.svelte';
  import Postbox from '$lib/components/Postbox.svelte';
</script>

<svelte:head>
  <title>Nexus</title>
</svelte:head>

<div class="min-w-screen grid gap-4 grid-cols-6 md:grid-cols-12">
  <Postbox class="mt-5 col-span-6 col-start-1 md:col-span-6 md:col-start-4" />
  <Feed class="col-span-6 col-start-1 md:col-span-6 md:col-start-4" />
</div>
