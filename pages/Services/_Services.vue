<template>
  <div class="app">
    <NavigationBar :current-link="'Services'" />

    <div v-if="this.specificService" class="popup-box">

      <div class="popup-box-title">
        <img
          src="~@/assets/cross_icon_logo.png"
          alt="cross"
          @click="gotoServices"
        >
        {{ specificService.serviceName }}
      </div>
      <div class="popup-box-description">
        {{ specificService.description }}
      </div>
    </div>

    <!-- -->
    <div :id="specificService && 'blackout'" class="main-content">
      <p
        class="section-header-text"
        :class="specificService && 'blackout'"
      >
        Services That We Offer!
      </p>

      <!-- Draw the coloured squares to differentiate between services -->
      <!-- Standard Services -->
      <div
        id="services-example-box"
        :class="specificService && 'blackout'"
      >
        <div
          id="services-example-box-standard"
          :class="specificService && 'blackout'"
        >
          <span
            class="square-box"
            :style="!specificService && 'background: white;'"
            :class="specificService && 'blackout'"
          >
            &nbsp;
          </span>
          <span
            class="service-text-assist"
            :class="specificService && 'blackout'"
          >
            Standard
          </span>
        </div>

        <!-- Premium Services -->
        <div
          :id="specificService && 'blackout'"
          class="services-example-box-premium"
        >
          <span
            class="square-box"
            :style="!specificService && 'background: #509483;'"
            :class="specificService && 'blackout'"
          >
            &nbsp;
          </span>
          <span
            class="service-text-assist"
            :class="specificService && 'blackout'"
          >
            Premium
          </span>
        </div>
      </div>

      <!-- -->
      <div :id="specificService && 'blackout'" class="standard-service-container">
        <div
          v-for="(item, index) in standardServices"
          :id="specificService && 'blackout'"
          :key="index"
          class="service-box-grid-appearance"
          @click="openDetails(item.serviceName)"
        >
          <img
            :id="specificService && 'blackout'"
            :src="getImageSource(item.imageSrc)"
            :alt="item.description"
          >
          <span :id="specificService && 'blackout'">
            {{ item.serviceName }}
          </span>
        </div>
      </div>

      <!-- -->
      <div :id="specificService && 'blackout'" class="premium-service-container">
        <div
          v-for="(item, index) in preiumiumServices"
          :id="specificService && 'blackout'"
          :key="index"
          class="service-box-grid-appearance"
          :style="!specificService && 'background: #509483;'"
          @click="openDetails(item.serviceName)"
        >
          <img
            :id="specificService && 'blackout'"
            :src="getImageSource(item.imageSrc)"
            :alt="item.description"
            :style="!specificService && 'background: #509483;'"
          >
          <span
            :id="specificService && 'blackout'"
            :style="!specificService && 'background: #509483; font-weight: bold; color: white;'"
          >
            {{ item.serviceName }}
          </span>
        </div>
      </div>
    </div>

    <GetStarted class="getting-started" />

    <Footer class="footer-main" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

interface Service {
  serviceName: string,
  imageSrc: string,
  description: string
}

export default Vue.extend({
  data () {
    return {
      specificService: undefined as Service | undefined
    }
  },
  computed: {
    ...mapState('services', ['standardServices', 'preiumiumServices'])
  },
  mounted () {
    const findService: string = this.$route.params.Services
    if (!findService) {
      return
    }

    const allServices: Service[] = [...this.standardServices, ...this.preiumiumServices]
    const parsedService: Service | undefined = allServices.find(s => s.serviceName === findService)
    this.specificService = parsedService
  },
  methods: {
    // Relative paths are binded at compile time.
    // This is a workaround to the v-bind image source
    getImageSource (src: string): string {
      return require(`../../assets/${src}`)
    },
    openDetails (serviceName: string): void {
      this.$router.push({ path: `/services/${serviceName}` })
    },
    gotoServices (): void {
      this.$router.go(-1)
    }
  }
})
</script>

<style scoped>

  .popup-box
  {
    background: #282754;
    font-family: Arial, Helvetica, sans-serif;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 50vw;
    height: 300px;
    position: absolute;
    display: flex;
    flex-direction: column;
    padding: 20px 30px;
    font-size: 2em;
  }

  .popup-box-title
  {
    padding: 0;
    margin: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    font-weight: 900;
    text-align: center;
    background: #195748;
    color: white;
  }

  .popup-box-title>img
  {
    top: -35px;
    right: -40px;
    align-self: flex-end;
    background: none;
    color: red;
    position: absolute;
    width: 30px;
    height: 30px;
    cursor: pointer;
  }

  .popup-box-description
  {
    margin-top: 15px;
    font-size: 0.75em;
    color: white;
    background: #282754;
    position: relative;
  }

  #blackout, .blackout
  {
    background-image: url('~@/assets/services-background.png');
    background-repeat: repeat;
  }

  .main-content
  {
    font-family: Arial, Helvetica, sans-serif;
    display: flex;
    flex-direction: column;
  }

  #services-example-box
  {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 60px;
  }

  #services-example-box-standard,
  .services-example-box-premium
  {
    display: flex;
    flex-direction: row;
    justify-content: center;
    line-height: 72px;
    font-size: 1.5em;
    margin: 0 20px;
  }

  .square-box
  {
    width: 50px;
    height: 50px;
    padding: 10px;
    border: solid 1px black;
  }

  .service-text-assist
  {
    margin-left: 15px;
    font-weight: 600;
  }

  .standard-service-container, .premium-service-container
  {
    margin-top: 50px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-row-gap: 50px;
    justify-content: center;
    width: 80vw;
    align-self: center;
  }

  .premium-service-container
  {
    grid-template-rows: 1fr;
    grid-template-columns: repeat(3, 1fr);
  }

  .service-box-grid-appearance
  {
    cursor: pointer;
    justify-self: center;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 300px;
    width: 250px;
    font-size: 1.5em;
    padding: 20px 55px;
    background: white;
  }

  .service-box-grid-appearance:hover
  {
    filter: brightness(85%);
  }

  .service-box-grid-appearance>img
  {
    object-fit: cover;
    height: 200px;
    background: white;
    display: flex;
  }

  .service-box-grid-appearance>span
  {
    background: white;
    height: auto;
  }

  .getting-started
  {
    margin-top: 50px;
    align-self: center;
  }

  /* Small desktops and tablets */
  @media only screen and (max-width : 1400px)
  {
    .service-box-grid-appearance
    {
      margin: 0 20px;
      width: 15vw;
      height: 250px;
    }

    .service-box-grid-appearance>img
    {
      object-fit: fill;
      height: 150px;
    }
  }

  /* iPads */
  @media only screen and (max-width: 800px)
  {

    #blackout, .blackout
    {
      background: none;
      display: none;
    }

    #services-example-box
    {
      flex-direction: column;
    }

    .services-example-box-premium
    {
      margin-top: 30px;
    }

    .standard-service-container
    {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(6, 1fr);
    }

    .premium-service-container
    {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(3, 1fr);
    }

    .service-box-grid-appearance
    {
      margin: 0 20px;
      width: 50vw;
      height: 250px;
    }
  }

</style>
