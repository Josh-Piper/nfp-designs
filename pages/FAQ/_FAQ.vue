<template>
  <div class="app">
    <NavigationBar :current-link="'FAQ'" />

    <!-- Custom search bar -->
    <div id="faq-question-needs-answering">
      <div id="faq-question-needs-answer-text">
        Have a question that needs answering?
      </div>
      <div id="faq-question-needs-answer-search-bar">
        <SearchBar :search-placeholder="'Got a specific question?'" />
      </div>
    </div>

    <!-- FAQ sorter wheel -->
    <p class="section-header-text">Frequently Asked Questions (FAQ)</p>
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

    <div id="accordian">
      <div id="accordian-questions">
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

          <div v-show="isDisplayed(index)" class="accordian-answer">
            {{ item.answer }}
          </div>

          <hr/>
        </div>
      </div>

      <p v-show="isQuestionsAndAnswersEmpty">
        No results found
      </p>

      <div id="accordian-footer">
        <a @click="loadMore">
          Load More Questions
        </a>
      </div>
    </div>

    <div id="submit-faq-question">
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
      <div id="sub-faq-question-rhs">
        <a>
          SUBMIT
        </a>
      </div>
    </div>
    <Footer class="footer-main" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

interface QuestionAndAnswer {
  question: string,
  answer: string,
  type: string
}

export default Vue.extend({
  data () {
    return {
      indexesShown: [0],
      itemsToLoad: 5,
      orderedBy: 'All',
      customSorter: '',
      questionToSubmit: ''
    }
  },
  computed: {
    ...mapState('faq', ['faqData']),
    getQuestionAndAnswers (): QuestionAndAnswer[] {
      let result: QuestionAndAnswer[] = this.faqData

      if (this.orderedBy === 'Custom' && this.customSorter) {
        result = result.filter(qna =>
          qna.question.toLowerCase().includes(this.customSorter) ||
          qna.answer.toLowerCase().includes(this.customSorter.toLowerCase()))
      } else if (this.orderedBy !== 'All') {
        result = result.filter(qna => qna.type === this.orderedBy)
      }

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
    orderedBy (oldValue, newValue) {
      if (oldValue !== newValue) {
        this.indexesShown = []
      }
    }
  },
  mounted () {
    const sorter = this.$route.params.FAQ
    if (sorter) {
      this.orderedBy = 'Custom'
      this.customSorter = sorter
    }
    this.indexesShown = []
  },
  methods: {
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
    }
  }
})
</script>

<style>
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

  #faq-sorter-wheel
  {
    font-family: Arial, Helvetica, sans-serif;
    width: 60%;
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-self: center;
  }

  #faq-sorter-wheel>label>select
  {
    width: 150px;
    height: 30px;
    background: #C4C4C4;
    font-weight: 700;
  }

  #accordian
  {
    margin: 50px 0;
    background: #C4C4C4;
    align-self: center;
    font-size: 1.5em;
    width: 800px;
  }

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

  .accordian-qna-container
  {
    font-family: Arial, Helvetica, sans-serif;
    background: #C4C4C4;
    padding: 0 20px;
  }

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
  }

  .flip
  {
    transform: rotate(180deg);
  }

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

  #sub-faq-question-lhs-inputter>label>input[type=text]
  {
    background: #C4C4C4;
    height: 1.5em;
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

    #faq-sorter-wheel
    {
      font-size: 1.25em;
      flex-direction: column;
      text-align: center;
      width: 100vw;
    }

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
