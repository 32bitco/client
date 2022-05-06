<script context="module">
  import { setEnvironment } from '$houdini';

  import env from '../environment';

  setEnvironment(env);
</script>

<script lang="ts">
  import '$lib/styles/app.css';
</script>

<slot />
