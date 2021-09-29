<template>
  <div class="app">
    <NavigationBar :current-link="'FAQ'" />

    <!-- Search bar used to filter the current FAQ question -->
    <div id="faq-question-needs-answering">
      <div id="faq-question-needs-answer-text">
        Have a question that needs answering?
      </div>
      <div id="faq-question-needs-answer-search-bar">
        <SearchBar :search-placeholder.sync="searchPlaceholder" />
      </div>
    </div>

    <!-- FAQ sorter wheel -->
    <p class="section-header-text">
      Frequently Asked Questions (FAQ)
    </p>
    <div id="faq-sorter-wheel">
      <label id="faq-sorter-wheel-label">
        Currently ordering by:
        <select v-model="orderedBy">
          <option>All</option>
          <option>General Enquiries</option>
          <option>SIT120 Info</option>
          <option>Custom</option>
        </select>
      </label>
    </div>

    <!-- FAQ accordian -->
    <div id="accordian">

      <!-- FAQ question and answer container div -->
      <div id="accordian-questions">
        <!-- Draw the question with the drop down image -->
        <div
          v-for="(item, index) in getQuestionAndAnswers"
          :key="index"
          class="accordian-qna-container"
        >
          <div class="accordian-question" @click="clickedQuestion(index)">
            <span>{{ item.question.toUpperCase() }}</span>
            <img
              :class="isDisplayed(index) && 'flip'"
              src="../../assets/dropdown_icon.png"
              alt="dropdown"
            >
          </div>

          <!-- If the current index is clicked, then draw the answer -->
          <div v-show="isDisplayed(index)" class="accordian-answer">
            {{ item.answer }}
          </div>
          <hr>
        </div>
      </div>

      <!-- Error message to let the user know that there were no results -->
      <p v-show="isQuestionsAndAnswersEmpty">
        No results found for "{{ searchPlaceholder }}"
      </p>

      <!-- Accordian load more button -->
      <div id="accordian-footer">
        <a @click="loadMore">
          Load More Questions
        </a>
      </div>
    </div>

    <!-- Submit a new FAQ question via. the Vuex store -->
    <div id="submit-faq-question">
      <!-- The FAQ submission text and input -->
      <div id="sub-faq-question-lhs">
        <div id="sub-faq-question-lhs-text">
          <span id="sub-faq-question-lhs-text-title">
            Is your question not listed?
          </span>
          <span>Submit a question then!</span>
        </div>
        <div id="sub-faq-question-lhs-inputter">
          <label>
            Question:
            <input
              v-model="questionToSubmit"
              type="text"
              placeholder="Who is your favourite tutor?"
            >
          </label>
        </div>
      </div>

      <!-- Submit button -->
      <div id="sub-faq-question-rhs">
        <a @click="submitQuestion">
          SUBMIT
        </a>
      </div>
    </div>

    <Footer class="footer-main" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'
import { QuestionAndAnswer } from '~/Types/types'

export default Vue.extend({
  data () {
    return {
      indexesShown: [] as number[],
      itemsToLoad: 5 as number,
      orderedBy: 'All' as string,
      customSorter: '' as string,
      questionToSubmit: '' as string,
      searchPlaceholder: 'Got a specific question?' as string,
      hasSubmittedQuestion: false as boolean
    }
  },
  computed: {
    ...mapState('faq', ['faqData']),
    // Constantly get the newest data that the user wishes to use.
    getQuestionAndAnswers (): QuestionAndAnswer[] {
      let result: QuestionAndAnswer[] = this.faqData

      if (this.orderedBy === 'Custom' && this.customSorter) {
        result = result.filter(qna =>
          qna.question.toLowerCase().includes(this.customSorter) ||
          qna.answer.toLowerCase().includes(this.customSorter.toLowerCase()))
      } else if (this.orderedBy !== 'All') {
        result = result.filter(qna => qna.type === this.orderedBy)
      }

      // Only return the amount of items wanted, i.e. load more questions button
      if (result.length >= this.itemsToLoad) {
        return result.slice(0, this.itemsToLoad)
      } else {
        return result
      }
    },
    isQuestionsAndAnswersEmpty (): boolean {
      return !(this.getQuestionAndAnswers.length >= 1)
    }
  },
  watch: {
    // Check for changes if the FAQ ordering is changed. Reset indexes
    // to prevent an issues
    orderedBy (oldValue: string, newValue: string): void {
      if (oldValue !== newValue) {
        this.indexesShown = []
        this.itemsToLoad = 5
      }
    }
  },
  // The searching method is currently hooked into the route
  // should be changed into search queries ?=
  mounted () {
    const sorter: string | undefined = this.$route.params.FAQ
    if (sorter) {
      this.orderedBy = 'Custom'
      this.customSorter = sorter
    }
  },
  methods: {
    ...mapMutations('faq', ['addQuestion']),
    loadMore (): void {
      this.itemsToLoad += 5
    },
    clickedQuestion (index: number): void {
      let isAnswerShown: boolean = this.indexesShown.includes(index)

      if (isAnswerShown) {
        this.indexesShown = this.indexesShown.filter(i => i !== index)
      } else {
        this.indexesShown.push(index)
      }
      isAnswerShown = this.indexesShown.includes(index)
    },
    clearIndexesShown () {
      this.indexesShown = []
    },
    isDisplayed (index: number): boolean {
      return this.indexesShown.includes(index)
    },
    submitQuestion (): void {
      if (this.questionToSubmit === '') {
        return
      }

      const submission: QuestionAndAnswer = {
        question: this.questionToSubmit,
        answer: 'Waiting for response...',
        type: 'General Enquiries'
      }

      this.addQuestion(submission)
      this.hasSubmittedQuestion = true
      this.questionToSubmit = ''
    }
  }
})
</script>

<style>
  /* Searching component, relies on using the searching component */
  #faq-question-needs-answering
  {
    background: #195748;
    margin-top: 50px;
    color: white;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-self: center;
    align-items: center;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1.5em;
    width: 600px;
    padding: 50px 50px;
  }

  #faq-question-needs-answer-search-bar
  {
    display: flex;
    justify-content: center;
    background: #195748;
    width: 100%;
    height: 50px;
  }

  #faq-question-needs-answer-text
  {
    background: #195748;
    margin-bottom: 25px;
  }

  /* FAQ sorting styling */
  #faq-sorter-wheel
  {
    font-family: Arial, Helvetica, sans-serif;
    width: 60%;
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-self: center;
  }

  /*
    Make the select wheel bigger, needs to be refactored for a custom drop down
    arrow
  */
  #faq-sorter-wheel>label>select
  {
    width: 150px;
    height: 30px;
    background: #C4C4C4;
    font-weight: 700;
  }

  /* Styling for the FAQ accordian, i.e. actual questions */
  #accordian
  {
    padding-top: 30px;
    margin: 50px 0;
    background: #C4C4C4;
    align-self: center;
    font-size: 1.5em;
    width: 800px;
  }

  /* Error message styling for when no FAQ's are applicable */
  #accordian>p
  {
    font-family: Arial, Helvetica, sans-serif;
    text-decoration: underline;
    color: #ff2f2f;
    background: #C4C4C4;
    align-self: center;
    justify-self: center;
    text-align: center;
    font-weight: 900;
    margin-top: 5px;
  }

  /* The Question and Answer's are linked together */
  .accordian-qna-container
  {
    font-family: Arial, Helvetica, sans-serif;
    background: #C4C4C4;
    padding: 0 20px;
  }

  /*
    The accordian question contains the question and
    dropdown image. Thus, required styling and flexbox for layout
  */
  .accordian-question
  {
    display: flex;
    justify-self: center;
    align-items: center;
    justify-content: space-between;
    background: #C4C4C4;
    cursor: pointer;
    padding: 15px 0;
  }

  .accordian-question>span
  {
    background: #C4C4C4;
  }

  .accordian-question>img
  {
    background: #C4C4C4;
    width: 30px;
    height: 20px;
  }

  /* Set the accordian answer text to be smaller than the question */
  .accordian-answer
  {
    background: #C4C4C4;
    margin-bottom: 15px;
    font-size: 0.85em;
  }

  hr
  {
    padding: 0.5px 0;
  }

  /* Accordian footer styling to load more questions */
  #accordian-footer
  {
    align-self: center;
    background: #C4C4C4;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  #accordian-footer>a
  {
    margin-top: 300px;
    margin-bottom: 20px;
    font-family: Arial, Helvetica, sans-serif;
    padding: 10px;
    background: #282754;
    color: white;
    cursor: pointer;
  }

  /* Rotate the drop down arrow when showing answer */
  .flip
  {
    transform: rotate(180deg);
  }

  /* Submit FAQ question styling */
  #submit-faq-question
  {
    font-family: Arial, Helvetica, sans-serif;
    width: 800px;
    background: #282754;
    align-self: center;
    padding: 10px;
    color: white;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 75px 0;
  }

  /*
    LHS is all text and input besides the submit button for the
    submit FAQ question section
  */
  #sub-faq-question-lhs
  {
    background: #282754;
    display: flex;
    flex-direction: column;
    width: 50%;
  }

  #sub-faq-question-lhs-text
  {
    background: #282754;
    display: flex;
    flex-direction: column;
  }

  #sub-faq-question-lhs-text-title
  {
    font-weight: 600;
    text-decoration: underline;
  }

  /* Text is located inside the span, set background */
  #sub-faq-question-lhs-text>span
  {
    background: #282754;
    font-size: 1.25em;
  }

  #sub-faq-question-lhs-inputter
  {
    margin-top: 30px;
    background: #282754;
  }

  #sub-faq-question-lhs-inputter>label
  {
    background: #282754;
    display: flex;
    flex-direction: column;
  }

  /* Question input box styling, making it larger for responsiveness */
  #sub-faq-question-lhs-inputter>label>input[type=text]
  {
    background: #C4C4C4;
    height: 2em;
    color: black;
    width: 100%;
  }

  #sub-faq-question-rhs
  {
    width: 50%;
    height: 100%;
    background: #282754;
    display: flex;
    justify-content: right;
    margin-right: 50px;
  }

  /* Submit question button styling */
  #sub-faq-question-rhs>a
  {
    font-size: 1.5em;
    border-radius: 150px;
    padding: 20px 30px;
    background: #00838F;
    color: white;
    cursor: pointer;
  }

  #sub-faq-question-rhs>a:hover
  {
    filter: brightness(110%);
  }

  /*
    Set the width's to be dependent on screen screen.
    This is done as 4k screens and higher should have more
    spacing instead of being larger
  */
  @media only screen and (max-width : 1200px)
  {
    #faq-question-needs-answering
    {
      width: 60vw;
    }

    #accordian
    {
      width: 85vw;
    }

    #submit-faq-question
    {
      width: 80vw;
    }
  }

  /* Phone responsive layout */
  @media only screen and (max-width : 600px)
  {
    #faq-question-needs-answering
    {
      width: 85vw;
      padding: 15px 5px;
    }

    #faq-question-needs-answer-search-bar
    {
      width: 85vw;
    }

    /* Make the FAQ sorter wheel larger for a phone */
    #faq-sorter-wheel
    {
      font-size: 1.25em;
      flex-direction: column;
      text-align: center;
      width: 100vw;
    }

    #accordian-footer>a
    {

      font-size: 0.75em;
    }

    /* Size for the select accordian sorting feature */
    #faq-sorter-wheel>label>select
    {
      margin-top: 20px;
      width: 80vw;
      height: 50px;
      font-size: 1.25em;
    }

    #submit-faq-question
    {
      flex-direction: column;
      text-align: center;
    }

    #sub-faq-question-lhs-text-title
    {
      margin-bottom: 5px;
    }

    /* Change the size of text for the upload question */
    #sub-faq-question-lhs
    {
      width: 80%;
    }

     #sub-faq-question-lhs-inputter>label
     {
       font-size: 1.5em;
     }

    #sub-faq-question-lhs-inputter>label>input[type=text]
    {
      font-size: 1em;
      height: 2em;
    }

    /* Center the button in a container format */
    #sub-faq-question-rhs
    {
      justify-self: center;
      width: 100%;
      justify-content: center;
      margin-top: 20px;
      margin-right: 0;
    }
  }

</style>
