<template>
  <div class="commentWindow" >
    <p  class="noComment" v-if="comments.length == 0">Il n'y a aucun commentaire actuellement ecrivez en un </p>
    <li  v-else class="containerComment"  v-for="comment in comments" :key="comment.id" >
      <div class="user">
        <pictureUser  class="picture"/>
        <div class="commentUserText">
          <div class="name">
            <h4 class="firstName">{{comment.firstName}} {{ comment.lastName }}</h4>
            
            <btnDelet :getComments="getComments" :postId="postId" :commentUser="comment.user" :commentId="comment.id"/>
          </div>
          <p class="text" >{{comment.text}}</p>
        </div>
      </div>
    </li>
  </div>
</template>



<script>
import pictureUser from "../indexPage/pictureUser.vue";
import btnDelet from './commentBtnDelet.vue'

export default {
  name: "commentWindow",
  props: {
     getComments: {
      type: Function,
    },
    comments: {
      type: Array,
      default: () => [],
    },
    postId: {
      type: Number,
      required: true,
    },
  },

  components: {
    pictureUser,
    btnDelet
  },
};
</script>


<style scoped>

.containerComment{
  border-top: 1px solid black;
  width: 450px;
  margin-left: auto;
  margin-right: auto;
}

.picture{
  font-size: 16px;
  padding: 8px;
}

.user{
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 18px;
  margin-bottom: 18px;
}

.text{
  margin: 0px;
}

.name{
  display: flex;
}

.commentUserText{
  display: flex;
  flex-direction: column;
  margin-left: 15px;
  flex-grow: 1;
}

.firstName{
  margin-top: 0px;
  margin-bottom: 0px;
  display: flex;
  flex-grow: 1;
}

/*responsive*/
@media screen and (max-width: 500px){
  .commentWindow{
    width: 100%;
  }
  .noComment{
    display: flex;
    justify-content: center;
  }
}
</style>