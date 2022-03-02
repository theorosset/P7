<template>
    <div class="commentAndLike">
        <div class="btn">
          <div class="likes">
            <btnLike :getAllLikes="getAllLikes" :postId="postId"/>
             <p :postId="postId" class="numberLike">{{likes}}</p>
          </div>
            <i id="commentIcon" @click.stop="openComment(postId)" :revele="revele"  class="fas fa-comment"></i>
        </div>
        <commentList  :postId="postId" v-if="revele == true" />
        
    </div>
</template>


<script>
import axios from 'axios'
import commentList from "../comment/commentList.vue"
import btnLike from './postBtnLike.vue'


export default {
  name: "gestionCommentLike",
  props: {
    postId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      likes: 0,
      revele: false,
    };
  },

  async mounted() {
    await this.$nextTick();
    await this.getAllLikes(this.postId);
  },
  components: {
    commentList,
    btnLike,
  },
  methods: {
    getAllLikes(postId) {
      const token = localStorage.getItem("token");
      axios
        .get(
          `http://localhost:3000/api/groupomania/post/like/count/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          return (this.likes = res.data[0].likeTotal);
        });
    },

    openComment() {
      this.revele = !this.revele;
    },
  },
};

</script>

<style scoped>
 
.btn{
    display: flex;
    justify-content: space-around;
    align-items: baseline;
    margin-bottom: 15px;
    margin-top: 20px;
    margin-left: 15px;
    margin-right: 15px;
}

#commentIcon{
    cursor: pointer;
    font-size: 25px;
}

.likes{
  display: flex;
  align-items: baseline;
}
.numberLike{
  margin-top: 0;
  margin-bottom: 0;
  margin-left: 8px;
}

</style>