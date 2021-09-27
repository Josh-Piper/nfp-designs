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
    <div>
      <label>
        Currently ordering by:
        <select v-model="orderedBy">
          <option>Custom</option>
          <option>General Enquiries</option>
          <option>SIT120 Info</option>
        </select>
      </label>
    </div>

    <p>
      route: {{ $route.params.FAQ }}
    </p>
    <Footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

// import { mapState } from 'vuex'

export default Vue.extend({
  data () {
    return {
      orderedBy: 'General Enquiries',
      customSorter: ''
    }
  },
  mounted () {
    const sorter = this.$route.params.FAQ
    if (sorter) {
      this.orderedBy = 'Custom'
      this.customSorter = sorter
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

  @media only screen and (max-width : 1200px)
  {
    #faq-question-needs-answering
    {
      width: 80vw;
    }
  }

  @media only screen and (max-width : 600px)
  {
    #faq-question-needs-answering
    {
      width: 50vw;
    }
  }

</style>
