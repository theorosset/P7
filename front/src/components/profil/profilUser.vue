<template>
    <div class="bloc-modale"> 
        <div class="overlay" @click="toggleModale"></div>
        <div class="modale">
            <i @click="toggleModale" id="iconClose" class="fas fa-times"></i>
            <div class="title">
                <h1 class="titleModale">Mon profil</h1>
            </div>
                
                <userInfo :profil="profil"/>   
            </div>
        </div>

    

</template>



<script>
import userInfo from './profilUserInfo.vue'

export default {
    name: 'profilUser',

    props:{
        toggleModale:{
            type: Function,
        },
        revele:{
            type:Boolean,
        },
        profil:{
            type: Array,
        }
    },
    components:{
        userInfo
    },
    methods:{
        
    }
    
}
</script>



<style scoped>
.bloc-modale{
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
}

.overlay{
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
.modale{
    position: fixed;
    top: 200px;
    background-color: white;
    border-radius: 10px;
    width: 350px;
    
    
}

.title{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(10, 132, 255, 1);
    border-radius: 10px 10px 0px 0px;
    height: 45px;
}
.titleModale{
    margin: 0px;
}
#iconClose{
    position: absolute;
    right: 2px;
    cursor: pointer;
}

</style>