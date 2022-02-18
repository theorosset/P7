<template>
<div class="Groupomania">
       <headerGroupomania />
       <postForm />
       <postList />   
</div>

</template>



<script>

import headerGroupomania from "../components/indexPage/headerGroupomania.vue"
import postForm from "../components/post/postForm.vue"
import postList from "../components/post/postList.vue"
export default{
    name:"Groupomania",
    components :{
        headerGroupomania,
        postForm,
        postList
        
    },
    
}
</script>