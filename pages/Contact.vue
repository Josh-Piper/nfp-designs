<template>
  <div class="app">
    <NavigationBar :current-link="'Contact'" />

    <!-- Basic contact us information with Google Maps API -->
    <p class="section-header-text">
      Contact Us
    </p>
    <div id="contact-us-details-container">
      <div id="google-maps-api-container">
        <iframe
          id="google-maps-api"
          title="NFP Designs location Google Maps"
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

    <!-- Contact form buttons, allows showing the actual form -->
    <p class="section-header-text">
      Select Your Reason for Contact Us
    </p>
    <div id="reason-for-contacting">
      <!-- Create each button -->
      <div id="reason-for-contacting-buttons">
        <a
          v-for="(item, index) in contactButtons"
          :key="index"
          :style="`background: ${item.colorCode};`"
          @click="updateEnquiryText(item.enquiryText)"
        >
          {{ item.enquiryText }}
        </a>
      </div>
    </div>

    <!-- The actual contact form(s) -->
    <p v-show="enquirySelect !== ''" class="section-header-text">
      {{ enquirySelect }}
    </p>

    <div v-show="enquirySelect !== ''">
      <div id="contact-form">
        <form
          :style="`background: ${getCorrespondingFormColor()};`"
          @submit.prevent="submitContact"
        >
          <!-- Global form data related to all forms, i.e. email, comments etc -->
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
              :placeholder="formData.placeholder"
              :style="`background: ${getCorrespondingFormColor()};`"
            >
          </div>

          <!-- Custom form data, for the additiona forms, i.e. not GENERAL -->
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
              if the extra form content is <select> and is requiring the use
              of services from the computed component
            -->
            <div
              v-if="formData.type === 'select' && formData.options === 'services'"
              :style="`background: ${getCorrespondingFormColor()};`"
            >
              <select
                v-model.lazy="form[formData.name]"
                :type="formData.type"
                :name="formData.name"
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
                v-model.lazy="form[formData.name]"
                :type="formData.type"
                :name="formData.name"
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
                    :id="skill.name"
                    v-model="form[`${skill.name}`]"
                    type="checkbox"
                    :name="skill.name"
                    :value="skill.value"
                    style="vertical-align: middle; height: 20px;"
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
              placeholder="Enter information regarding your query"
              :style="`background: ${getCorrespondingFormColor()};`"
              :maxlength="maxCharacters"
            />
            <span
              :style="`background: ${getCorrespondingFormColor()};`"
              style="align-self: flex-end; font-size: 0.75em;"
            >
              {{ maxCharacters - form['form-comments'].length }}
              /
              {{ maxCharacters }}
              characters
            </span>
          </div>

          <!-- Form error message (valdiation) -->
          <p
            v-show="formError"
            style="color: #ffcfcf;"
            :style="`background: ${getCorrespondingFormColor()};`"
          >
            Ensure astrix details are filled out
          </p>

          <!-- Let the user know the form is submitted! -->
          <p
            v-show="formSubmitted"
            style="color: green;"
            :style="`background: ${getCorrespondingFormColor()};`"
          >
            Form submitted!
          </p>

          <!-- Submit the form -->
          <span
            class="submit-button"
            :style="`background: ${getCorrespondingFormColor()};`"
          >
            <button
              :style="`background: ${getCorrespondingFormColor()};`"
              @click="submitContact"
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
import { WebDevSkill, CompletedForm, ContactButton, BasicFormData } from '~/Types/types'

export default Vue.extend({
  data () {
    return {
      enquirySelect: '' as string,
      contactButtons: [
        { colorCode: '#195748', enquiryText: 'General Enquiry' },
        { colorCode: '#4C4AA5', enquiryText: 'Service Enquiry' },
        { colorCode: '#028FBC', enquiryText: 'Volunteering & Contributing' }
      ] as ContactButton[],
      // relevant to all forms
      basicFormData: [
        { text: 'Your name', name: 'form-name', placeholder: 'John Doe' },
        { text: 'Company name', name: 'form-company-name', placeholder: 'Google' },
        { text: 'Email address', name: 'form-email-address', placeholder: 'djohn@google.com' },
        { text: 'Phone nunber', name: 'form-phone-number', placeholder: '04-john' }
      ] as BasicFormData[],
      // additional form data
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
      // Checkboxes if the user is a 'developer'
      webDevSkills: [
        { name: 'form-bootstrap', value: 'bootstrap', text: 'BootStrap' },
        { name: 'form-tailwind', value: 'tailwind', text: 'TailWind' },
        { name: 'form-scscc', value: 'cscc', text: 'SASS' },
        { name: 'form-js', value: 'javascript', text: 'JavaScript' },
        { name: 'form-node', value: 'node', text: 'NodeJS' },
        { name: 'form-vue', value: 'vue', text: 'VueJS' },
        { name: 'form-serverless', value: 'serverless', text: 'ServerLess' }
      ] as WebDevSkill[],
      // maintain ALL of the different form information
      form: {
        'form-name': '',
        'form-company-name': '',
        'form-email-address': '',
        'form-phone-nunber': '',
        'form-comments': '',
        'form-job-role': '',
        'form-service-type': '',
        'form-web-skills': []
      } as CompletedForm,
      formError: false as boolean,
      showWebDevSkill: false as boolean,
      formSubmitted: false as boolean,
      maxCharacters: 300 as number
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
        this.formSubmitted = true
        this.form = {
          'form-name': '',
          'form-company-name': '',
          'form-email-address': '',
          'form-phone-nunber': '',
          'form-comments': '',
          'form-job-role': '',
          'form-service-type': '',
          'form-web-skills': []
        }
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

  /* Set the appearance of the first contact us container, i.e. for Google Maps and location text */
  #contact-us-details-container
  {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    font-family: Arial, Helvetica, sans-serif;
  }

  /* Set the Google Maps container to have a gradient border */
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

  /* Set the contacat us text to be centered and easily visible */
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

  /* The text layout for the location text of Google Maps */
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

  /* Formatting for the form buttons */
  #reason-for-contacting-buttons
  {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 60%;
    margin-bottom: 50px;
  }

  /* Styling of the actual buttons, per enquiry */
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

   #reason-for-contacting-buttons>a:hover
   {
     filter: brightness(125%);
   }

  /* The forms submit button appearance */
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

  /*
    Layout for the form layout
    Each label takes 100% of the width so the input is on the next line.
    Hence, specific formatting is set here
  */
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
    font-size: 1.5em;
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

  /* Make all input have a darker colour then the set colour of the form */
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

  /* Make the website responsive, specifically the reason for contacting us buttons */
  @media only screen and (max-width : 1600px)
  {
    #reason-for-contacting-buttons>a
    {
      width: 225px;
      height: 100px;
      font-size: 1.25em;
    }
  }

  /* Make the Google Maps API smaller */
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

  /* Make the Google Maps API smaller again */
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

  /* Mobile layout */
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
