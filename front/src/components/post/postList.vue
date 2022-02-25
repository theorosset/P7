<template>
  <div class="postList">
    <ul class="positionPostData">
        <posts  :posts="posts" />
    </ul>
  </div>
</template>


<script>
import posts from "./posts.vue";

export default {
   name: "postList", 
      props: {
     posts: { type: Array, default: () => ([]) },
   },
  components: {
    posts,
  },
 
 
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