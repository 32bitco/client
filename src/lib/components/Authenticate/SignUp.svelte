<script lang="ts">
  import { newForm } from 'manzana';
  import { userService } from '$lib/services/user';

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  const now = new Date();
  const today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate() + 1}`;

  const { handleSubmit, values } = newForm<{
    name: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    username: string;
    birthdate: Date;
  }>({
    initialValues: {
      name: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      birthdate: new Date()
    },
    onSubmit: async (values) => {
      const birthdate = new Date(values.birthdate).toJSON();

      await userService.userCreate({
        name: values.name,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        username: values.username,
        birthdate
      });
    }
  });
</script>

<div>
  <form on:submit={handleSubmit}>
    <div>
      <label for="name">Name: </label>
      <input type="text" name="name" id="name" bind:value={$values.name} required />
    </div>
    <div>
      <label for="lastName">Last Name: </label>
      <input type="text" name="lastName" id="lastName" bind:value={$values.lastName} required />
    </div>
    <div>
      <label for="email">Email: </label>
      <input type="email" name="email" id="email" bind:value={$values.email} required />
    </div>
    <div>
      <label for="username">Username: </label>
      <input type="text" name="username" id="username" bind:value={$values.username} required />
    </div>
    <div>
      <label for="username">Password: </label>
      <input type="password" name="password" id="password" bind:value={$values.password} required />
    </div>
    <div>
      <label for="username">Repeat Password: </label>
      <input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        bind:value={$values.confirmPassword}
        required
      />
    </div>
    <div>
      <label for="birthdate">Birthdate: </label>
      <input
        type="date"
        name="birthdate"
        id="birthdate"
        bind:value={$values.birthdate}
        max={today}
        required
      />
    </div>
    <div>
      <input type="submit" value="Subscribe!" />
    </div>
  </form>
  <div>
    <button on:click={() => dispatch('toggleForm')}>Login?</button>
  </div>
</div>
