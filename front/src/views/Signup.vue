<template>
  <div class="signup">
        <img id="logo" src="../assets/images/icon-above-font.png" alt="logo de l'entreprise">
        <div class="border_form">
            <form class="form" @submit.prevent="validForm">
                <label class="label_firstName" for="firstName">Prénom </label>
                  <input v-model="form.firstName" :error-messages="firstNameErrors" @blur="$v.form.firstName.$touch()"  @input="$v.form.firstName.$touch()" required type="text" name="firstName" id="firstName" class="champ_form"><br>
                  
                <label class="label_lastName" for="lastName">Nom </label>
                  <input v-model="form.lastName" :error-messages="lastNameErrors" @blur="$v.form.lastName.$touch()"  @input="$v.form.lastName.$touch()" required type="text" name="lastName" id="lastName" class="champ_form"><br>
            
                <label class="label_email" for="email">Email </label>
                  <input v-model="form.email" :error-messages="emailErrors" required  @input="$v.form.email.$touch()" type="email" name="email" id="email" class="champ_form"><br>
                 
                <label class="label_password" for="password">Mot de passe </label>
                  <input v-model="form.password" :error-messages="passwordErrors" @blur="$v.form.password.$touch()" @input="$v.form.password.$touch()" required type="password" name="password" id="password" class="champ_form">
                  
                <input  type="submit" id="submit" value="connexion">
                
            </form>
            <div class="validators">
              <pre>{{$v}}</pre>
            </div>
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
        form:{
          firstName:'',
          lastName:'',
          email:'',
          password:'',
          },
       
    }
  },

  validations:{
          firstName:{required, minLength: minLength(3)},
          lastName:{required, minLength: minLength(3)},
          email:{required, email},
          password:{required, minLength: minLength(7)},
        },
  computed:{ 
    firstNameErrors () {
      const errors = []
      if (!this.$v.firstName.$dirty) return errors
      !this.$v.firstName.minLength && errors.push('Votre prénom doit faire minimum 3 caractere')
      !this.$v.firstName.required && errors.push('Veuillez remplir ce champs.')
     return errors },
   
   lastNameErrors () {
      const errors = []
      if (!this.$v.lastName.$dirty) return errors
      !this.$v.lastName.minLength && errors.push('Votre nom doit faire minimum 3 caractere')
      !this.$v.lastName.required && errors.push('Veuillez remplir ce champs')
     return errors },
  
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
     axios.post("http://localhost:3000/api/auth/signup",{
        user_name: this.form.lastName,
        user_firstName: this.form.firstName,
        user_email: this.form.email,
        user_password: this.form.password,
     }).then(() => {
      document.location.href = `/groupomania`       
     }).catch(() => {
      alert("Adress mail déjà utilisé")
     });
     
   },
   validForm(){
     if (this.$v.firstName.$dirty === false && 
         this.$v.lastName.$dirty === false && 
         this.$v.email.$dirty === false && 
         this.$v.password.$dirty === false){ 
           this.UserCreate()
         }
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
