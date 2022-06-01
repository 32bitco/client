<script lang="ts" context="module">
  export type AvatarSize = 'sm' | 'md';
</script>

<script lang="ts">
  import classNames from 'classnames';

  import type { UserFragmentFragment } from '$lib/graphql/schema';

  export let user: UserFragmentFragment;
  export let size: AvatarSize = 'md';

  const userNameCharAtZero = user.name.charAt(0).toUpperCase();
  const sizeClassNames = classNames({
    'text-sm h-[35px] w-[35px]': size === 'sm',
    'text-lg h-[50px] w-[50px]': size === 'md'
  });

  const initialsClassNames = classNames(
    'text-white flex items-center justify-center',
    sizeClassNames,
    {
      'bg-slate-400': userNameCharAtZero === 'A' || userNameCharAtZero === 'W',
      'bg-gray-400': userNameCharAtZero === 'B' || userNameCharAtZero === 'X',
      'bg-zinc-400': userNameCharAtZero === 'C' || userNameCharAtZero === 'Y',
      'bg-neutral-400': userNameCharAtZero === 'D' || userNameCharAtZero === 'Z',
      'bg-stone-400': userNameCharAtZero === 'E',
      'bg-red-400': userNameCharAtZero === 'F',
      'bg-orange-400': userNameCharAtZero === 'G',
      'bg-amber-400': userNameCharAtZero === 'H',
      'bg-yellow-400': userNameCharAtZero === 'I',
      'bg-lime-400': userNameCharAtZero === 'J',
      'bg-green-400': userNameCharAtZero === 'K',
      'bg-emerald-400': userNameCharAtZero === 'L',
      'bg-teal-400': userNameCharAtZero === 'M',
      'bg-cyan-400': userNameCharAtZero === 'N',
      'bg-sky-400': userNameCharAtZero === 'O',
      'bg-blue-400': userNameCharAtZero === 'P',
      'bg-indigo-400': userNameCharAtZero === 'Q',
      'bg-violet-400': userNameCharAtZero === 'R',
      'bg-purple-400': userNameCharAtZero === 'S',
      'bg-fuchsia-400': userNameCharAtZero === 'T',
      'bg-pink-400': userNameCharAtZero === 'U',
      'bg-rose-400': userNameCharAtZero === 'V'
    }
  );

  const containerClassNames = classNames('rounded-lg overflow-hidden', sizeClassNames);
</script>

<figure class={containerClassNames}>
  <span class={initialsClassNames}>{user.name.charAt(0)}{user.lastName.charAt(0)}</span>
</figure>
