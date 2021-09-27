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
          src="https://tinyurl.com/DeakinSparkMelbLocation"
          allowfullscreen=""
          loading="lazy"
        />
      </div>
      <div id="contact-us-details-text-container">
        <div>

          <span id="contact-us-details-text-container-title">
            Interested in meeting with us?
          </span>

          <span>Give us a ring on +61 8921 0210</span>
          <span>304 Building 1, Burwood Victoria 3125</span>
          <span>Deakin Launchpad building</span>
        </div>
      </div>
    </div>

    <!-- Contact form buttons -->
    <p class="section-header-text">Select Your Reason for Contact Us</p>
    <div id="reason-for-contacting">
      <div id="reason-for-contacting-buttons">
        <a
          v-for="(item, index) in contactButtons"
          :key="index"
          @click="updateEnquiryText(item.enquiryText)"
          :style="`background: ${item.colorCode};`"
        >
          {{ item.enquiryText }}
        </a>
      </div>
    </div>

    <!-- Show the form when the user clicks above buttons ^^^ -->
    <p v-show="enquirySelect !== ''" class="section-header-text">
      {{ enquirySelect }}
    </p>

    <div v-show="enquirySelect !== ''">
      <div id="contact-form">
        <form
          @submit.prevent="submitContact"
          :style="`background: ${getCorrespondingFormColor()};`"
        >
          <!-- Global form data related to all forms -->
          <div
            v-for="(formData, index) in basicFormData"
            :key="index + formData.name"
            :style="`background: ${getCorrespondingFormColor()};`"
          >
            <label
              :for="formData.name"
              :style="`background: ${getCorrespondingFormColor()};`"
            >

              <!-- Draw the form label and add an astrix if it is required -->
              {{ formData.text }}
              {{
                (formData.text === 'Your name' || formData.text === 'Email address')
                  ? '*' : ''
              }}
            </label>

            <input
              v-model.lazy="form[formData.name]"
              :type="(formData.name ==='form-phone-number') ? 'number' : 'text'"
              :name="formData.name"
              :style="`background: ${getCorrespondingFormColor()};`"
            >
          </div>

          <!-- Custom form data -->
          <div
            v-for="(formData, index) in additionalFormData[enquirySelect]"
            :key="index"
            :style="`background: ${getCorrespondingFormColor()};`"
          >

            <label
              :for="formData.name"
              :style="`background: ${getCorrespondingFormColor()};`"
            >
              {{ formData.text }}
            </label>

            <!--
              if the extra form is <select> and is requiring the use
              of services from the computed component
            -->
            <div
              v-if="formData.type === 'select' && formData.options === 'services'"
              :style="`background: ${getCorrespondingFormColor()};`"
            >
              <select
                :type="formData.type"
                :name="formData.name"
                v-model.lazy="form[formData.name]"
                :style="`background: ${getCorrespondingFormColor()};`"
              >

              <!-- Draw all the basic services for the service enquiry -->
                <option
                  v-for="(service, idx) in standardServices"
                  :key="idx"
                  :style="`background: ${getCorrespondingFormColor()};`"
                  :value="service.serviceName"
                >
                  {{ service.serviceName }}
                </option>

                <!-- Draw all the premium services for the service enquiry -->
                <option
                  v-for="(service, idx) in preiumiumServices"
                  :key="idx + 1000"
                  :style="`background: ${getCorrespondingFormColor()};`"
                  :value="service.serviceName"
                >
                  {{ service.serviceName }}
                </option>
              </select>
            </div>

            <!-- else if the extra form is a custom <select> -->
            <div
              v-else-if="formData.type === 'select'"
              :style="`background: ${getCorrespondingFormColor()};`"
            >
              <select
                :type="formData.type"
                :name="formData.name"
                v-model.lazy="form[formData.name]"
                :style="`background: ${getCorrespondingFormColor()};`"
              >
                <option
                  v-for="(option) in formData.options"
                  :key="option"
                  :style="`background: ${getCorrespondingFormColor()};`"
                  :value="option"
                >
                  {{ option }}
                </option>
              </select>
            </div>

            <!-- Otherwise the new form content is text input -->
            <div v-else :style="`background: ${getCorrespondingFormColor()};`">
              <input
                :type="formData.type"
                :name="formData.name"
                :style="`background: ${getCorrespondingFormColor()};`"
              >
            </div>

            <!--
            If using volunteering form and states they are a developer
            Then display checkboxes for them to select what they know.
            I.e. they know VueJS and Angular but not React
            -->
            <div
              v-if="showWebDevSkill"
              :style="`background: ${getCorrespondingFormColor()};`"
            >
                <div
                v-for="(skill, index) in webDevSkills"
                :key="index"
                :style="`background: ${getCorrespondingFormColor()};`"
                style="flex-direction: row;"
              >
                <label
                  :for="skill.name"
                  :style="`background: ${getCorrespondingFormColor()};`"
                  style="height: 100%; display: flex; justify-content: space-between"
                >
                  Proficiency in {{ skill.text }}
                  <input
                    v-model="form[`${skill.name}`]"
                    type="checkbox"
                    :name="skill.name"
                    :value="skill.value"
                    style="vertical-align: middle;"
                  >
                </label>
              </div>
            </div>

          </div>

          <!-- Comments regarding the contact -->
          <div :style="`background: ${getCorrespondingFormColor()};`">
            <label
              for="comments"
              :style="`background: ${getCorrespondingFormColor()};`"
            >
              Comments *
            </label>

            <textarea
              v-model="form['form-comments']"
              name="comments"
              :style="`background: ${getCorrespondingFormColor()};`"
            />
          </div>

          <!-- Form error message (valdiation) -->
          <p
            v-show="formError"
            style="color: #ffcfcf;"
            :style="`background: ${getCorrespondingFormColor()};`"
          >
            Ensure astrix details are filled out
          </p>

          <!-- Submit the form -->
          <span
            class="submit-button"
            :style="`background: ${getCorrespondingFormColor()};`"
          >
            <button
              @click="submitContact"
              :style="`background: ${getCorrespondingFormColor()};`"
            >
              Submit
            </button>
          </span>
        </form>
      </div>
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
      enquirySelect: 'General Enquiry',
      contactButtons: [
        { colorCode: '#195748', enquiryText: 'General Enquiry' },
        { colorCode: '#4C4AA5', enquiryText: 'Service Enquiry' },
        { colorCode: '#028FBC', enquiryText: 'Volunteering & Contributing' }
      ],
      basicFormData: [
        { text: 'Your name', name: 'form-name' },
        { text: 'Company name', name: 'form-company-name' },
        { text: 'Email address', name: 'form-email-address' },
        { text: 'Phone nunber', name: 'form-phone-number' }
      ],
      additionalFormData: {
        'General Enquiry': [],
        'Service Enquiry': [
          { type: 'select', text: 'Related service', name: 'form-service-type', select: 'services', options: 'services' }
        ],
        'Volunteering & Contributing': [
          {
            type: 'select',
            text: 'Your job role',
            name: 'form-job-role',
            select: 'services',
            options: ['Junior Software Developer', 'Software Developer', 'Senior Software Developer', 'Software Architect', 'Marketer']
          }
        ]
      },
      webDevSkills: [
        { name: 'form-bootstrap', value: 'bootstrap', text: 'BootStrap' },
        { name: 'form-tailwind', value: 'tailwind', text: 'TailWind' },
        { name: 'form-scscc', value: 'cscc', text: 'SASS' },
        { name: 'form-js', value: 'javascript', text: 'JavaScript' },
        { name: 'form-node', value: 'node', text: 'NodeJS' },
        { name: 'form-vue', value: 'vue', text: 'VueJS' },
        { name: 'form-serverless', value: 'serverless', text: 'ServerLess' },
      ],
      form: {
        'form-name': '',
        'form-company-name': '',
        'form-email-address': '',
        'form-phone-nunber': '',
        'form-comments': '',
        'form-job-role': '',
        'form-service-type': '',
        'form-web-skills': []
      },
      formError: false,
      showWebDevSkill: false
    }
  },
  computed: {
    ...mapState('services', ['standardServices', 'preiumiumServices']),
    currentJobRoleIsDeveloper (): boolean {
      return this.form['form-job-role'].toLowerCase().includes('developer')
    }
  },
  watch: {
    currentJobRoleIsDeveloper (newVal) {
      if (newVal) {
        this.showWebDevSkill = true
      } else {
        this.showWebDevSkill = false
      }
    },
    enquirySelect (newValue) {
      if (newValue === 'General Enquiry' || newValue === 'Service Enquiry') {
        this.showWebDevSkill = false
      } else if (
        newValue === 'Volunteering & Contributing' &&
          this.form['form-job-role'].toLowerCase().includes('developer')
      ) {
        this.showWebDevSkill = true
      }
    }
  },
  methods: {
    submitContact () {
      const isValid = !(
        this.form['form-name'] === '' ||
        this.form['form-email-address'] === '' ||
        this.form['form-comments'] === '')

      if (!isValid) {
        this.formError = true
      } else {
        this.formError = false
      }

      // We can use the current selected enquiry type and the form completed
      // data to further validate and send the required data to the backend.
      // Obviously, we have the issue here of holding ALL data
      // despite which enquiry we selected
      // further validation at the back-end API level
    },
    updateEnquiryText (newEnquiryText: string): void {
      this.enquirySelect = newEnquiryText
    },
    getCorrespondingFormColor (): string {
      const found = this.contactButtons.find(btn => btn.enquiryText === this.enquirySelect)
      return found?.colorCode || 'white'
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
    flex-direction: row;
    justify-content: center;
    width: 100%;
  }

  #reason-for-contacting-buttons
  {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 60%;
    margin-bottom: 50px;
  }

  #reason-for-contacting-buttons>a
  {
    font-family: Arial, Helvetica, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    width: 300px;
    height: 125px;
    font-size: 1.25em;
    border-radius: 150px;
    text-align: center;
    cursor: pointer;
    color: white;
  }

  .submit-button
  {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .submit-button>button
  {
    padding: 15px 25px;
    filter: brightness(125%);
    box-shadow: 0 0 5px;
    cursor: pointer;
    border: none;
    border-radius: 50px;
    color: white;
    font-size: 1.15em;
  }

  .submit-button>button:hover
  {
    filter: brightness(200%);
    color: white;
  }

  #contact-form
  {
    display: flex;
    justify-content: center;
    width: 100vw;
  }

  #contact-form>form
  {
    display: flex;
    flex-direction: column;
    width: 60%;
    padding: 30px;
    margin-bottom: 25px;
    color: white;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1em;
  }

  #contact-form>form>div, #contact-form>form>div>div
  {
    display: flex;
    flex-direction: column;
  }

  #contact-form>form>div>label, #contact-form>form>div>div>label
  {
    width: 100%;
    padding: 0;
    margin: 5px 0;
    font-weight: 600;
  }

  #contact-form>form>div>input, #contact-form>form>div>div>input,
  #contact-form>form>div>textarea, #contact-form>form>div>div>select
  {
    color: white;
    font-size: 1em;
    filter: brightness(80%);
    padding: 7.5px 5px;
    border: none;
    margin-bottom: 15px;
  }

  #contact-form>form>input:focus
  {
    outline: none;
  }

  #contact-form>form>div>textarea
  {
    resize: vertical;
    height: 200px;
  }

  @media only screen and (max-width : 1600px)
  {
    #reason-for-contacting-buttons>a
    {
      width: 225px;
      height: 100px;
      font-size: 1.25em;
    }
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

    #reason-for-contacting-buttons
    {
      width: 80%;
      justify-content: space-between;
    }

    #reason-for-contacting-buttons>a
    {
      width: 175px;
      height: 75px;
      font-size: 1em;
    }
  }

  @media only screen and (max-width : 800px)
  {
    #google-maps-api-container, #google-maps-api
    {
      width: 80vw;

    }

    #contact-us-details-text-container
    {
      width: 83vw;
    }

    #reason-for-contacting-buttons>a
    {
      width: 200px;
      height: 75px;
      font-size: 1em;
      margin: 0 10px;
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

    #reason-for-contacting-buttons
    {
      flex-direction: column;
      align-items: center;
    }

    #reason-for-contacting-buttons>a
    {
      margin-bottom: 30px;
      padding: 30px;
      width: 150px;
      height: 50px;
      font-size: 1em;
    }
  }

</style>
