<template>
  <div class="app">
    <NavigationBar :current-link="'About'" />
    <h1>About Page</h1>
    <Footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// import { mapState } from 'vuex'

export default Vue.extend({
  computed: {

  }
})
</script>

<style>

*
{
  margin: 0;
  padding: 0;
  height: 100%;
}

.app
{
  background-color: #F5F5F5;
  display: flex;
  flex-direction: column;
  width: 100vw;
}

</style>

<style scoped>

</style>
