<template>
  <div class="posts">
    <li class="postData" v-for="post in $store.state.posts" :key="post.user" >
      <div class="namePost">
        <h3 class="firstName">{{post.firstName}}</h3>
        <h3 class="lastName">{{ post.lastName }}</h3>
        <i id="delet" @click="delet(post.id)" class="fas fa-trash"></i>
      </div>
      <div class="postText">
        <p class="postOfPersonne">{{post.text}}</p>
      </div>
      <hr>
      <div class="like">
        <i id="likeIcon" @click="likePost(post.id)" v-if="like === false" class="far fa-thumbs-up"></i>
        <i id="likeIcon" @click="likePost(post.id)" v-if="like === true" class="fas fa-thumbs-up"></i>
        <p class="likeP">j'aime</p>
      </div>
    </li>
  </div>
</template>



<script>
import axios from "axios";


export default {
  name: "posts",

  data(){
    return {
          form:{
            text:''
          },          
          like: false,
    }
  },

  async mounted() {
    await this.$nextTick;
    await this.getAllPost();
  },

  methods: {
    /**
    * suppression d'un post
    * @param {objectId} //récuperation de l'id du post 
    *
    * */
    delet(postId) {
      const token = localStorage.getItem("token");
    // requête a l'api pour supprimer le status
      axios
        .delete(`http://localhost:3000/api/groupomania/post/${postId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => this.getAllPost())
        .catch(() => {
          alert("Nous avons pas réussis a supprimer votre status");
        });
    },

    //requête a l'api pour récuperer tout les posts
    getAllPost() {
      const token = localStorage.getItem("token");
      axios.get("http://localhost:3000/api/groupomania/post",{
        headers:{
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
      }).then((res) => {
        this.$store.state.posts = res.data;
      });
    },
    likePost(postId){
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      axios.post(`http://localhost:3000/api/groupomania/post/like/${postId}`,{
        user: userId
      },{headers:{
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            }}).then(() =>{ this.toggleLike(postId)})
    },
    toggleLike(postId){
      const likeIcon = document.querySelectorAll("#likeIcon")
      likeIcon.forEach((el) => el.setAttribute('data-id', postId))
    }
  },
};

</script>

<style scoped>
/*selecteur general*/
h3{
  margin-top: 0px
}
li{
  list-style: none;
}
/* post déjà créer */

.postData {
  width: 500px;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
}

.lastName{
  margin-left: 20px;
  flex-grow: 1;
}
.namePost {
  display: flex;
  align-items: baseline;
}

.postText {
  display: flex;
  justify-content: center;
}

.postOfPersonne {
  display: flex;
  margin-top: 40px;
  flex-direction: column;
  border: 1px solid black;
  width: 200px;
}

/*bouton delet et modify*/
#modify{
  font-size: 13px;
}
#modify:hover{
  cursor: pointer;
}

#delet{
  display: flex;
  margin-left: 7px;
  font-size: 13px;
}
#delet:hover{
    cursor: pointer;
}
/* like */
#likeIcon{
  display: flex;
  margin-top: 1px;
  cursor: pointer;
}

.like{
  display: flex;
} 
.likeP{
  display: flex;
  margin-top: 0;
  margin-bottom: 0;
  margin-left: 5px;
}


</style>