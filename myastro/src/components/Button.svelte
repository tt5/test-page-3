<script>
    let message = "";
    export let color;
</script>

<button
    on:click={() => {
        toggleColorTheme();
    }}
    style="background: {color}; padding: 1rem;"
>
    Say Hello
</button>

{message}
