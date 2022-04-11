<script lang="ts">
  // props for the input
  export let type = 'text';
  export let name: string;
  export let placeholder: string | undefined = undefined;
  export let required = false;
  export let id = '';
  export let value = '';
  export let autocomplete = '';
  export let inputClass = 'mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md';

  // props for the label
  export let label = '';
  export let labelClass = 'block text-sm font-medium text-gray-700';
  export let labelFor = '';
</script>

<div>
  <label for={labelFor} class={labelClass}>{label}</label>
  <input {type} {name} {id} {placeholder} {required} {value} {autocomplete} class={inputClass} />
</div>
