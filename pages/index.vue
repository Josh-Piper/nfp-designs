<template>
  <div class="app">
    <NavigationBar :current-link="'About'" />

    <p class="section-header-text">Wanting to get started quickly? Choose your Required Need!</p>
    <div id="about-hero">
      <div v-for="(item, index) in heroContent" :key="index">
        <HeroAdvert
          :title="item.title"
          :steps="item.steps"
          :redirect-link="item.redirectLink"
          :background-color="item.backgroundColor"
        />
      </div>
    </div>

    <p class="section-header-text">What is NFP Designs and how does it work?</p>
    <div id="about-nfp-descriptions">
      <p>agf</p>
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
    background-color: #F5F5F5;
    margin: 0;
    padding: 0;
    height: 100%;
  }

  .app
  {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: auto;
  }

  .footer-main
  {
    height: 150px;
    position: absolute;
    bottom: 0;
    top: auto;
  }

  .section-header-text
  {
    width: 100vw;
    height: 2em;
    margin: 100px 10px 20px 10px;
    font-size: 2em;
    font-weight: bold;
    color: #1b1b1b;
    font-family: 'Roboto', sans-serif;
    align-self: center;
    text-align: center;
    height: 2em;
  }

  #about-hero
  {
    width: 100vw;
    height: 500px;
    max-height: 500px;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

   #about-hero>div
   {
     margin: 0 30px;
   }

  /* title message sizes responsiveness */
  @media only screen and (max-width : 950px)
  {
    .section-header-text
    {
      margin-top: 50px;
      font-size: 1.25em;
      height: 1.25em;
    }
  }

  @media only screen and (max-width : 800px)
  {
    #about-hero
    {
      flex-direction: column;
      height: 1000px;
      max-height: 1000px;
      align-items: center;
    }

    #about-hero>div
    {
      margin: 30px 0px;
    }

    .footer-main
    {
       position: relative;
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
