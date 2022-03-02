<template>
    <section class="positionPost">
        <div class="post">
         <pictureUser class="picture" />
            <form class="formPost" @submit.prevent="createPost()">
                <textarea v-model="form.text" class="createPost" type="text"  spellcheck="false" placeholder="Quelque chose a raconter ?"></textarea>
                <div class="addPicture">
                  <input @change="filePick" ref="file" type="file" id="file" accept="image/png, image/jpeg, image/jpg">
                  <input class="submitPost" type="submit" value="Publier">
                </div>
            </form>
        </div>
    </section>
</template>


<script>
import { mapActions } from 'vuex'
import axios from "axios";
import pictureUser from "../indexPage/pictureUser.vue"

export default {
  name: "postForm",
  data() {
    return {
      files: null,
      form: {
        text: "",
      },
    };
  },
  components: {
    pictureUser,
  },
  methods: {
    ...mapActions(["fetchPosts"]),

    /**
     * création d'un status
     */
    createPost() {
      const token = localStorage.getItem("token");
      /**
       * method: post
       * body: envoie des information qu'attend le backend
       * headers: envoie du token pour verification de validité
       */
      const formData = new FormData();

      if (this.form.text !== "") {
        formData.append("text", this.form.text);
      }
      if (this.files !== null) {
        formData.append("image", this.files);
      }

      axios
        .post("http://localhost:3000/api/groupomania/post", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        })
        //une fois le post créer on récupêre tout les post
        .then(() => {
          this.fetchPosts();
          document.querySelector(".createPost").value = "";
          document.querySelector("#file").value = null;
        })
        .catch(() => {
          alert("Votre status est vide, remplissez le ");
        });
    },
    filePick(event) {
      this.files = event.target.files[0];
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
  height: 150px;
  display: flex;
  width: 500px;
  border: 1px solid rgba(10, 132, 255, 1);
  border-radius: 5px;
  align-items: center;
  justify-content: space-around;
  background-color: rgb(244, 244, 244);
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

.addPicture{
  display: flex;
  margin-top: 15px;
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
  z-index: 1;
  
}

.picture{
  padding: 0.7rem;
  font-size: 30px;
}
/* responsive*/
@media screen and (max-width: 500px){
  .post{  width: 100%;
  box-sizing: border-box;
  border-right: none;
  border-left: none;
  border-radius: 0px;}
  }
@media screen and (max-width: 420px){
  .picture{
    display: none;
  }

  .post{ 
    justify-content: center;
  }

}
</style>