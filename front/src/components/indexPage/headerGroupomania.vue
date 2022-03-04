<template>

    <header class="headeur">
        <img class="logoWhite" src="@/assets/icon-left-font-monochrome-white.png" alt="logo de l'entreprise" />
        <profilBtn />
        
        
    </header>

</template>


<script>

import profilBtn from '../profil/profilUserBtn.vue'


export default{
    name:'headerGroupomania',

    components:{
      profilBtn,
     
    }
}

</script>

<style scoped>
/*parametre general*/
header{ margin: 0px;}
 /* headeur */
.headeur {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background-color: #d13d48d4;
}

.logoWhite {
  margin-left: 59px;
  display: flex;
  position: relative;
  width: 150px;
  height: 150px;
}

</style>