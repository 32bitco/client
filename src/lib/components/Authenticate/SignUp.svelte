<script lang="ts">
  import { newForm } from 'manzana';
  import { createEventDispatcher } from 'svelte';
  import * as Yup from 'yup';

  import { getContextServices } from '$lib/services';
  import Input from '$lib/components/Input.svelte';
  import { AccountRegisterError } from '$lib/errors/AccountCreateError';
  import { AccountRegisterErrorCode, Gender, Pronoun } from '$lib/graphql/schema';

  let error = null;

  const dispatch = createEventDispatcher();
  const services = getContextServices();
  const { handleSubmit, values, errors, isSubmitting } = newForm<{
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
        const birthdate = new Date(values.birthdate).toJSON();

        await services.user.accountRegister({
          name: values.name,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          username: values.username,
          birthdate,
          gender: Gender.Male,
          pronoun: Pronoun.He,
          customGender: null
        });
      } catch (err) {
        if (err instanceof AccountRegisterError) {
          switch (err.code) {
            case AccountRegisterErrorCode.UsernameTaken:
              error = 'Username is taken';
              return;
          }
        }

        error = 'An error ocurred!';
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
    <button type="submit" disabled={$isSubmitting}>Create account</button>
    <button on:click={() => dispatch('toggleForm')} disabled={$isSubmitting}
      >Login into your account</button
    >
  </div>
</form>
