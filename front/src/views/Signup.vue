<template>
  <div class="signup">
    <img id="logo" src="../assets/images/icon-above-font.png" alt="logo de l'entreprise">
      <div class="border_form">
        <form class="form" @submit.prevent="validForm">
          <label class="label_firstName" for="firstName">Prénom </label>
          <input v-model="firstName"  @blur="$v.firstName.$touch()"  @input="setFirstName($event.target.value)" required type="text" name="firstName" id="firstName" class="champ_form"><br>

          <div class="error" v-if="!$v.firstName.required">* Champs requis</div>
          <div class="error" v-if="!$v.firstName.minLength">* minimum {{$v.firstName.$params.minLength.min}} lettre.</div>

          <label class="label_lastName" for="lastName">Nom </label>
          <input v-model="lastName"  @blur="$v.lastName.$touch()"  @input="setLastName($event.target.value)" required type="text" name="lastName" id="lastName" class="champ_form"><br>

          <div class="error" v-if="!$v.lastName.required">* Champs requis</div>
          <div class="error" v-if="!$v.lastName.minLength">* minimum {{$v.lastName.$params.minLength.min}} lettre.</div>

          <label class="label_email" for="email">Email </label>
          <input v-model="email"  required  @input="setEmail($event.target.value)" type="email" name="email" id="email" class="champ_form"><br>

          <div class="error" v-if="!$v.email.required">* Champs requis</div>
          <div class="error" v-if="$v.email.$invalid">* Renseignez un email valide</div>

          <label class="label_password" for="password">Mot de passe </label>
          <input v-model="password"  @input="setPassword($event.target.value)" required type="password" name="password" id="password" class="champ_form">
          
          <div class="error" v-if="!$v.password.required">* Champs requis</div>
          <div class="error" v-if="!$v.password.minLength">* minimum {{$v.password.$params.minLength.min}} lettre.</div>

          <input  type="submit" id="submit" value="connexion">
                
        </form>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import { required, minLength, email} from 'vuelidate/lib/validators'

export default {
  name: 'Signup',
  data(){
    return {
          firstName:'',
          lastName:'',
          email:'',
          password:'',
    }
  },

  validations:{
          firstName:{required, minLength: minLength(3)},
          lastName:{required, minLength: minLength(3)},
          email:{required, email},
          password:{required, minLength: minLength(7)},
        },
  
  methods:{
    //validation du formulaire
    setFirstName(value){
      this.firstName = value
      this.$v.firstName.$touch()},

    setLastName(value){
      this.lastName = value
      this.$v.lastName.$touch()},

    setEmail(value){
      this.email = value
      this.$v.email.$touch()},

    setPassword(value){
      this.password = value
      this.$v.password.$touch()},

  //envoie des information au back et redirection sur la connexion
   UserCreate(){
     axios.post("http://localhost:3000/api/auth/signup",{
        lastName: this.lastName,
        firstName: this.firstName,
        email: this.email,
        password: this.password,
     }).then(() => {
      this.$router.push("/login");
     }).catch(() => {
      alert("Nous ne pouvons pas créer votre compte actuellement");
     });
     
   },
   validForm(){
     if (this.$v.$invalid){ 
           alert('Certains champs ne sont pas remplis correctement')
         }else{this.UserCreate()}
    }
  }
}
</script>

<style>
/*taille de la page*/

.signup {
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

.label_lastName {
  margin-top: 20px;
}

.label_email {
  margin-top: 20px;
}


.champ_form {
  height: 20px;
}

.texte_signup {
  text-align: center;
}

</style>
