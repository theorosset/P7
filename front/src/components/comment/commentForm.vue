<template>
    <section class="positionComment">
        <div class="comment">
            <form class="formComment" @submit.prevent="createComment()" :postId="postId">
                <textarea v-model="form.text" class="createComment" type="text"  spellcheck="false" placeholder="commenter"></textarea>
                <input class="submitComment" type="submit" value="Commenter">
            </form>
        </div>
    </section>
</template>



<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        text: "",
      },
    };
  },
  props: {
    postId: {
      type: Number,
      required: true,
    },
  },

  methods: {
    /**
     * formattage de la date
     */
    dateFormat() {
      const date = new Date();
      const dateNow =
        date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
      const dateTime =
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      const fullDate = `${dateNow} ${dateTime}`;
      return fullDate;
    },
    /**
     * création d'un commentaire
     */
    createComment() {
      const token = localStorage.getItem("token");
      /**
       * method: post
       * body: envoie des information qu'attend le backend
       * headers: envoie du token pour verification de validité
       */
      axios
        .post(
          "http://localhost:3000/api/groupomania/comment",
          {
            post_id: this.postId,
            text: this.form.text,
            date: this.dateFormat(),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        //une fois le post créer on récupêre tout les post
        .then(() => {
          this.getCommentOfOnePost(this.postId);
        })
        .catch(() => alert(`Votre status n'a pas pus être créer`));
    },
    getCommentOfOnePost(postId) {
      const token = localStorage.getItem("token");
      axios
        .get(`http://localhost:3000/api/groupomania/comment/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          return (this.$store.state.comments = res.data);
        });
    },
  },
};


</script>


<style scoped>


.formComment{
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.createComment{
    width: 300px;
    height: 25px;
}

.submitComment{
    margin-right: 6px;
    margin-left: 11px;
    height: 1.4rem;
    padding-right: 2px;
    padding-left: 2px;
}


</style>