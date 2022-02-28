<template>
    <div class="delete">
        <p  @click="deletAccount()" class="deleteAccount">Supprimer mon compte</p>
    </div>
</template>

<script>
import axios from 'axios'


export default {
  name: "profilDelete",
  methods: {
    deletAccount() {
      const token = localStorage.getItem("token");

      axios
        .delete("http://localhost:3000/api/auth/profil", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          localStorage.clear();
          console.log("c'est supprimez");
          this.$router.push("/login");
        })
        .catch((err) => console.log(err));
    },
  },
};

</script>



<style scoped>

.delete{
    display: flex;
    justify-content: center;
}
.deleteAccount{
    color: red;
    cursor: pointer;
    margin-top: 25px;
}
</style>