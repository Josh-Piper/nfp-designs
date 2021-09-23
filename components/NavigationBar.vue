<template>
  <div class="navbar">
    <NuxtLink to="/" class="navbar-home-btn">
      NFP Designs
    </NuxtLink>
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
  computed: {
    ...mapState(['navLinks'])
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

  .navbar-home-btn
  {
    font-weight: 900;
    font-size: 2em;
    text-decoration: none;
    color: white;
  }

  .bold
  {
    font-weight: 900;
    box-shadow: inset 0 -5px 0 #028FBC;
  }

  .navbar
  {
    display: flex;
    line-height: 80px;
    flex-direction: row;
    justify-content: space-between;
    background-color: #324D66;
    color: white;
    padding: 0 5%;
  }

  .navbar-content
  {
    display: flex;
    align-items: stretch;
  }

  .navigation-bar-links
  {
    align-items: stretch;
  }

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

  .navigation-bar-hamburger-icon
  {
    display: none;
  }

    @media only screen and (max-width : 600px) {

      .navbar-home-btn
      {
        font-size: 1.5em;
      }

      .navigation-bar-links
      {
        display: none;
        /* height: 100vh; */
      }

      .open-hamburger-nav
      {
        display: flex;

      }

      .navbar-content
      {
        justify-content: flex-start;
        align-items: flex-end;
        flex-direction: column;
        width: 50vw;
      }

      .navigation-bar-links
      {

      }

      .navigation-bar-links>ul
      {

        display: flex;
        flex-direction: column;
      }

      .navigation-bar-hamburger-icon
      {
        display: block;
        align-items: stretch;
        height: 80px;
        line-height: 100%;
        font-size: 2em;
      }

      .navigation-bar-links>ul>li
      {
        width: 90vw;
        text-align: center;
      }

      .navigation-bar-links>ul>li>a
      {
        font-size: 2em;
      }
    }

</style>
