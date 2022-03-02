<template>
<div>
    <div class="profil" @click="toggleModale()">
            <i id="iconProfil" class="fas fa-cog"></i>
            <h3 class="h3">Profil</h3>
    </div>
    <profilUser :profil="profil" :toggleModale="toggleModale" v-if="revele == true"/>
</div>
</template>

<script>
import profilUser from './profilUser.vue'
import {mapActions, mapState} from 'vuex'

export default {
    name: 'profilBtn',
    components:{
        profilUser
    },
     data(){
      return {
        revele: false
      }

      
    },
        async mounted(){
        await this.$nextTick();
        await this.fetchProfil();
    },
    
    computed:{
        ...mapState(["profil"])
    },
  
    methods:{
        ...mapActions(['fetchProfil']),

        toggleModale(){
            this.revele = !this.revele
        }
    }
}
</script>

<style scoped>

/*Profil*/
.profil {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  width: 75px;
  border-radius: 20px;
  height: 30px;
  position: relative;
  left: 110px;
  cursor: pointer;
}

.h3 {
  font-size: 15px;
  display: flex;
  margin-top: 0;
  margin-bottom: 0;
  margin-left: 6px;
}

/* responsive */
@media screen and (max-width: 500px){
  .profil{
    left: 38px;
  }
}

</style>