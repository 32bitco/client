<script lang="ts">
	import { createForm } from 'svelte-forms-lib';
	import * as Yup from 'yup';

	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';

	export let changeUseCase: () => void;

	const validationSchema = Yup.object({
		username: Yup.string().required(),
		password: Yup.string().required()
	});
	const { form, errors, handleChange, handleSubmit } = createForm({
		initialValues: {
			username: '',
			password: ''
		},
		validationSchema,
		onSubmit: async (values) => {
			// TODO: Send to GraphQL Server
			alert(JSON.stringify(values));
		}
	});
</script>

<form on:submit={handleSubmit}>
	<Input
		name="username"
		class="border"
		placeholder="Username"
		value={$form.username}
		error={$errors.username}
		on:change={handleChange}
	/>
	<Input
		type="password"
		name="password"
		class="border"
		placeholder="Password"
		value={$form.password}
		error={$errors.password}
		on:change={handleChange}
	/>
	<div class="flex items-center">
		<Button label="Login" variant="primary" />
		<Button label="Create an account" on:click={changeUseCase} />
	</div>
</form>
