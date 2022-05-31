<script lang="ts">
  import Card from './Card.svelte';
  import Input from './Input.svelte';
  import Button from './Button.svelte';
</script>

<Card>
  <div class="mx-4">
    <div class="flex">
      <img
        class="w-10 h-10 mr-5 rounded-lg"
        src="https://avatars.githubusercontent.com/u/96664108?s=200&v=4"
        alt=""
      />
      <div class="w-full">
        <Input name="postbox" type="text" id="postbox" placeholder="Whats on your mind?" />
      </div>
    </div>
    <div class="flex justify-end">
      <Button variant="primary">Post</Button>
    </div>
  </div>
</Card>
