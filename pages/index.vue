<template>
  <div class="app">
    <NavigationBar :currentLink="'About'" />
    <h1>About Page</h1>
    <p>
      Counter : {{ counter }}
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapState(['counter'])
  }
})
</script>

<style>

*
{
  margin: 0;
  padding: 0;
}

.app
{
  width: 100vw;
  background-color: #F5F5F5;
}

</style>

<style scoped>

</style>
