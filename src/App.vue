<template>
  <div id="app">
    <v-app id="inspire">
     <v-header />

      <v-main class="grey lighten-3">
        <v-container>
          <v-row>
            <router-view />
          </v-row>
        </v-container>
      </v-main>
    </v-app>
    <vue-snotify />
  </div>
</template>

<script>
import Header from "@/layouts/_partials/Header";
export default {
  components: { VHeader: Header }
}
</script>

<style lang="scss">
@import "~vue-snotify/styles/material.scss";
body,html {
  font-family: 'Roboto', sans-serif;
}
</style>
