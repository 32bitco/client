<script lang="ts">
  export let type = 'text';
  export let name = '';
  export let placeholder = '';
  export let required = false;
  export let id = '';
  export let value = '';
  export let autocomplete = '';
  export let label = '';
</script>

<div>
  <label for="first-name" class="block text-sm font-medium text-gray-700">{label}</label>
  <input
    {type}
    {name}
    {id}
    {placeholder}
    {required}
    {value}
    {autocomplete}
    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
  />
</div>
