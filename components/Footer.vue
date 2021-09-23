<template>
  <div class="footer">
    <!-- Redirect Links -->
    <div>
      <NuxtLink to="/contact">
        Contact
      </NuxtLink>

      <span> | </span>

      <NuxtLink to="/blog">
        Blog
      </NuxtLink>
    </div>

    <!-- Search Menu -->
    <div class="footer-search-bar">
      <span>Search Menu lives here</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      isMenuOpen: false
    }
  }
})
</script>

<style scoped>

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

  .footer>div
  {
    margin: 0 50px;
    color: white;
  }

  .footer>div>a
  {
    text-decoration: none;
    color: white;
  }

  .footer>div>a:hover
  {
    color: #028FBC;
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
  }

</style>
