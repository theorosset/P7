<template>
<div class="CommentList">
    <ul class="positionCommentData">
        <commentWindow  :postId="postId"/>
    </ul>
</div>
</template>

<script>

import commentWindow from "./commentWindow.vue"

export default {
    name: 'commentPage',
    props: {
    postId: {
      type: Number,
      required: true,
    },
  },
    components:{
        commentWindow
    },
}
</script>


<style scoped>
.positionCommentData{
    list-style: none;
    padding: 0px;
    display: flex;
    justify-content: center;
}
</style>