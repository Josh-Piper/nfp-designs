<template>
  <div class="footer">
    <!-- Redirect Links -->
    <div class="footer-redirect-links">
      <NuxtLink to="/contact">
        Contact
      </NuxtLink>

      <span style="background-color: #6A6A6A;"> | </span>

      <NuxtLink to="/blog">
        Blog
      </NuxtLink>
    </div>

    <!-- Search Menu -->
    <div class="footer-search-bar">
      <SearchBar :search-placeholder="'Search about something!'" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      isMenuOpen: false as boolean
    }
  }
})
</script>

<style scoped>

  /* Footer's container, set colour, location etc */
  .footer
  {
    background-color: #6A6A6A;
    width: 100%;
    height: 100px;
    line-height: 100px;
    max-height: 100px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: center;
  }

  /* Children elements - buttons and search bar location*/
  .footer>div
  {
    font-size: 1.5em;
    margin: 0 50px;
    color: white;
  }

  /* Footer buttons appearance */
  .footer>div>a
  {
    background-color: #6A6A6A;
    text-decoration: none;
    margin: 0 10px;
    color: white;
  }

  .footer>div>a:hover
  {
    color: #63bddb;
  }

  .footer-redirect-links
  {
    background-color: #6A6A6A;
    display: flex;
    line-height: auto;
    flex-direction: row;
    justify-content: center;
  }

  /* Set the size of the search bar */
  .footer-search-bar
  {
    background-color: #6A6A6A;
    display: flex;
    line-height: 100px;
    width: 30%;
    max-width: 1000px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  /* Footer appearance from phones */
  @media only screen and (max-width : 600px)
  {
    .footer
    {
      height: auto;
      line-height: auto;
      max-height: auto;
      flex-direction: column;
      text-align: center;
    }
    .footer>div
    {
      margin: auto;
      width: 100%;
      background-color: #6A6A6A;
    }

    .footer-search-bar
    {
      min-height: 100px;
      height: 100px;
    }

    .footer-redirect-links
    {
      padding-top: 20px;
      display: flex;
      line-height: 1em;
    }
  }

</style>
