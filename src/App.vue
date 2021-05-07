<template>
  <v-app>
    <v-app-bar
      app
      color="info"
      dark
    >
      <div class="d-flex align-center">
        <v-btn
          href="http://localhost:8080/"
          plain
        >
          <span>Vue</span>
        </v-btn>
        </router-link>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="#"
        text
      >
        <span class="mr-2" @click="logout">Cerrar Sesión</span>
        <v-icon>fas fa-sign-out-alt</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'App',

  data: () => ({
    //
  }),
  methods: {
    ...mapActions(['logout'])
  }
};
</script>
