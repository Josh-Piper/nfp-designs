<template>
  <div>
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
