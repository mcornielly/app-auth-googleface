<template>
    <nav>
      <v-app-bar
      app
      color="info"
      dark
    >
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>Vue</v-toolbar-title>
    <v-spacer></v-spacer>
      <!-- <div class="d-flex align-center">
        <v-btn
          href="http://localhost:8080/"
          plain
        >
          <span>Vue - 2</span>
        </v-btn>
        </router-link>
      </div> -->

      <v-spacer></v-spacer>

      <v-btn
        href="#"
        text
      >
        <span class="mr-2" @click="logout">Cerrar Sesión</span>
        <v-icon>fas fa-sign-out-alt</v-icon>
      </v-btn>
    </v-app-bar>


    <v-navigation-drawer
    absolute
    v-model="drawer"
    bottom
    temporary
    >
      <v-layout column align-center mt-5>
        <v-flex>
          <v-avatar
            color="primary"
            size="56"
          >
            <img :src="user.photo" alt="">
          </v-avatar>
        </v-flex>

        <v-flex>
          <p class="mt-2">
            {{ user.name }}
          </p>
        </v-flex>
      </v-layout>

      <v-divider></v-divider>

      <v-list
      dense
      nav>
        <v-list-item v-for="(item, index) in lists" :key="index"
          :to="item.to"
          link
        >
          <v-list-item-icon>
            <v-icon>
               {{ item.icon }}
            </v-icon> 
          </v-list-item-icon>
          <v-list-item-content>
              <v-list-item-title class="title">
                {{ item.name }}
              </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    </nav>
    
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
    name: 'navbar',
    data() {
        return{
            drawer: true,
            lists: [
              {name: 'Dashboard', icon: 'fas fa-tachometer-alt', to:{
                name: 'Home'
              }},
              {name: 'Address', icon: 'far fa-address-book', to:{
                name: 'Login'
              }},
              {name: 'Chat', icon: 'far fa-comments', to:{
                name: 'Chat'
              }},
              {name: 'Users', icon: 'fas fa-users', to:{
                name: 'Admin'
              }},
            ]
            
        }
    },
    methods: {
        ...mapActions(['logout'])
    },
    computed: {
      ...mapState(['user'])
    }
}
</script>

<style>

</style>