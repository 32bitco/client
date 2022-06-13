<script lang="ts">
  import { makePostService } from '$lib/services/post';
  import { userStore } from '$lib/stores/user';

  import { newForm } from 'manzana';
  import * as Yup from 'yup';

  import Avatar from './Avatar.svelte';
  import Card from './Card.svelte';
  import Input from './Input.svelte';
  import Button from './Button.svelte';

  import { Scope } from '$lib/graphql/schema';

  const { handleSubmit, values, errors, isSubmitting } = newForm<{
    content: string;
  }>({
    initialValues: {
      content: ''
    },
    validationSchema: Yup.object({
      content: Yup.string().required()
    }),
    onSubmit: async ({ content }) => {
      try {
        const postService = makePostService();
        await postService.createPost({
          content,
          scope: Scope.Public
        });
      } catch (err) {
        console.log(err);
      }
    }
  });

  let customClassName: string = null;
  export { customClassName as class };
</script>

<Card class={customClassName}>
  <form on:submit={handleSubmit}>
    <div class="mx-4">
      <div class="flex">
        <Avatar size="sm" user={$userStore?.user} />
        <div class="w-full mx-4">
          <Input
            name="postbox"
            type="text"
            id="postbox"
            placeholder="Whats on your mind?"
            error={$errors.content}
            required
            bind:value={$values.content}
          />
        </div>
      </div>
      <div class="flex justify-end">
        <Button type="submit" disabled={$isSubmitting} variant="primary">Post</Button>
      </div>
    </div>
  </form>
</Card>
