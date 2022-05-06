<script lang="ts">
  import { newForm } from 'manzana';
  import { createEventDispatcher } from 'svelte';
  import * as Yup from 'yup';
  import { mutation, graphql, AccountRegisterErrorCode } from '$houdini';

  import Input from '$lib/components/Input.svelte';

  let error = null;

  const accountRegister = mutation(graphql`
    mutation AccountRegister($input: AccountRegisterInput!) {
      accountRegister(input: $input) {
        user {
          id
          name
          lastName
          email
          username
          birthdate
          createdAt
          updatedAt
        }
        error {
          field
          message
          code
        }
      }
    }
  `);

  const dispatch = createEventDispatcher();
  const { handleSubmit, values, errors } = newForm<{
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
    validationSchema: Yup.object({
      name: Yup.string().required(),
      lastName: Yup.string().required(),
      email: Yup.string().email().required(),
      username: Yup.string().required(),
      password: Yup.string().required(),
      confirmPassword: Yup.string()
        .required()
        .oneOf([Yup.ref('password')]),
      birthdate: Yup.date().required()
    }),
    onSubmit: async (values) => {
      try {
        error = null;

        const result = await accountRegister({
          input: {
            name: values.name,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
            username: values.username,
            birthdate: new Date(values.birthdate),
            gender: 'CUSTOM',
            customGender: 'Custom',
            pronoun: 'HE'
          }
        });

        if (result.error === null) {
          const { name } = result.user;

          console.log(`Welcome to Nexus ${name}!`);
        }
      } catch (err) {
        if (Array.isArray(err)) {
          // GraphQL Handled Error
          const [firstError] = err;
          const { extensions } = firstError;

          if (extensions.code === AccountRegisterErrorCode.USERNAME_TAKEN) {
            error = 'The username is already taken';
            return;
          }
        }

        error = 'Ocurrio un error!';
      }
    }
  });
</script>

<form class="flex flex-col w-full md:w-[520px]" on:submit={handleSubmit}>
  <div class="md:grid md:grid-cols-2 md:gap-4">
    <Input type="text" label="Name" name="name" error={$errors.name} bind:value={$values.name} />
    <Input
      type="text"
      label="Last name"
      name="lastName"
      error={$errors.lastName}
      bind:value={$values.lastName}
    />
    <Input
      type="email"
      label="Email"
      name="email"
      error={$errors.email}
      bind:value={$values.email}
    />
    <Input
      type="text"
      label="Username"
      name="username"
      error={$errors.username}
      bind:value={$values.username}
    />
    <Input
      type="password"
      label="Password"
      name="password"
      error={$errors.password}
      bind:value={$values.password}
    />
    <Input
      type="password"
      label="Confirm Password"
      name="confirmPassword"
      error={$errors.confirmPassword}
      bind:value={$values.confirmPassword}
    />
    <Input
      type="date"
      label="Birthdate"
      name="birthdate"
      error={$errors.birthdate}
      bind:value={$values.birthdate}
    />
  </div>
  <p class:opacity-0={!error} class="text-red-600">
    {error}
  </p>
  <div class="flex justify-evenly">
    <button type="submit">Create account</button>
    <button on:click={() => dispatch('toggleForm')}>Login into your account</button>
  </div>
</form>
