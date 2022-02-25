<template>
  <div class="commentWindow" >
    <p  class="noComment" v-if="comments.length == 0">Il n'y a aucun commentaire actuellement ecrivez en un </p>
    <li v-else class="containerComment"  v-for="comment in comments"  :key="comment.id" > 
      <div class="user">
        <pictureUser  class="picture"/>
        <div class="commentUserText">
          <div class="name">
            <h4 class="firstName">{{comment.firstName}}</h4>
            <h4 class="lastName">{{ comment.lastName }}</h4>
          </div>
          <p class="text" >{{comment.text}}</p>
        </div>
      </div>
    </li>
  </div>
</template>



<script>

import pictureUser from '../indexPage/pictureUser.vue'

export default {
  name: "commentWindow",
  props: {
    comments:{
      type: Array, default: () => ([]) 
    },
    postId: {
      type: Number,
      required: true,
    },
  },

  components: {
    pictureUser,
  },

  methods:{
  }
};

</script>


<style scoped>

.picture{
  font-size: 16px;
  padding: 8px;
}

.user{
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 15px;
}

.text{
  margin: 0px;
}

.noComment{
  margin-left: 57px;
}

.name{
  display: flex;
}

.commentUserText{
  display: flex;
  flex-direction: column;
  margin-left: 15px;
}

.firstName, .lastName{
  margin-top: 0px;
  margin-bottom: 0px;
  display: flex;
}
.lastName{
  margin-left: 5px;
}

</style>