<template>
  <div class="app">
    <NavigationBar :current-link="'About'" />

    <!-- All details are drawn from a JSON file to represent APIs for the front-end -->
    <!-- NFP Designs main services -->
    <transition
      appear
      :css="false"
      @before-enter="beforeEnter"
      @enter="enter"
    >
      <p v-show="isLoaded" class="section-header-text">
        Wanting to get started quickly? Choose your Required Need!
      </p>
    </transition>

    <transition-group
      id="about-hero"
      tag="div"
      appear
      :css="false"
      @before-enter="beforeEnter"
      @enter="enter"
    >
      <div v-for="(item) in heroContent" :key="item.title">
        <HeroAdvert
          :title="item.title"
          :steps="item.steps"
          :redirect-link="item.redirectLink"
          :background-color="item.backgroundColor"
        />
      </div>
    </transition-group>

    <!-- NFP Designs Explanations -->
    <transition
      appear
      :css="false"
      @before-enter="beforeEnter"
      @enter="enter"
    >
      <p v-show="isLoaded" class="section-header-text">
        What is NFP Designs and how does it work?
      </p>
    </transition>

    <transition-group
      id="about-nfp-descriptions"
      tag="div"
      appear
      :css="false"
      @before-enter="beforeEnter"
      @enter="enter"
    >
      <div v-for="(item) in servicesAndExplanations" :key="item.title" class="about-nfp-descriptions-container">
        <div class="about-nfp-descriptions-title" :style="`background: ${getColorForExplanation(item.title)}`">
          {{ item.title }}
        </div>
        <div class="about-nfp-descriptions-content">
          {{ item.content }}
        </div>
      </div>
    </transition-group>

    <!-- NFP Design Portfolio -->
    <p class="section-header-text">
      Portfolio
    </p>
    <div id="portfolio-description-container">
      <div id="portfolio-description">
        The design and functionality of a website is combined. Combing these
        two user experiences has proven to be effective. Allow your ideas come
        to fruition while also allowing the users to enjoy an elegant interaction.
        Ultimately connecting NFP organisations with the designs and functionality
        required to allow their work to be reached!
      </div>
    </div>
    <div class="center-mid">
      <div id="portfolio-wrapper-container">
        <div v-for="(item, index) in portfolio" :key="index" class="portfolio-item">
          <a target="_blank" :href="`${item.descriptionRedirect}`" style="margin-bottom: 15px;">
            <img
              :src="item.imageSrc"
              :alt="item.imageAlt"
              class="portfolio-image"
              :style="`border: solid 7px ${applyBorder(index)}`"
            >
          </a>
          <a
            target="_blank"
            :href="`${item.descriptionRedirect}`"
            class="portfolio-button">{{ item.description }}
          </a>
        </div>
      </div>
    </div>

    <!-- NFP Design getting start button -->
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
  data () {
    return {
      isLoaded: false
    }
  },
  computed: {
    // Map the different Vuex json details as an object.
    ...mapState('about', ['heroContent', 'servicesAndExplanations', 'portfolio'])
  },
  mounted () {
    this.isLoaded = true
  },
  methods: {
    beforeEnter (el: HTMLDivElement): void {
      el.style.opacity = '0'
    },
    enter (el: HTMLDivElement): void {
      el.style.transition = 'opacity 1000ms ease-in-out'

      getComputedStyle(el)

      setTimeout(() => {
        el.style.opacity = '1'
      }, 1000)
    },
    // These methods are for setting the colour for the UI
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

  /*
  Note, these are the only NON-SCOPED styles
  Hence, remove all default styling and take up 100% of the screen
  with the footer located at the bottom
  */
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

  /* Set the appearance of the reusable header text (in a p tag) */
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

  /* Set the hero container to be in a row-column system */
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

  /* Set the appearance for the NFP eexplanations about how it works */
  #about-nfp-descriptions
  {
    align-self: center;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 75%;
  }

  /* Set the container to be based on percentages for responsiveness */
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

  /* The NFP description content depicts the 'height' of the container. */
  .about-nfp-descriptions-content
  {
    background: white;
    height: 525px;
    margin-bottom: 85px;
    white-space: pre-line;
    padding: 0 15px;
  }

  /*
    Set the appearance of the portfolio text and portfolio items.
  */

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

  /*
  Draw each portfolio item in a grid fasion to control
  the presentation of each individual item
  */
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

  .portfolio-image:hover
  {
    width: 99%;
    height: 99%;
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

  .portfolio-button:hover
  {
    filter: brightness(110%);
  }

  /* Set the  container for the getting started component */
  .get-started-container
  {
    margin: 50px 0;
    width: 100vw;
    display: flex;
    justify-content: center;
  }

  /* Update the website for responsiveness */
  @media only screen and (max-width : 1400px)
  {
    #about-nfp-descriptions
    {
      width: 100%;
    }

    .about-nfp-descriptions-container
    {
      font-size: 1.25em;
    }
  }

  @media only screen and (max-width : 1000px)
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
      height: 505px;
    }
  }

  /* Update the website into a column layout opposed to rows */
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

    .portfolio-item
    {
      width: 85vw;
    }

    .footer-main
    {
      max-height: 175px;
      min-height: 175px;
    }
  }

</style>
