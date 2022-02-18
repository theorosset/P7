<template>
<div class="Groupomania">
       <headerGroupomania />
       <post/>
       <getPost/>
</div>

</template>



<script>

import headerGroupomania from "../components/headerGroupomania.vue"
import Post from "../components/Post.vue"
import getPost from "../components/getPost.vue"
export default{
    name:"Groupomania",
    components :{
        headerGroupomania,
        Post,
        getPost

    },
    
}
</script>