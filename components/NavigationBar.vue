<template>
  <div class="navbar">
    <h1>NFP Designs</h1>
    <div class="navigation-bar-links">
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
      if (link === this.currentLink) {
        return true
      }
      return false
    }
  }
})
</script>

<style scoped>
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

  .navigation-bar-links
  {

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
    flex: 1;
    display: block;
    height: 100%;
    margin: 0 0.3em;
    padding: 0 0.35em;
    font-size: 20px;
    text-decoration: none;
    color: white;
  }

  .navigation-bar-links>ul>li>a:hover
  {
    color: #028FBC;
  }
</style>
