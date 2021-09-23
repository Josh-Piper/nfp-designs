<template>
  <div class="search-bar">
    <!-- The user can hit enter or the search mark to search -->
    <form @submit.prevent="searchFAQ">
      <input
        type="text"
        v-model="$v.searchQuery.$model"
        :placeholder="placeholder"
      >

      <font-awesome-icon
        @click="searchFAQ"
        :icon="['fas', 'search']"
        class="search-bar-icon"
      />
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { required } from 'vuelidate/lib/validators'

export default Vue.extend({
  props: {
    searchPlaceholder: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      searchQuery: '',
      placeholder: ''
    }
  },
  mounted () {
    this.placeholder = this.searchPlaceholder
  },
  methods: {
    // When search button click, redirect to FAQ
    searchFAQ (): void {
      this.$v.$touch()

      if (this.$v.$invalid) {
        this.placeholder = 'Sorry? I didn\'t get that!'
        return
      }

      this.$router.push({ path: `/FAQ/${this.searchQuery}` })
    }
  },
  // Vuelidate options
  validations: {
    searchQuery: { required }
  }
})
</script>

<style scoped>

  /* Search bar appearance, rounded etc. */
  .search-bar
  {
    width: 90%;
    max-height: 50px;
    line-height: 50px;
    border-radius: 1em;
    background: #C4C4C4;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  /* Set the layout for the text input and icon */
  form
  {
    color: #303030;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  /* Remove default appearance of the input box */
  input[type=text]
  {
    margin-left: 20px;
    width: 70%;
    height: 30px;
    border: none;
    background: #C4C4C4;
  }

  input[type=text]:focus
  {
    outline: none;
  }

  /* Search Icon appearance */
  .search-bar-icon
  {
    margin-right: 20px;
    font-size: 1em;
    transform: rotate(90deg);
    cursor: pointer;
  }

</style>
