<template>
    <i v-if="revele == true" id="deletBtn" @click="deletePost(postId)" class="fas fa-trash"></i>
</template>

<script>
import { mapActions } from 'vuex'


export default {
    name: 'btnDelete',
    data(){
        return{
            revele: false
        }
    },
    mounted(){
        this.reveleBtn()
    },
    props:{
        postUser:{type:Number},
        postId:{type:Number}
    },
    methods:{
        ...mapActions(["deletePost"]),
        reveleBtn(){
            const userId = localStorage.getItem("userId")
            if (this.postUser == userId ){
                return this.revele = true
            }
        }

    }
}
</script>

<style scoped>
/*bouton delet*/

#deletBtn:hover{
    cursor: pointer;
}
</style>