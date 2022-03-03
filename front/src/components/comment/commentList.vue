<template>
<div class="CommentList" >
    <ul class="positionCommentData">
        <commentWindow :getComments="getComments" :comments="comments" :postId="postId"/>
    </ul>
    <commentForm :getComments="getComments" :postId="postId" />
</div>
</template>

<script>
import axios from "axios";

import commentWindow from "./commentWindow.vue";
import commentForm from "../comment/commentForm.vue";

export default {
  name: "commentList",
  props: {
    postId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      comments: [],
    };
  },
  async mounted() {
    await this.$nextTick();
    await this.getComments(this.postId);
  },

  components: {
    commentWindow,
    commentForm,
  },

  methods: {
    getComments(postId) {
      const token = localStorage.getItem("token");
      axios
        .get(`http://localhost:3000/api/groupomania/comment/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          this.comments = res.data;
        });
    },
  },
};

</script>


<style scoped>
.positionCommentData{
    list-style: none;
    padding: 0px;
    display: flex;
    justify-content: center;
}

</style>