<template>
<div class="Groupomania">
       <headerGroupomania />
       <post/>
       <postCreate/>
</div>

</template>



<script>

import headerGroupomania from "../components/headerGroupomania.vue"
import Post from "../components/Post.vue"
import postCreate from "../components/PostCreate.vue"
export default{
    name:"Groupomania",
    components :{
        headerGroupomania,
        Post,
        postCreate

    },
    
}
</script>