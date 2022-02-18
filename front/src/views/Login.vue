<template>
  <div class="login">
         <img id="logo" src="../assets/images/icon-above-font.png" alt="logo de l'entreprise">
    <div class="border_form">
      <form class="form" @submit.prevent="validForm">

        <label class="label_email" for="email">Email </label>
        <input v-model="email"  required  @input="setEmail($event.target.value)" type="email" name="email" id="email" class="champ_form"><br>

        <div class="error" v-if="!$v.email.required">* Champs requis</div>
        <div class="error" v-if="$v.email.$invalid">* Renseignez un email valide</div>

        <label class="label_password" for="password">Mot de passe </label>
        <input v-model="password"  @blur="$v.password.$touch()" @input="setPassword($event.target.value)" required type="password" name="password" id="password" class="champ_form">
          
        <div class="error" v-if="!$v.password.required">* Champs requis</div>
        <div class="error" v-if="!$v.password.minLength">* minimum {{$v.password.$params.minLength.min}} lettre.</div>

        <input type="submit" id="submit" value="connexion">

      </form>
      
      <p class="texte_signup">Vous n'avez pas encore de compte ? <router-link to="/signup">Inscrivez-vous</router-link></p>
      
    </div>
    
  </div>
</template>


<script>
// @ is an alias to /src
import axios from 'axios'
import { required, minLength, email} from 'vuelidate/lib/validators'

export default {
  name: 'login',
   data(){
    return {
          email:'',
          password:'',
    }
  },
  
  validations:{
          email:{required, email},
          password:{required, minLength: minLength(7)},
  },
  

    methods:{
      //validation du formulaire
    setEmail(value){
      this.email = value
      this.$v.email.$touch()},
    setPassword(value){
      this.password = value
      this.$v.password.$touch()},

      UserLogin(){
          axios.post("http://localhost:3000/api/auth/login",{
          email: this.email,
          password: this.password,
      }).then((res) => {
         const token =  res.data.token;
        const userId = res.data.userId;

        axios.defaults.headers.common.Authorization = 'Bearer ' + token;

        localStorage.setItem('userId', userId);
        localStorage.setItem('token', token);
        this.$router.push("/");
        
               
      }).catch(() => {
        alert("mot de passe ou email incorrect")
      });
     
   },
  
   validForm(){
     if (this.$v.$invalid){ 
           alert('mot de passe ou email incorrect')
         }else{this.UserLogin()}
   }}
}
</script>




<style>
/*taille de la page*/

.login {
  max-width: 250px;
  margin: auto;
}
/*--------logo----------*/
#logo {
  position: relative;
  top: 50px;

  height: 250px;
}

/*--------------connexion---------*/
.form {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 208px;
}

.border_form {
  border-radius: 12px 12px 12px 12px;
  position: relative;
  border: 1px solid #f2f2f2;
  padding: 22px;
  padding-right: 25px;
  background-color: rgba(255, 110, 110, 1);
  display: flex;
  flex-direction: column;
}

#submit {
  margin-top: 20px;
}

.label_password {
  margin-top: 20px;
}

.champ_form {
  height: 20px;
}

.texte_signup {
  text-align: center;
}

</style>
