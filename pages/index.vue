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

    <p class="section-header-text">Portfolio</p>
    <div id="portfolio-description-container">
      <div id="portfolio-description">
        The design and functionality of a website is combined. Combing these two user experiences has proven to be effective. Allow your ideas come to fruition while also allowing the users to enjoy an elegant interaction. Ultimately connecting NFP organisations with the designs and functionality required to allow their work to be reached!
      </div>
    </div>

    <div class="center-mid">
      <div id="portfolio-wrapper-container">
        <div v-for="(item, index) in portfolio" :key="index" class="portfolio-item">
          <img :src="item.imageSrc" :alt="item.imageAlt" class="portfolio-image":style="`border: solid 7px ${applyBorder(index)}`" />
          <a target="_blank" :href="`${item.descriptionRedirect}`" class="portfolio-button">{{ item.description }}</a>
        </div>
      </div>
    </div>

    <div class="get-started-container">
      <GetStarted />
    </div>


    <Footer class="footer-main" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapState('about', ['heroContent', 'servicesAndExplanations', 'portfolio'])
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
    },
    applyBorder (index: number): string {
      if (index >= 4) {
        return '#195748'
      } else if (index >= 2) {
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

  .center-mid
  {
    display: flex;
    justify-content: center;
    width: 100%;
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
    width: 25%;
    min-width: 25%;
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
    height: 625px;
    margin-bottom: 85px;
    white-space: pre-line;
    padding: 0 15px;
  }

  #portfolio-description-container
  {
    display: flex;
    justify-content: center;
  }

  #portfolio-description
  {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1.75em;
    width: 75%;
    text-align: center;
    margin-bottom: 20px;
  }

  #portfolio-wrapper-container
  {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-row-gap: 30px;
    grid-column-gap: 60px;
    justify-content: center;
    flex-wrap: wrap;
    width: 60%;
  }

  .portfolio-item
  {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .portfolio-image
  {
    width: 100%;
    height: 100%;
  }

  .portfolio-button
  {
    margin-top: 15px;
    color: white;
    background: #4473EA;
    text-decoration: none;
    font-size: 1.15em;
    padding: 0 25px;
    border-radius: 25px;
  }

  .get-started-container
  {
    margin: 50px 0;
    width: 100vw;
    display: flex;
    justify-content: center;
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
      height: 450px;
    }
  }

  @media only screen and (max-width : 800px)
  {

    .section-header-text
    {
      width: 75%;
    }

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
      width: 100%;

    }

    .about-nfp-descriptions-container
    {
      width: 80%;
      /* width: 350px; */
    }

    .about-nfp-descriptions-content
    {
      height: 700px;
    }

    #portfolio-wrapper-container
    {
      grid-template-rows: repeat(6, 1fr);
      grid-template-columns: 1fr;
    }

    .portfolio-button
    {
      padding: 10px 25px;
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
