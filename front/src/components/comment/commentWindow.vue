<template>
  <div class="commentWindow">
    <li class="containerComment" v-for="comment in $store.state.comments" :key="comment.user" > 
      <div class="name">
        <postPicture  class="picture"/>
        <div class="commentUserText">
          <h4 class="firstName">{{comment.firstName}}</h4>
          <h4 class="lastName">{{ comment.lastName }}</h4>
          <p>{{comment.text}}</p>
        </div>
      </div>
      
    </li>
  </div>
</template>



<script>
import axios from 'axios'
import postPicture from '../post/postPicture.vue'


export default {
    name:"commentWindow",
    props: {
  },
  components:{
    postPicture
  },
 async mounted(){
    await this.$nextTick
    await this.getAllComment()
  },
    methods: {
       getAllComment(){
         const token = localStorage.getItem("token")
         axios.get(`http://localhost:3000/api/groupomania/comment`,{
         headers:{
           Authorization: `Bearer ${token}`
         }
       }).then((res) => { return this.$store.state.comments = res.data})},
    },
}
</script>


<style scoped>






.commentUserText{
  display: flex;
}

.commentWindow{
  border: 1px solid black;
  width: 500px;
}



.firstName, .lastName{
  margin: 0px;
  margin-left: 5px;

}

</style>