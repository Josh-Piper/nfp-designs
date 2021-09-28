<template>
  <div class="app">
    <NavigationBar :current-link="'Blog'" />
    <h1>Viewing Blog: {{ this.$route.params.Blog }}</h1>
    <Footer class="footer-main" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapState('blog', ['blogPosts'])
  }
})
</script>

<style>

</style>
