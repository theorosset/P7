<template>
<div class="Groupomania" >
       <headerGroupomania />
       <postForm />
       <postList  :posts="posts" />
</div>

</template>



<script>
import {mapActions, mapState} from 'vuex'
import headerGroupomania from "../components/indexPage/headerGroupomania.vue"
import postForm from "../components/post/postForm.vue"
import postList from "../components/post/postList.vue"

export default{
    name:"Groupomania",

    computed:{
        ...mapState(['posts']),
    },

    components :{
        headerGroupomania,
        postForm,
        postList,
  
    },
    async mounted () {
        await this.$nextTick()
        await this.fetchPosts()
    },
    methods:{
       ...mapActions(['fetchPosts'])
    }
}
</script>