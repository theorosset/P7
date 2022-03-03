<template>
    <i v-if="revele == true" id="deletBtn" @click="deleteComment(commentId)" class="fas fa-trash"></i>
</template>

<script>
import axios from 'axios';

export default {
  name: "btnDelet",
  data() {
    return {
      revele: false,
    };
  },
  mounted() {
    this.reveleBtn();
  },
  props: {
    commentUser: {
      type: Number,
    },

    postId: {
      type: Number,
      required: true,
    },
    getComments: {
      type: Function,
    },
    commentId: {
      type: Number,
    },
  },
  methods: {
    deleteComment(commentId) {
      const token = localStorage.getItem("token");
      axios
        .delete(`http://localhost:3000/api/groupomania/comment/${commentId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          alert("votre commentaire a bien été supprimer");
          this.getComments(this.postId);
        })
        .catch(() => {
          return alert("Nous avons pas réussis a supprimer votre commentaire");
        });
    },
    reveleBtn() {
      const userId = localStorage.getItem("userId");
      if (this.commentUser == userId) {
        return (this.revele = true);
      }
    },
  },
};

</script>

<style scoped>
#deletBtn:hover{
    cursor: pointer;
}
#deletBtn{
    font-size: 13px;
}
</style>