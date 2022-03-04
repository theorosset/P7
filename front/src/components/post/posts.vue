<template>
    <div class="posts">
      <li class="postData"  v-for="post in posts" :postId="post.id" :key="post.id" >
        <div class="delet">
          <btnDelete :postUser="post.user" :postId='post.id' />
        </div>
        <div class="namePost">
          <pictureUser class="picture"/>
          <h3 class="firstName">{{post.firstName}}</h3>
          <h3 class="lastName">{{ post.lastName }}</h3>
        </div>
        <p class="date">{{getDate(post.date)}}</p>
        <div v-if="post.text" class="postText">
          <p  class="postOfPersonne">{{post.text}}</p>
        </div>
        <div v-if="post.imageUrl" class="image">
          <img  class="postImage" :src="post.imageUrl" >
        </div>
        <gestionCommentLike :postId="post.id"/>
      </li>
    </div>
</template>



<script>

import pictureUser from '../indexPage/pictureUser.vue'
import gestionCommentLike from "./postGestionLikeComment.vue"
import btnDelete from "./postBtnDelete.vue"

export default {
  name: "posts",

  props: {
    posts: {
      type: Array,
      default: () => [],
    },
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
    gestionCommentLike,
    btnDelete
  },

  methods: {
    getDate(date_h){
     const date = date_h.split("T")[0];
     const dateReverse = date.split("-")
     return dateReverse.reverse().join("-")
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
  background-color: white;
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
  background-color: #f1f1f1;
}

.date{
  margin: 0px;
  display: flex;
  position: relative;
  bottom: 30px;
  left: 82px;
}
/* div delete */
.delet{
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
  margin-right: 5px;
  margin-top: 5px;
  font-size: 13px;
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
/*responsive */
@media screen and (max-width: 500px){
  .postData{
    border-radius: 0px;
    border-right: none;
    border-left: none;
    box-sizing: border-box;
    width: 100%;
  }
  .postOfPersonne{
    width: 60%;
    margin-top: 5px;
  }
  .picture{
    font-size: 20px;
    padding: 0.5rem;
  }
  .postImage{
    width: 100%;
    max-height: 400px;
  }
  .date{
    bottom: 18px;
    left: 68px;
  }
}
</style>