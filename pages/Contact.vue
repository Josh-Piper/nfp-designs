<template>
  <div class="app">
    <NavigationBar :current-link="'Contact'" />

    <!-- Basic contact us information with Google Maps API -->
    <p class="section-header-text">Contact Us</p>
    <div id="contact-us-details-container">
      <div id="google-maps-api-container">
        <iframe
          title="NFP Designs location Google Maps"
          id="google-maps-api"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d482.0357086812697!2d145.12065234263872!3d-37.85040594483717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad641c87a7ea72f%3A0x4e5b540a78138a85!2sDeakin%20Launchpad!5e0!3m2!1sen!2sau!4v1632620103737!5m2!1sen!2sau"
          allowfullscreen=""
          loading="lazy"
        />
      </div>
      <div id="contact-us-details-text-container">
        <div>
          <span id="contact-us-details-text-container-title">Interested in meeting with us?</span>
          <span>Give us a ring on +61 8921 0210</span>
          <span>304 Building 1, Burwood Victoria 3125</span>
          <span>Deakin Launchpad building</span>
        </div>
      </div>
    </div>
      <p class="section-header-text">Contact Us</p>
    <p class="section-header-text">Select Your Reason for Contact Us</p>
    <div id="reason-for-contacting">
      <div id="reason-for-contacting-buttons">
        <a
          v-for="(item, index) in contactButtons"
          :key="index"
          @click="updateEnquiryText"
        >
          {{ item.enquiryText }}
        </a>
      </div>
    </div>

    <div v-show="enquirySelect !== ''">
      <p class="section-header-text">{{ enquirySelect }}</p>
      <form @submit.prevent="submitContact">
        hi
      </form>
    </div>
    <Footer class="footer-main" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// import { mapState } from 'vuex'

export default Vue.extend({
  data () {
    return {
      enquirySelect: '',
      contactButtons: [
        { colorCode: '#195748', enquiryText: 'General Enquiry' },
        { colorCode: '#4C4AA5', enquiryText: 'Service Enquiry' },
        { colorCode: '028FBC', enquiryText: 'Volunteering & Contributing' }
      ]
    }
  },
  methods: {
    submitContact () {
      // Vuelidate
      // Do nothing - Send details via. email correspondance to an API
      // further validation at the back-end API level
    },
    updateEnquiryText (event) {
      console.log(event)
    }
  }
})
</script>

<style scoped>

  #contact-us-details-container
  {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    font-family: Arial, Helvetica, sans-serif;
  }

  #google-maps-api-container
  {
    display: flex;
    justify-content: center;
    width: 1000px;
    height: 450px;
    padding: 10px;
    z-index: 1;
    background-image: linear-gradient(#195748, #4C4AA5, #028FBC);
  }

  #google-maps-api
  {
    width: 1000px;
    height: 450px;
    border: none;
  }

  #contact-us-details-text-container
  {
    background: #707070;
    width: 1020px;
    font-size: 1.25em;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    color: rgb(219, 219, 219);
    padding-bottom: 10px;
    margin-bottom: 40px;
  }

  #contact-us-details-text-container > div
  {
    display: flex;
    flex-direction: column;
    font-size: 1.5em;
  }

  #contact-us-details-text-container-title
  {
    background: #707070;
    font-weight: 800;
  }

  #contact-us-details-text-container span
  {
    color: white;
    background: #707070;
  }

  #reason-for-contacting
  {
    display: flex;
  }

  #reason-for-contacting-buttons
  {

  }

  #reason-for-contacting-buttons>a
  {
    text-decoration: none;
    cursor: pointer;
  }

  @media only screen and (max-width : 1200px)
  {
    #google-maps-api-container, #google-maps-api
    {
      width: 700px;
    }

    #contact-us-details-text-container
    {
      width: 720px;
    }

    #contact-us-details-text-container > div
    {
      font-size: 1em;
    }
  }

  @media only screen and (max-width : 800px)
  {
    #google-maps-api-container, #google-maps-api
    {
      width: 450px;
      height: 300px;
    }

    #contact-us-details-text-container
    {
      width: 470px;
    }
  }

  @media only screen and (max-width : 600px)
  {
    #google-maps-api-container
    {
      width: 300px;
    }

    #google-maps-api
    {
      width: 100%;
    }

    #contact-us-details-text-container
    {
      width: 320px;
    }
  }

</style>
