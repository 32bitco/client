<script lang="ts">
  import { getContextClient } from '@urql/svelte';
  import { newForm } from 'manzana';
  import { createEventDispatcher } from 'svelte';
  import * as Yup from 'yup';

  import Button from '$lib/components/Button.svelte';
  import { userStore } from '$lib/stores/user';
  import { TokenCreateError } from '$lib/errors/TokenCreateError';
  import { TokenCreateErrorCode } from '$lib/graphql/schema';

  import Input from '../Input.svelte';

  let error;

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
        error = null;
        await userStore.login(getContextClient(), username, password);
      } catch (err) {
        if (err instanceof TokenCreateError) {
          switch (err.code) {
            case TokenCreateErrorCode.InvalidCredentials:
              error = 'Invalid credentials provided';
              return;
          }
        }

        error = 'An error ocurred!';
      }
    }
  });
</script>

<div>
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
    <div class="md:grid md:grid-cols-2 md:gap-4">
      <Button type="submit" disabled={$isSubmitting}>Login</Button>
      <Button disabled={$isSubmitting} on:click={() => dispatch('toggleForm')}
        >Create an account</Button
      >
    </div>
  </form>
</div>
