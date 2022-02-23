<template>
    <section class="positionPost">
        <div class="post">
         <postPicture />
            <form class="formPost" @submit.prevent="createPost()">
                <textarea v-model="form.text" class="createPost" type="text"  spellcheck="false" placeholder="Quelque chose a raconter ?"></textarea>
                <input class="submitPost" type="submit" value="Publier">
            </form>
        </div>
    </section>
</template>


<script>
import axios from "axios";
import postPicture from "./postPicture.vue"

export default {
  name: "postForm",
  data() {
    return {
      form: {
        text: "",
      },
    };
  },
  components:{
    postPicture
  },
  methods: {
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
     * création d'un status
     * method: post
     * body: envoie des information qu'attend le backend
     * headers: définis les headers
     */
    createPost() {
      const token = localStorage.getItem("token");

      axios
        .post(
          "http://localhost:3000/api/groupomania/post",
          {
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
        .then(() => {
          this.getAllPost();
        })
        .catch(() => alert(`Votre status n'a pas pus être créer`));
    },

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
  },
};

</script>

<style scoped>
/*post*/
.positionPost {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
.post {
  height: 100px;
  display: flex;
  width: 500px;
  border: 1px solid black;
  border-radius: 5px;
  align-items: center;
  justify-content: space-around;
}

.border{
  display: flex;
}



.createPost {
  font-family: sans-serif;
  font-size: 14px;
  display: flex;
  height: 55px;
  width: 280px;
  border-radius: 5px;
  box-shadow: none;
  resize: none;
}
.formPost {
  display: flex;
  align-items: center;
}
.submitPost {
  display: flex;
  position: relative;
  height: 25px;
  width: 70px;
  margin-left: 19px;
  margin-right: 15px;
  background-color: rgba(10, 132, 255, 1);
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

</style>