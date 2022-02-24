<template>
<div class="CommentList" >
    <ul class="positionCommentData">
        <commentWindow  :postId="postId"/>
    </ul>
</div>
</template>

<script>

import commentWindow from "./commentWindow.vue"
export default {
  name: "commentList",
  props: {
    postId: {
      type: Number,
      required: true,
    },
  },
  components: {
    commentWindow,
  },
};

</script>


<style scoped>
.positionCommentData{
    list-style: none;
    padding: 0px;
    display: flex;
    border-top: 1px solid black;
    width: 450px;
    margin-left: auto;
    margin-right: auto;
    
}
</style>