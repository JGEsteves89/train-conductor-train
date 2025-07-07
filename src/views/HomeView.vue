<template>
  <v-container class="pa-4" fluid>
    <v-row justify="center">
      <v-col cols="12" md="4">
        <v-btn
          block
          color="primary"
          class="mb-4"
          @click="$router.push('/test1')"
        >
          ATTENTION TESTS: Group Bourdon test
        </v-btn>

        <v-btn
          block
          color="primary"
          class="mb-4"
          @click="$router.push('/test2')"
        >
          ATTENTION TESTS: TEA-Occ test
        </v-btn>

        <v-btn
          v-show="false"
          block
          color="primary"
          @click="$router.push('/test3')"
        >
          Test 3
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>


export default {
  name: "HomeView",

  components: {},
};
</script>
