<template>
    <p  class="layout" @click="clearStorage()">Se déconnecter</p>
</template>

<script>
export default {
    name:'layout',
    methods:{
        clearStorage(){
            localStorage.clear()
            this.$router.push("/login")
        }
    }
}
</script>

<style scoped>
.layout{
    margin: 0;
    cursor: pointer;
    text-decoration: underline;
    color: blue;
}
</style>