<template>
    <article class="positionPostData">
        <!--<div class="postData">
            <div class="namePost">
                <h3 class="name">nom</h3>
                <h3 class="name">prénom</h3>
            </div>
            <div class="postText">
                <p class="postOfPersonne"></p>
            </div>
        </div>-->
    </article>
</template>

<script>
export default{
    name: 'postCreate'
}

</script>

<style scoped>
/* post déjà créer */

.positionPostData {
  display: flex;
}
.postData {
  width: 500px;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
}

.name {
  margin-left: 20px;
  margin-top: 5px;
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


</style>