<template>
  <div class="postList">
    <ul class="positionPostData">
        <posts />
    </ul>
  </div>
</template>


<script>
import posts from "./posts.vue";

export default {
  name: "postList",
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
}
</style>