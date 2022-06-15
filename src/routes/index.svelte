<script lang="ts">
  import { getContextClient, queryStore } from '@urql/svelte';

  import { userStore } from '$lib/stores/user';
  import Feed from '$lib/components/Feed.svelte';
  import PostBox from '$lib/components/PostBox.svelte';
  import { FeedDocument } from '$lib/graphql/schema';

  let posts = queryStore({
    client: getContextClient(),
    query: FeedDocument,
    variables: {
      first: 15
    }
  });

  const handleCreatePost = () => {
    posts = queryStore({
      client: getContextClient(),
      query: FeedDocument,
      variables: {
        first: 15
      }
    });
  };
</script>

<svelte:head>
  <title>Nexus</title>
</svelte:head>

<div class="min-w-screen grid gap-4 grid-cols-6 md:grid-cols-12">
  {#if $userStore.user}
    <PostBox
      class="mt-5 col-span-6 col-start-1 md:col-span-6 md:col-start-4"
      on:create={handleCreatePost}
    />
  {/if}
  <Feed {posts} class="col-span-6 col-start-1 md:col-span-6 md:col-start-4" />
</div>
