<template>
  <div class="login">
         <img id="logo" src="../assets/images/icon-above-font.png" alt="logo de l'entreprise">
        <div class="border_form">
            <form class="form" @submit.prevent="validForm">

              <label class="label_email" for="email">Email </label>
              <input v-model="form.email" :error-messages="emailErrors" required  @input="$v.form.email.$touch()" type="email" name="email" id="email" class="champ_form"><br>
                 
              <label class="label_password" for="password">Mot de passe </label>
              <input v-model="form.password" :error-messages="passwordErrors" @blur="$v.form.password.$touch()" @input="$v.form.password.$touch()" required type="password" name="password" id="password" class="champ_form">
                
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
        form:{
          email:'',
          password:'',
          } 
    }
  },
  
  validations:{
    firstName:{required, minLength: minLength(3)},
          lastName:{required, minLength: minLength(3)},
          email:{required, email},
          password:{required, minLength: minLength(7)},
  },
  computed:{
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('Veuillez remplir ce champs')
      return errors},
     
    passwordErrors (){
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.minLength && errors.push('Votre Mot de passe doit faire minimum 7 caractere')
      !this.$v.password.required && errors.push('Veuillez remplir ce champs')
      return errors}
      },

    methods:{
      UserCreate(){
          axios.post("http://localhost:3000/api/auth/login",{

          user_email: this.form.email,
          user_password: this.form.password,
      }).then(() => {
        document.location.href = `/groupomania`       
      }).catch(() => {
        alert("mot de passe ou email incorrect")
      });
     
   },
   validForm(){
     if (this.$v.email.$dirty === false && this.$v.password.$dirty === false){ 
           this.UserCreate()
         }
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
