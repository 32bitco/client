<script lang="ts">
  import Authenticate from '$lib/modules/auth/components/Authenticate.svelte';

  import '$lib/styles/app.css';
</script>

<div style="background-image: url('/images/login-background.jpeg');" class="bg-gray-200 bg-no-repeat bg-cover h-screen">
  <div class="bg-gray-900/25 h-screen">
    <Authenticate />
  </div>
</div>
