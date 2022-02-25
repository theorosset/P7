<template>
<div class="CommentList" >
    <ul class="positionCommentData">
        <commentWindow :comments="comments" :postId="postId"/>
    </ul>
</div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import commentWindow from "./commentWindow.vue"

export default {
  name: "commentList",
  props: {
    postId: {
      type: Number,
      required: true,
    },
  },
   async mounted(){
    await this.$nextTick();
    await this.fetchComments(this.postId)
  },
  computed:{
    ...mapState(['comments'])
  },

  components: {
    commentWindow,
  }, 

  methods: {
    ...mapActions(['fetchComments'])
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