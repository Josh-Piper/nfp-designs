<template>
  <div class="mailing-list-container">
    <div class="mailing-list-lhs">
      <div class="mailing-list-text">
        <span class="mailing-list-text-title">
          Interested in our blog?
        </span>

        <span class="mailing-list-text-description">
          join the mail list!
        </span>
      </div>
      <label class="join-email-input">
        Email:
        <input
          v-model.lazy="email"
          type="text"
          placeholder="shiva-porkel@deakin.edu.au"
        >
      </label>
      <p
        v-show="isSubmitted"
        style="background: #195748; color: #028FBC;"
      >
        Joined email list successfully
      </p>
    </div>
    <a class="mailing-join-button" @click="joinMailingList">
      JOIN
    </a>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      email: '' as string,
      isSubmitted: false as boolean
    }
  },
  methods: {
    joinMailingList (): void {
      // Send to backend API
      // Do validation there, i.e. checking for symbols
      // since front-end can be tampered with
      this.email = ''
      this.isSubmitted = true
    }
  }
})
</script>

<style scoped>

  .mailing-list-container
  {
    font-family: Arial, Helvetica, sans-serif;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 700px;
    height: 175px;
    background: #195748;
    padding: 20px;
  }

  .mailing-list-lhs
  {
    background: #195748;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .mailing-join-button
  {
    align-self: center;
    width: 150px;
    height: 75px;
    line-height: 75px;
    text-align: center;
    padding: 5px 20px;
    border-radius: 50px;
    background: #229B53;
    color: white;
    font-size: 1.5em;
    font-weight: 700;
    cursor: pointer;
  }

  .mailing-join-button:hover
  {
    filter: brightness(110%);
    box-shadow: 0 0 30 #229B53;
  }

  .mailing-list-text
  {
    background: #195748;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: auto;
  }

  .mailing-list-text-title
  {
    background: #195748;
    font-size: 1.5em;
  }

  .mailing-list-text-description
  {
    background: #195748;
    font-size: 1.25em;
  }

  .join-email-input
  {
    margin-top: 50px;
    color: white;
    font-size: 1.25em;
    background: #195748;
  }

  .join-email-input>input[type=text]
  {
    width: 100%;
    height: auto;
    background: #C4C4C4;
    font-size: 1.25em;
  }

  /* Navigation bar appearance from phones */
  @media only screen and (max-width : 600px)
  {
    .mailing-list-container
    {
      flex-direction: column;
      text-align: center;
      height: 300px;
      width: 80vw;
      font-size: 1.5em;
      padding-bottom: 75px;
    }

    .join-email-input
    {
      height: auto;
      font-size: 1.25em;
    }

    .mailing-join-button
    {
      margin-top: 20px;
    }
  }
</style>
