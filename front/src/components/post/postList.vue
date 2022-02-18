<template>
  <div class="postList">
    <ul class="positionPostData">
        <posts />
    </ul>
  </div>
</template>


<script>

import posts from './posts.vue'

export default {
    name: 'postList',
   components:{
       posts
   }
}
</script>

<style scoped>

.positionPostData {
  display: flex;
  justify-content: center;
}
</style>