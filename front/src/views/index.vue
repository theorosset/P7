<template>
<div class="Groupomania" v-bind="setTime()">
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
    methods:{
        //suppression du token dans le localStorage au bout de 24h
        setTime(){
            setTimeout(()=>{localStorage.clear()}, 86400000)
        }
    }
}
</script>