<template>
  <div class="app">
    <NavigationBar :current-link="'null'" />
    <div class="error-msg">
      <div class="error-msg-msgs">
        <h1 id="error-occurred-msg">
          Error Occurred
        </h1>
        <h2>Page not found!</h2>

        <font-awesome-icon
          :icon="['fas', 'surprise']"
          class="error-msg-surprise-icon"
        />

        <NuxtLink
          to="/"
          class="error-button-home"
        >
          Take me home
        </NuxtLink>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// import { mapState } from 'vuex'

export default Vue.extend({

})
</script>

<style scoped>
  .error-msg
  {
    height: 100vw;
    max-height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .error-msg-msgs
  {
    max-height: 80px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .error-msg-msgs>h1, .error-msg-msgs>h2
  {
    height: auto;
  }

  .error-msg-surprise-icon
  {
    margin-top: 5px;
    color: #324D66;
    font-size: 15em;
  }

</style>
