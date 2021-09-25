<template>
  <div
    :class="isMenuOpen && 'open-navbar'"
    class="navbar"
  >
    <!-- Title of the application -->
    <NuxtLink to="/" class="navbar-home-btn">
      {{ WEBSITE_TITLE }}
    </NuxtLink>

    <!-- Navbar menu icons, cross and bars -->
    <div class="navbar-content">
      <font-awesome-icon
        v-if="isMenuOpen"
        :icon="['fas', 'times']"
        class="navigation-bar-hamburger-icon"
        @click="toggleHamburgerMenu"
      />

      <font-awesome-icon
        v-else
        :icon="['fas', 'bars']"
        class="navigation-bar-hamburger-icon"
        @click="toggleHamburgerMenu"
      />

      <!-- The actual menu buttons rendered as anchor tags -->
      <div class="navigation-bar-links" :class="isMenuOpen && 'open-hamburger-nav'">
        <ul>
          <li
            v-for="(link, index) in navLinks"
            :key="index"
          >
            <NuxtLink
              :to="getRouteLink(link)"
              :class="activeLink(link) && 'bold'"
            >
              {{ link }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
export default Vue.extend({
  // Highlights the current link in the navigation bar
  props: {
    currentLink: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      isMenuOpen: false
    }
  },
  // Map the different links from Vuex
  computed: {
    ...mapState('global', ['navLinks', 'WEBSITE_TITLE'])
  },
  methods: {
    getRouteLink (link: string): string {
      if (link === 'About') {
        return '/'
      }
      return link.toLowerCase()
    },
    activeLink (link: string): boolean {
      return (link === this.currentLink)
    },
    toggleHamburgerMenu (): void {
      this.isMenuOpen = !this.isMenuOpen
    }
  }
})
</script>

<style scoped>
  /*
    The website name in the navigation menu
    Control the different effects it has.
  */
  .navbar-home-btn
  {
    font-weight: 900;
    font-size: 2em;
    text-decoration: none;
    color: white;
  }
  .navbar-home-btn:hover
  {
    color: #028FBC;
  }
  /* Navbar container as a flexbox */
  .navbar
  {
    display: flex;
    line-height: 80px;
    max-height: 80px;
    flex-direction: row;
    justify-content: space-between;
    background-color: #324D66;
    color: white;
    padding: 0 5%;
  }
  /*
    Set the children of the nav bar to have the height of the parent
    via flexbox
  */
  .navbar-content
  {
    display: flex;
    align-items: stretch;
  }
  .navigation-bar-links
  {
    align-items: stretch;
  }
  /*
    The appearance of the individual list items
  */
  .navigation-bar-links>ul
  {
    list-style-type: none;
    display: flex;
    flex-direction: row;
  }
  .navigation-bar-links>ul>li
  {
    background-color: #324D66;
  }
  /* Appearance of the navbar buttons */
  .navigation-bar-links>ul>li>a
  {
    font-family: Arial, Helvetica, sans-serif;
    display: block;
    margin: 0 0.3em;
    padding: 0 0.35em;
    font-size: 1em;
    text-decoration: none;
    color: white;
  }
  .navigation-bar-links>ul>li>a:hover
  {
    color: #028FBC;
  }
  /* The current navigation button bottom-border effect */
  .bold
  {
    font-weight: 900;
    box-shadow: inset 0 -5px 0 #028FBC;
  }
  /* Hamburger menu styling */
  .navigation-bar-hamburger-icon
  {
    cursor: pointer;
    display: none;
  }
  .navigation-bar-hamburger-icon:hover
  {
    color: #028FBC;
  }

  /* Navigation bar appearance from phones */
  @media only screen and (max-width : 600px)
  {
    div>.open-navbar
    {
     max-height: 1000px;
    }

    .navbar-home-btn
    {
      font-size: 1.5em;
    }
    /* Hide the navigational bar links until hamburger clicked */
    .navigation-bar-links
    {
      display: none;
    }
    .open-hamburger-nav
    {
      display: flex;
    }
    /*
      Styling on the navigation bar buttons when hamburger
      clicked
    */
    .navbar-content
    {
      justify-content: flex-start;
      align-items: flex-end;
      flex-direction: column;
      width: 50vw;
    }
    .navigation-bar-links>ul
    {
      display: flex;
      flex-direction: column;
    }
    /* Make each button large and centered within menu */
    .navigation-bar-links>ul>li
    {
      width: 90vw;
      text-align: center;
    }
    .navigation-bar-links>ul>li>a
    {
      font-size: 2em;
    }
    /* Appearance of hamburger/cross */
    .navigation-bar-hamburger-icon
    {
      display: block;
      align-items: stretch;
      height: 80px;
      line-height: 100%;
      font-size: 2em;
    }
  }

  @media only screen and (max-width : 320px)
  {
    .navbar-home-btn
    {
      font-size: 0.75em;
    }
  }

</style>
