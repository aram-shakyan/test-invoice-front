<template>
  <v-app-bar
      app
      color="white"
      flat
  >
    <v-container class="py-0 fill-height">
      <v-btn
          color="success"
          exact
          text
          :to="{ name: 'Home' }"
      >
        Home
      </v-btn>

      <v-btn
          color="primary"
          exact
          text
          :to="{ name: 'PaymentsHistory' }"
          v-if="hasPermission('view payed history')"
          class="ml-5"
      >
        History
      </v-btn>
      <v-spacer />
      <template v-if="IS_AUTHENTICATED">
        <span class="pl-5"> Hi {{ AUTH_USER.name }} ({{ AUTH_USER.role }})</span>

        <v-btn v-if="IS_AUTHENTICATED" text class="ml-5" @click="signOut" color="warning">
          Log out
        </v-btn>
      </template>
      <v-btn
          v-else
          exact
          text
          :to="{ name: 'Login' }"
      >
        Login
      </v-btn>

    </v-container>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions(['LOGOUT']),
    signOut() {
      this.LOGOUT().then(() => {
        this.$router.push({ name: 'Home' });
      })
    }
  },
  computed: {
    ...mapGetters(["IS_AUTHENTICATED", "AUTH_USER"])
  }
}
</script>

<style scoped>

</style>