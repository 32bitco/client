<script lang="ts">
  import { getContextClient, queryStore } from '@urql/svelte';

  import Post from '$lib/components/Post.svelte';
  import { FeedDocument } from '$lib/graphql/schema';
  import classNames from 'classnames';

  let customClassNames: string = null;
  export { customClassNames as class };

  export let first = 15;

  let className = classNames('w-full py-4 space-y-4', customClassNames);

  const feed = queryStore({
    client: getContextClient(),
    query: FeedDocument,
    variables: {
      first
    }
  });
</script>

<ul class={className}>
  {#if $feed.fetching}
    Please wait...
  {:else}
    {#each $feed.data.feed.feed.edges.map(({ node }) => node) as post}
      <li>
        <Post {post} />
      </li>
    {/each}
  {/if}
</ul>
