<template>
  <div class="app">
    <NavigationBar :current-link="'About'" />
    <p class="section-header-text">Wanting to get started quickly? Choose your Required Need!</p>
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

  .section-header-text
  {
    font-size: 2em;  
  }

</style>

<style scoped>

</style>
