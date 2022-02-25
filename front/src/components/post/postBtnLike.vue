<template>
        <i id="likeIcon" @click="likePost(postId)" v-if="isActive === false" :postId="postId" class="far fa-thumbs-up"></i>
        <i id="likeIcon" @click="likePost(postId)" v-else :postId="postId" class="fas fa-thumbs-up"></i>
</template>

<script>
import axios from 'axios'


export default {
  name: "btnlike",
  props: {
    postId: {
      type: Number,
      required: true,
    },
  },
  components: {},
  async mounted() {
    await this.$nextTick();
   await this.getAllLikes(this.postId);
  },
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    likePost(postId) {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      axios.post(`http://localhost:3000/api/groupomania/post/like/${postId}`,
          {
            user: userId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then(() => {
          this.getAllLikes(postId);
        });
    },
    getAllLikes(postId) {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      axios.get(`http://localhost:3000/api/groupomania/post/like/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          const userHaveLike = res.data.find(({ user }) => {
            return user == userId;
          });
          if (userHaveLike) {
            this.isActive = true;
          } else {
            this.isActive = false;
          }
        });
    },
  },
};

</script>


<style scoped>
/* like */
#likeIcon{
  display: flex;
  margin-top: 1px;
  cursor: pointer;
  font-size: 25px;
}
.background{
    background-color: black;
}

.like{
  display: flex;
  justify-content: space-evenly;
  margin-top: 17px;
  margin-bottom: 7px;
} 
.likeP{
  display: flex;
  margin-top: 0;
  margin-bottom: 0;
  margin-left: 5px;
}


</style>