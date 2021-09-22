<template>
  <div>
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
  }
</style>
