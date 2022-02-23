<template>
  <div class="postList">
    <ul class="positionPostData">
        <posts v-for="post in $store.state.posts" :post="post" :key="post.user"/>
    </ul>
  </div>
</template>


<script>
import posts from "./posts.vue";
import axios from "axios"

export default {
  name: "postList",

  components: {
    posts,
  },
  async mounted() {
    await this.$nextTick;
    await this.getAllPost();
  },
  methods:{
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
  }
};

</script>

<style scoped>
/* selecteur general */
ul{
   padding-left: 0px;
 }
/* positionnement des post */
.positionPostData {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>