<template>
  <div class="posts">
    <li class="postData" v-for="post in $store.state.posts" :key="post.user" >
      <div class="namePost">
        <h3 class="name1">{{post.firstName}}</h3>
        <h3 class="name">{{ post.lastName }}</h3>
         <i id="delet" @click="delet(post.id)" class="fas fa-trash"></i>
      </div>
      <div class="postText">
        <p class="postOfPersonne">{{post.text}}</p>
      </div>
    </li>
  </div>
</template>



<script>
import axios from "axios";

export default {
  name: "posts",
  props: {
    type: Object,
  },

  async mounted() {
    await this.$nextTick;
    await this.getAllPost();
  },

  methods: {
    delet(postId) {
      const token = localStorage.getItem("token");

      axios
        .delete(`http://localhost:3000/api/groupomania/${postId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => this.getAllPost())
        .catch(() => {
          alert("Nous avons pas réussis a supprimer votre status");
        });
    },
    getAllPost() {
      axios.get("http://localhost:3000/api/groupomania").then((res) => {
        this.$store.state.posts = res.data;
      });
    },
  },
};

</script>

<style scoped>
/*selecteur general*/
h3{
  margin-top: 0px
}
li{
  list-style: none;
}
/* post déjà créer */

.postData {
  width: 500px;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
}

.name{
  margin-left: 20px;
  flex-grow: 1;
}
.namePost {
  display: flex;
}

.postText {
  display: flex;
  justify-content: center;
}

.postOfPersonne {
  display: flex;

  flex-direction: column;
  border: 1px solid black;
  width: 200px;
}

/*bouton delet et modify*/

#delet{
  display: flex;
}
#delet:hover{
    cursor: pointer;
}


</style>