<template>
  <div class="hero-container" :style="`color: ${backgroundColor}`">

    <div class="hero-container-title">
      <span>{{ title }}</span>
    </div>

    <div>
      <div v-for="(step, index) in steps" :key="index" class="hero-container-step" >
        <span class="hero-container-step-number" :style="`background: ${backgroundColor}`">{{ index + 1 }}</span>
        <span>{{ step || '?' }}</span>
      </div>
    </div>

    <div class="hero-container-redirect-title">
      <NuxtLink :to="`/${redirectLink.route}`" :style="`background: ${backgroundColor}`">
        {{ redirectLink.text }}
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    title: {
      required: true,
      type: String
    },
    steps: {
      required: true,
      type: Array
    },
    redirectLink: {
      required: true,
      type: Object
    },
    backgroundColor: {
      required: true,
      type: String
    }
  }
})
</script>

<style scoped>

  .hero-container
  {
    font-family: Arial, Helvetica, sans-serif;
    width: 450px;
    height: auto !important;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: white;
    font-size: 2.25em;
  }

  .hero-container span, .hero-container div
  {
    background: white;
  }

  .hero-container-title
  {
    margin-top: 30px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .hero-container-redirect-title
  {
    margin-top: 30px;
    margin-bottom: 50px;
  }

  .hero-container-redirect-title>a
  {
    text-decoration: none;
    font-weight: bolder;
    color: white;
    padding: 10px 30px;
    border-radius: 50px;
  }

  .hero-container-redirect-title>a:hover
  {
    filter: brightness(1.2);
  }

  .hero-container-step
  {
    background: white;
    margin: 20px 0px;
  }

  .hero-container-step-number
  {
    display: inline-block;
    text-align: center;
    padding: 10px;
    color: white;
    border-radius: 50%;
    width: 30px;
    line-height: 30px;
    height: 30px;
  }

  @media only screen and (max-width : 1200px)
  {
    .hero-container
    {
      width: 325px;
      font-size: 1.5em;
    }
  }

  @media only screen and (max-width : 600px)
  {
    .hero-container
    {
      width: 80vw;
      font-size: 1.5em;
    }

    .hero-container-step-number
    {
      padding: 0;
    }

    .hero-container-redirect-title>a
    {
      padding: 15px 30px;
      font-size: 1.15em;
    }
  }
</style>
