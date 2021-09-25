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
      <div v-for="(item, index) in servicesAndExplanations" :key="index" class="about-nfp-descriptions-container">
        <div class="about-nfp-descriptions-title" :style="`background: ${getColorForExplanation(item.title)}`">
          {{ item.title }}
        </div>
        <div class="about-nfp-descriptions-content">
          {{ item.content }}
        </div>
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
    ...mapState('about', ['heroContent', 'servicesAndExplanations'])
  },
  methods: {
    getColorForExplanation (explanation: string): string {
      if (explanation === 'Our Motive') {
        return '#195748'
      } else if (explanation === 'Development') {
        return '#4C4AA5'
      } else {
        return '#028FBC'
      }
    }
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
    position: relative;
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

  #about-nfp-descriptions
  {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
  }

  .about-nfp-descriptions-container
  {
    font-family: Arial, Helvetica, sans-serif;
    display: flex;
    flex-direction: column;
    font-size: 1.5em;
    width: 325px;
    min-width: 325px;
    margin: 0 30px;
  }

  .about-nfp-descriptions-title
  {
    color: white;
    text-align: center;
    font-size: 1.5em;
    font-weight: 500;
    padding: 10px 0 20px 0;
  }

  .about-nfp-descriptions-content
  {
    background: white;
    height: 500px;
    margin-bottom: 85px;
    white-space: pre-line;
    padding: 0 15px;
  }

  /* title message sizes responsiveness */
  @media only screen and (max-width : 950px)
  {
    .section-header-text
    {
      margin-top: 50px;
      font-size: 1.5em;
      height: 1.25em;
      text-align: center;
    }

    .about-nfp-descriptions-container
    {
      width: 200px;
      min-width: 200px;
      font-size: 1em;
    }

    .about-nfp-descriptions-content
    {
      height: 400px;
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

    #about-nfp-descriptions
    {
      flex-direction: column;
      align-items: center;
      font-size: 1.5em;
    }

    .about-nfp-descriptions-container
    {
      width: 350px;
    }

    .about-nfp-descriptions-content
    {
      height: 600px;
    }
  }

  @media only screen and (max-width : 600px)
  {
    .section-header-text
    {
      width: 80%;
      padding-bottom: 30px;
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
