<script lang="ts">
  import { newForm } from 'manzana';
  import { createEventDispatcher } from 'svelte';
  import * as Yup from 'yup';

  import { getContextServices } from '$lib/services';
  import Button from '$lib/components/Button.svelte';
  import { userStore } from '$lib/stores/user';
  import Input from '../Input.svelte';

  const services = getContextServices();
  const dispatch = createEventDispatcher();
  const { handleSubmit, values, errors, isSubmitting } = newForm<{
    username: string;
    password: string;
  }>({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: Yup.string().required(),
      password: Yup.string().required()
    }),
    onSubmit: async ({ username, password }) => {
      try {
        const tokens = await services.auth.createToken(username, password);

        localStorage.clear();
        localStorage.setItem('token', tokens.accessToken);

        await userStore.me();
      } catch (err) {
        console.log(err);
      }
    }
  });
</script>

<form on:submit={handleSubmit}>
  <div>
    <Input
      type="text"
      label="Username"
      name="username"
      error={$errors.username}
      bind:value={$values.username}
    />
  </div>
  <div>
    <Input
      type="password"
      label="Password"
      name="password"
      error={$errors.password}
      bind:value={$values.password}
    />
  </div>
  <div class="flex justify-center items-center space-x-4">
    <Button type="submit" disabled={$isSubmitting} variant="primary">Login</Button>
    <Button disabled={$isSubmitting} on:click={() => dispatch('toggleForm')}
      >Create an account</Button
    >
  </div>
</form>
