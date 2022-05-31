<script lang="ts">
  import { makePostService } from '$lib/services/post';

  import Card from './Card.svelte';
  import Input from './Input.svelte';
  import Button from './Button.svelte';

  import { Scope } from '$lib/graphql/schema';

  let content = '';

  let customClassName: string = null;
  export { customClassName as class };

  async function createPost() {
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
      <img
        class="w-11 h-11 mr-5 rounded-lg"
        src="https://avatars.githubusercontent.com/u/96664108?s=200&v=4"
        alt=""
      />
      <div class="w-full">
        <Input
          name="postbox"
          type="text"
          id="postbox"
          placeholder="Whats on your mind?"
          bind:value={content}
        />
      </div>
    </div>
    <div class="flex justify-end">
      <Button on:click={createPost} variant="primary">Post</Button>
    </div>
  </div>
</Card>
