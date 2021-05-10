<template>
  <v-app>
    <nav-bar v-if="user != ''"></nav-bar>

    <v-main>
      <v-container>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from '@/components/Navbar'
import { mapState } from 'vuex';


export default {
  name: 'App',
  components: {
    NavBar
  },
  data: () => ({
    //
  }),
  computed: {
    ...mapState(['user'])
  }

};
</script>
