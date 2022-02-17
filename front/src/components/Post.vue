<template>
    <section class="positionPost">
        <div class="post">
            <div class="picture"></div>
            <form class="formPost" @submit.prevent="createPost">
                <textarea v-model="form.text" class="createPost" type="text" placeholder="Quelque chose a raconter ?"></textarea>
                <input class="submitPost" type="submit">
            </form>
        </div>
    </section>
</template>


<script>




export default{
    name: 'post',
    data(){
      return {
        form:{
          text: ''
        },
        
      }
    },
    methods:{
      /**
       * création d'un status 
       * method: post
       * body: envoie des information qu'attend le backend       
       * headers: définis les headers
       */
      createPost(){
        const token = localStorage.getItem('token')
        fetch('http://localhost:3000/api/groupomania',{
          method: "POST",
          body:  JSON.stringify({post_post:this.form.text}),          
          headers:{ Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    }  
        }).then(() => alert('Votre status a bien été créé')).catch((err) => console.log(err));
      
      }
    }
}


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
  align-items: center;
  justify-content: center;
}

.picture {
  border: 1px solid black;
  width: 55px;
  height: 55px;
  border-radius: 100px;
}

.createPost {
  display: flex;
  height: 55px;
  width: 280px;
  margin-left: 10px;
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
  margin-left: 10px;
  background-color: rgba(10, 132, 255, 1);
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

</style>