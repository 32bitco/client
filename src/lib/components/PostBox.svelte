<script lang="ts">
  import { makePostService } from '$lib/services/post';
  import { userStore } from '$lib/stores/user';

  import Avatar from './Avatar.svelte';
  import Card from './Card.svelte';
  import Input from './Input.svelte';
  import Button from './Button.svelte';

  import { Scope } from '$lib/graphql/schema';

  let content = '';

  let customClassName: string = null;
  export { customClassName as class };

  async function createPost() {
    if (content === '') {
      return
    }
    const postService = makePostService();
    await postService.createPost({
      content,
      scope: Scope.Public
    });
  }
</script>

<Card class={customClassName}>
  <div class="mx-4">
    <div class="flex">
      <Avatar size="sm" user={$userStore?.user} />
      <div class="w-full">
        <Input
          name="postbox"
          type="text"
          id="postbox"
          placeholder="Whats on your mind?"
          required
          bind:value={content}
        />
      </div>
    </div>
    <div class="flex justify-end">
      <Button on:click={createPost} variant="primary">Post</Button>
    </div>
  </div>
</Card>
