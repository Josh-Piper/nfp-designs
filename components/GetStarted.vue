<template>
  <div class="get-started-container">
    <!-- Getting started text -->
    <div class="get-started-text">
      <span class="get-started-text-main">
        READY TO GET STARTED?
      </span>
      <span class="get-started-text-assist">
        Let's make it happen!
      </span>
    </div>
    <!-- Getting start button -->
    <div class="get-started-button">
      <NuxtLink to="/contact">
        Contact Us
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>

  /* Style the container into a border box */
  .get-started-container
  {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 750PX;
    background: #C4C4C4;
    font-size: 1.5em;
    padding: 35px 0;
    border-radius: 35px;
  }

  /* Set the text appearance */
  .get-started-text
  {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .get-started-text-main
  {
    background: #C4C4C4;
    font-weight: 700;
    font-family: Arial, Helvetica, sans-serif;
  }

  .get-started-text-assist
  {
    background: #C4C4C4;
  }

  /* Set the appearance of the contact us button */
  .get-started-button
  {
    line-height: 1.5em;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #4473EA;
    border-radius: 50px;
  }

  .get-started-button a
  {
    background-color: #4473EA;
    color: white;
    font-weight: bolder;
    font-size: 1.25em;
    font-family: Arial, Helvetica, sans-serif;
    padding: 20px 30px;
    border-radius: 50px;
    text-decoration: none;
  }

  /* Update responsiveness by changing row to column layout */

  @media only screen and (max-width : 950px)
  {
    /* Make the text smaller between 950 to 801 */
    .get-started-container
    {
      width: 600px;
      font-size: 1.15em;
    }
  }

  /* Update layout from row to column */
  @media only screen and (max-width : 800px)
  {
    .get-started-container
    {
      width: 500px;
      flex-direction: column;
      text-align: center;
      justify-content: space-around;
      font-size: 1.5em;
    }

    .get-started-button
    {
      margin-top: 20px;
    }
  }

  @media only screen and (max-width : 600px)
  {
    .get-started-container
    {
      width: 80%;
    }
  }

</style>
