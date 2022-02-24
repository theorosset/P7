<template>
    <div class="posts">
      <li class="postData"  v-for="post in $store.state.posts" :postId="post.id" :key="post.id" >
        <div class="delet">
          <i id="deletBtn" @click="delet(post.id)" class="fas fa-trash"></i>
        </div>
        <div class="namePost">
          <pictureUser class="picture"/>
          <h3 class="firstName">{{post.firstName}}</h3>
          <h3 class="lastName">{{ post.lastName }}</h3>
        </div>
        <div class="postText">
          <p class="postOfPersonne">{{post.text}}</p>
        </div>
        <btnComment :postId="post.id"/>
        <commentForm  :postId="post.id" />
      </li>
     
    </div>
</template>



<script>
import axios from "axios";
import pictureUser from '../indexPage/pictureUser.vue'
import commentForm from '../comment/commentForm.vue'
import btnComment from "./postBtnComment.vue"


export default {
  name: "posts",

  props: {
   
  },

  data() {
    return {
      form: {
        text: "",
      },
    };
  },
  components: {
    pictureUser,
    btnComment,
    commentForm
  },
  async mounted(){
    await this.$nextTick
    await this.getAllPost()
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
      axios
        .get("http://localhost:3000/api/groupomania/post", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
         return  this.$store.state.posts = res.data;
        });
    },
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
.picture {
  margin-left: 16px;
  padding: 0.7rem;
  font-size: 30px;
}
.postData {
  width: 500px;
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  border: 1px solid black;
  border-radius: 5px;
}

.lastName {
  margin-left: 5px;
  flex-grow: 1;
}
.firstName{
     margin-left: 15px;
}

.firstName, .lastName{
  margin-bottom: 0px;
  
}

.namePost {
  display: flex;
 
  align-items: flex-start;
}

.postText {
  display: flex;
  justify-content: center;
  margin-top: -10px;
}

.postOfPersonne {
  display: flex;
  margin-top: 0px;
  padding: 5px;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 5px;
  width: 300px;
  margin-bottom: 0px;
}

/*bouton delet*/
.delet{
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
  margin-right: 5px;
  margin-top: 5px;
  font-size: 13px;
}
#deletBtn:hover{
    cursor: pointer;
}

</style>