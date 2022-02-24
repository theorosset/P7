<template>
    <div class="commentAndLike">
        <div class="btn">
            <btnLike  :postId="postId"/>
            <i id="commentIcon" @click="openComment(postId)" :revele="revele"  class="fas fa-comment"></i>
        </div>
        <commentList  :postId="postId" v-if="revele == true" />
        
    </div>
</template>


<script>
//import axios from 'axios'
import commentList from "../comment/commentList.vue"
import btnLike from './postBtnLike.vue'


export default {
    name: 'btnComment',
    props:{
        postId:{
            type: Number,
            required:true
        },
    },

      
    data(){
        return{
        revele: false,
        
    }
    },
    components:{
        commentList,
        btnLike,

    },
    methods:{
        openComment() {
      this.revele = !this.revele
    },
    }
}
</script>

<style scoped>
 
.btn{
    display: flex;
    justify-content: space-around;
    align-items: baseline;
    margin-bottom: 15px;
    margin-top: 17px;
    margin-left: 15px;
    margin-right: 15px;
}

#commentIcon{
    cursor: pointer;
    font-size: 25px;
}


</style>