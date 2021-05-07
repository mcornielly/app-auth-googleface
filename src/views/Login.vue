<template>
  <v-layout justify-center>
    <v-flex xs12 sm8 md6 xl4>
      <v-card>
        <v-card-text :class="register ? 'success' : 'accent'" class="display-1 text-uppercase white--text text-center">
          <span v-if="!register">Ingreso</span>
          <span v-else>Registro</span>
        </v-card-text>

        <v-card-text>
          <v-btn block color="error" @click="google">
            <v-icon left dark>fab fa-google</v-icon>
            Google
          </v-btn>
          <v-btn block color="info" @click="facebook">
            <v-icon left dark>fab fa-facebook</v-icon>
            Facebook
          </v-btn>
        </v-card-text>
        <v-card-text>
          <v-btn block @click="register = true" v-if="!register">¿No tienes Cuenta registrate aqui?</v-btn>
          <v-btn block v-else>¿Ya tienes cuenta ingresa aqui?</v-btn>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import router from '@/router'
  import { mapMutations } from 'vuex'
  import { firebase, auth, db } from "@/firebase"
  export default {
    name: 'Login',
    data() {
      return {
        register: false
      }
    },
    components: {
  
    },
    methods: {
      ...mapMutations(['setUser']),
      facebook(){
        console.log('facebook');
        const provider = new firebase.auth.FacebookAuthProvider();
        this.login(provider)
      },
      google(){
        console.log('google')
        const provider = new firebase.auth.GoogleAuthProvider();
        this.login(provider)
      },
      async login(provider){
        firebase.auth().languageCode = 'es';
        try {
          const result = await firebase.auth().signInWithPopup(provider);
          const userSocial = result.user;
          console.log(userSocial);

          // Crear usuario
          const user =  {
            name: userSocial.displayName,
            email: userSocial.email,
            uid: userSocial.uid,
            photo: userSocial.photoURL
          }

          this.setUser(user)
          //Save DB
          await db.collection('users').doc(user.uid).set(
            user
          )

          console.log('Usuario registrado en DB')
          router.push({name: 'Home'})

        } catch(error) {
           console.log(error); 
        }
      }
    }
  }
</script>
