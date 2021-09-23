<template>
  <div class="search-bar">
    <form @submit.prevent="searchFAQ">
      <p> Text in Search Bar </p>
      <input type="text" :placeholder="searchPlaceholder">

      <font-awesome-icon
        :icon="['fas', 'search']"
        class="search-bar-icon"
      />
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    searchPlaceholder: {
      required: true,
      type: String
    }
  },
  data () {
    return {

    }
  },
  methods: {
    searchFAQ (): void {
      this.$router.push({ path: '/FAQ' })
    }
  }
})
</script>

<style scoped>

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

  form
  {
    color: #303030;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

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

  .search-bar-icon
  {
    margin-right: 20px;
    font-size: 1em;
    transform: rotate(90deg)
  }

</style>
