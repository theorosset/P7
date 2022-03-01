<template>
    <div class="posts">
      <li class="postData"  v-for="post in posts" :postId="post.id" :key="post.id" >
        <div class="delet">
          <i id="deletBtn" @click="deletePost(post.id)" class="fas fa-trash"></i>
        </div>
        <div class="namePost">
          <pictureUser class="picture"/>
          <h3 class="firstName">{{post.firstName}}</h3>
          <h3 class="lastName">{{ post.lastName }}</h3>
        </div>
        <div v-if="post.text" class="postText">
          <p class="postOfPersonne">{{post.text}}</p>
        </div>
        <div v-if="post.imageUrl" class="image">
          <img  class="postImage" :src="post.imageUrl" >
        </div>
        <btnComment :postId="post.id"/>
        <commentForm  :postId="post.id" />
      </li>
     
    </div>
</template>



<script>
import { mapActions } from 'vuex'
import pictureUser from '../indexPage/pictureUser.vue'
import commentForm from '../comment/commentForm.vue'
import btnComment from "./postBtnComment.vue"


export default {
  name: "posts",

  props: {
    posts:{
      type: Array, default: () => ([]) 
    }
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
    commentForm,

  },

  methods: {
    ...mapActions(['deletePost']),
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
  border: 1px solid rgba(10, 132, 255, 1);
  border-radius: 5px;
  background-color: rgb(244, 244, 244);
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
  border: 1px solid white;
  border-radius: 5px;
  width: 300px;
  margin-bottom: 0px;
  background-color: white;
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

/*image */
.image{
  display: flex;
  justify-content: center;
  margin-top: 25px;
  
}
.postImage{
  max-width: 450px;
  max-height: 500px;
}
</style>