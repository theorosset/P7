<template>
    <div class="posts">
        <li class="postData" v-for="post in posts" :key="post.user" >
            <div class="namePost">
                <h3 class="name">{{post.firstName}}</h3>
                <h3 class="name">{{ post.lastName }}</h3>
            </div>
            <div class="postText">
                <p class="postOfPersonne">{{post.text}}</p>
            </div>
        </li>
    </div>
</template>



<script>

import axios from 'axios'

export default {
    name: 'posts',

    data(){
      return {
        posts: []
      }      
    },

    mounted(){
      this.getAllPost()
    },

    methods:{
      getAllPost(){
        axios.get('http://localhost:3000/api/groupomania')
        .then((res) => {this.posts = res.data })
       
    }
  }
}

</script>

<style scoped>
/* post déjà créer */

.postData {
  width: 500px;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
}

.name {
  margin-left: 20px;
  margin-top: 5px;
}

.namePost {
  display: flex;
}

.postText {
  display: flex;
  justify-content: center;
}

.postOfPersonne {
  display: flex;

  flex-direction: column;
  border: 1px solid black;
  width: 200px;
}


</style>