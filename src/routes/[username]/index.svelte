<script lang="ts" context="module">
  import { urqlClient } from '$lib/utils/urql';

  export async function load({ params }) {
    const username = params.username;
    const userService = makeUserService(urqlClient);
    const user = null;

    if (user) {
      return {
        props: {
          user
        }
      };
    }

    return {
      status: 404,
      props: {
        user: null
      }
    };
  }
</script>

<script lang="ts">
  import Avatar from '$lib/components/Avatar.svelte';
  import { makeUserService } from '$lib/services/user';
  import { humanTimeExpression } from '$lib/utils/datetime';

  import type { UserFragmentFragment } from '$lib/graphql/schema';

  export let user: UserFragmentFragment;
</script>

<div class="grid gap-4 grid-cols-6 md:grid-cols-12 w-screen">
  <div class="col-start-1 col-span-6 md:col-start-3 md:col-span-8">
    <header class="bg-white relative overflow-hidden">
      <figure class="flex justify-center items-center h-[200px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1654554396063-09b7b57e7c74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3132&q=80"
          alt=""
        />
      </figure>
      <article class="absolute top-[-20px] bg-white relative px-6 rounded-t-2xl">
        <div class="absolute top-[-40px]">
          <Avatar {user} size="lg" />
        </div>
        <div class="ml-[100px] py-4">
          <h1 class="text-lg font-semibold">{user.name} {user.lastName}</h1>
          <p class="text-md text-gray-400">
            Joined {humanTimeExpression(new Date(user.createdAt))}
          </p>
        </div>
      </article>
      <nav class="flex bg-white">
        <button class="font-semibold box-border border-b-2 border-gray-600 px-4 py-2">
          Posts
        </button>
        <button class="font-semibold box-border border-b-2 border-gray-600 px-4 py-2">
          About
        </button>
      </nav>
    </header>
  </div>
</div>
