<template>
    <div>
        <div class="userSettings" v-for="info of profil" :key="info.id">
            <postPicture  class="picture"/>
            <div class="info">
                <h2 class="titleInfo">Prénom : </h2>
                <p class="user">{{ info.firstName }}</p>
            </div>
            <div class="info">
                <h2 class="titleInfo">Nom : </h2>
                <p class="user">{{ info.lastName }}</p>
            </div>
            <div class="info">
                <h2 class="titleInfo">Adresse mail : </h2>
                <p class="user">{{ info.email }}</p>
            </div>
            <div class="info">
                <h2 class="titleInfo">Mot de passe : </h2>
                <p class="user">*******</p>
            </div>
        </div>
        <profilDelete />
    </div>
</template>

<script>
import profilDelete from './profilDelete.vue'
import postPicture from '../indexPage/pictureUser.vue'

export default {
  components: { profilDelete, postPicture },
    name:'userInfo',
    props:{
        profil:{
            type: Array,
        }
    },
}
</script>

<style scoped>
/* profil */

.picture{
    margin-top: 20px;
    font-size: 16px;
    padding: 8px;
}


.user{
    margin-left: 5px;
    margin-bottom: 0px;
}
.info{
    display: flex;
}
.userSettings{
    margin-left: 35px;
}
.titleInfo{
    font-size: 18px;
    margin-bottom: 0;
}


</style>