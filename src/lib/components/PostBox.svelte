<script lang="ts">
  import { newForm } from 'manzana';
  import { createEventDispatcher } from 'svelte';
  import * as Yup from 'yup';

  import { getContextServices } from '$lib/services';
  import { userStore } from '$lib/stores/user';

  import Avatar from './Avatar.svelte';
  import Card from './Card.svelte';
  import Input from './Input.svelte';
  import Button from './Button.svelte';

  import { Scope } from '$lib/graphql/schema';

  const dispatch = createEventDispatcher();
  const services = getContextServices();
  const { handleSubmit, values, errors, isSubmitting } = newForm<{
    content: string;
  }>({
    initialValues: {
      content: ''
    },
    validationSchema: Yup.object({
      content: Yup.string().required("A post can't be empty!")
    }),
    onSubmit: async ({ content }, helpers) => {
      try {
        await services.post.createPost({
          content,
          scope: Scope.Public
        });

        helpers.setFieldValue('content', '');

        dispatch('create', {
          content
        });
      } catch (err) {
        helpers.setFieldError('content', err.toString());
      }
    }
  });

  let customClassName: string = null;
  export { customClassName as class };
</script>

<Card class={customClassName}>
  <form on:submit={handleSubmit}>
    <div class="flex space-x-4 justify-between">
      <Avatar size="sm" user={$userStore?.user} />
      <Input
        class="w-[calc(100%-44px)]"
        name="content"
        type="text"
        placeholder="Whats on your mind?"
        error={$errors.content}
        bind:value={$values.content}
      />
    </div>
    <div class="flex justify-end">
      <Button type="submit" isLoading={$isSubmitting} variant="primary">Publish</Button>
    </div>
  </form>
</Card>
