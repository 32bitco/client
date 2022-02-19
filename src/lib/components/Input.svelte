<script lang="ts">
  export let name: string;
  export let type: 'text' | 'email' | 'password' | 'number' = 'text';
  export let value: string = '';
  export let placeholder: string = '';

  let className: string | undefined = undefined;
  export { className as class };
</script>

<div class="flex flex-col">
  <div class="flex relative">
    <input
      id={name}
      {name}
      {type}
      {value}
      {placeholder}
      class={className}
      on:change
    />
  </div>
</div>
