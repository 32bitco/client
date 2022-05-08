<script lang="ts">
  import { newForm } from 'manzana';
  import { createEventDispatcher } from 'svelte';
  import * as Yup from 'yup';

  import { authService } from '$lib/services/auth';
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

        await authService.createToken(username, password);
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
      <button type="submit" disabled={$isSubmitting}>Login</button>
      <button disabled={$isSubmitting} on:click={() => dispatch('toggleForm')}
        >Create an account</button
      >
    </div>
  </form>
</div>
