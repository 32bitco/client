<script lang="ts">
  import { createForm } from 'svelte-forms-lib';

  import Input from "$lib/components/Input.svelte";

  const { form, handleChange, handleSubmit } = createForm({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      // TODO: Send to GraphQL Server
      alert(JSON.stringify(values));
    }
  });
</script>

<div class="bg-white flex flex-col items-center justify-center sm:w-1/4 h-screen w-screen">
  <figure class="mx-auto w-1/4">
    <img
      alt="Logo"
      src="/images/logo.png"
      width="90"
    />
  </figure>
  <h1>Falopa</h1>
  <form on:submit={handleSubmit}>
    <Input
      name="username"
      class="border"
      value={$form.username}
      on:change={handleChange}
    />
    <Input
      type="password"
      name="password"
      class="border"
      value={$form.password}
      on:change={handleChange}
    />
    <button type="submit">Login</button>
  </form>
</div>
