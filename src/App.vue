<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="/modern-highspeed-train-tracks-orange-white-design-sleek-fast-transportation.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        @click="$router.push('/')"
        text
      >
        <span class="mr-2">Home</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
