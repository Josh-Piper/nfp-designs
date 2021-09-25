<template>
  <div class="app">
    <NavigationBar :current-link="'About'" />
    <p class="section-header-text">Wanting to get started quickly? Choose your Required Need!</p>
    <div id="about-hero">
      <div v-for="(item, index) in heroContent" :key="index">
        <HeroAdvert :title="item.title" :steps="item.steps" :redirect-link="item.redirectLink"/>
      </div>
    </div>
    <Footer class="footer-main" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapState('about', ['heroContent'])
  },
  mounted () {
    console.log(this.heroContent)
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

  .footer
  {
    position: fixed;
    bottom: 0;
    max-height: 150px;
  }

  .section-header-text
  {
    margin: 100px 10px 20px 10px;
    font-size: 2em;
    height: 2em;
    font-weight: bold;
    color: #1b1b1b;
    font-family: 'Roboto', sans-serif;
    align-self: center;
    text-align: center;
    height: 2em;
  }

  /* title message sizes responsiveness */
  @media only screen and (max-width : 915px)
  {
    .section-header-text
    {
      margin-top: 50px;
      font-size: 1.25em;
      height: 1.25em;
    }
  }

  @media only screen and (max-width : 600px)
  {
    .section-header-text
    {
       margin-top: 15px;
      font-size: 1em;
      height: 1em;
    }

    .footer-main
    {
      max-height: 175px;
      min-height: 175px;
    }
  }

</style>

<style scoped>

</style>
