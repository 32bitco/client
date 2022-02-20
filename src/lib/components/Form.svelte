<script>
    import Button from './Button.svelte';
    import applelogo from 'phosphor-svelte/lib/applelogo';
    import googlelogo from 'phosphor-svelte/lib/googlelogo';
</script>
<div>
    <header>
      <h2>Create an account</h2>
      <Button fullWidth label="Publish" icon={applelogo} variant="primary" />
      <Button fullWidth label="Publish" icon={googlelogo} variant="primary" />
    </header>
</div>