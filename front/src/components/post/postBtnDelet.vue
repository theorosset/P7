<template>
<i  id="delet"  class="fas fa-trash"></i>
</template>

<script>



export default {
    name: 'btnDelet',
    props:{
        type: HTMLButtonElement,
    }
}
</script>

<style scoped>
#delet:hover{
    cursor: pointer;
}
</style>