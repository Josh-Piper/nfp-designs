<template>
  <div class="app">
    <NavigationBar :current-link="'FAQ'" />
    <h1>faq</h1>
    <p>
      route: {{ $route.params.FAQ }}
    </p>
    <Footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// import { mapState } from 'vuex'

export default Vue.extend({

})
</script>

<style>

</style>
