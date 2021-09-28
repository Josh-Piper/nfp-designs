<template>
  <div class="app">
    <NavigationBar :current-link="'Blog'" />

    <!-- -->
    <div id="blog-hero">

      <!-- -->
      <div id="blog-hero-buttons-container">
        <a
          v-for="(category, index) in allCategories"
          :key="index"
        >
          {{ category }}
        </a>
      </div>

      <!-- -->
      <div id="most-viewed-blog-post">
        <img
          :src="mostViewedPost.imageSrc"
          :alt="`image for ${mostViewedPost.title}`"
        >
        <!-- -->
        <div id="most-viewed-blog-post-text">
          <div id="most-viewed-blog-post-text-title">
            {{ mostViewedPost.title }}
          </div>

          <!-- -->
          <div id="most-viewed-blog-post-text-description">
            {{ mostViewedPost.date }}
            <span id="dot">
              &nbsp;
            </span>
            {{ mostViewedPost.minuteReadTime }}
            min read
          </div>
          <!-- -->
          <a
            id="most-viewed-blog-post-button"
            @click="sendToBlog(mostViewedPost.title)"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>

    <!-- -->
    <p class="section-header-text">Blog Posts</p>
    <div id="blog-posts-container">
      <div
        v-for="(post, index) in blogPosts"
        :key="index"
        class="blog-post"
        @click="sendToBlog(post.title)"
      >
        <img
          :src="post.imageSrc"
          :alt="post.title + ' image'"
        >
        <div class="blog-post-category">
          {{ post.category }}
        </div>

        <div class="blog-post-information">
          <div class="blog-post-title">
            {{ post.title }}
          </div>

          <!-- -->
          <div class="blog-post-description">
            {{ post.date }}
            <span id="dot" style="background: black;">
              &nbsp;
            </span>
            {{ post.minuteReadTime }}
            min read
          </div>
        </div>

      </div>
    </div>

    <!-- -->
    <div id="mailing">
      <MailingList />
    </div>

    <Footer class="footer-main" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

interface BlogPost {
  title: string,
  date: string,
  imageSrc: string,
  category: string,
  minuteReadTime: number,
  views: number,
  content: string,
  comments: string[]
}

export default Vue.extend({
  computed: {
    ...mapState('blog', ['blogPosts']),
    mostViewedPost (): BlogPost {
      const allPosts: BlogPost[] = this.blogPosts
      const mostViewedPost = allPosts.reduce((lhs, rhs) => {
        return (lhs.views > rhs.views) ? lhs : rhs
      })
      return mostViewedPost
    },
    allCategories (): string[] {
      const allPosts: BlogPost[] = this.blogPosts
      const allCategories: string[] = allPosts.map(post => post.category)
      const uniqueCategories = [...new Set(allCategories)]
      return uniqueCategories
    }
  },
  methods: {
    sendToBlog (blogTitle: string): void {
      this.$router.push({ path: `/blog/${blogTitle}` })
    }
  }
})
</script>

<style scoped>

  #blog-hero
  {
    font-family: Arial, Helvetica, sans-serif;
    width: 100%;
    background: #494949;
    padding-bottom: 40px;
  }

  #blog-hero-buttons-container
  {
    background: #494949;
    color: white;
    margin: 0 30px;
    margin-top: 30px;
  }

  #blog-hero-buttons-container>a
  {
    background: #494949;
    margin: 10px 20px;
    cursor: pointer;
  }

  #blog-hero-buttons-container>a:hover
  {
    text-decoration: underline;
  }

  #most-viewed-blog-post
  {
    background: #494949;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-around;
    align-items: flex-end;
    padding: 0 20px;
  }

  #most-viewed-blog-post>img
  {
    width: 700px;
    height: 400px;
  }

  #most-viewed-blog-post-text
  {
    background: #494949;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  #most-viewed-blog-post-text-title
  {
    font-size: 2em;
    font-weight: bold;
    background: #494949;
  }

  #most-viewed-blog-post-text-description
  {
    background: #494949;
    font-size: 1.25em;
    line-height: 1.25em;
    display: flex;
    align-items: center;
    margin-bottom: 50px;
  }

  #dot
  {
    height: 10px;
    width: 10px;
    background: white;
    border-radius: 50%;
    display: inline-block;
    margin: 0 10px;
  }

  #most-viewed-blog-post-button
  {
    margin-top: 30px;
    background: #00838F;
    padding: 10px 20px;
    font-size: 1.5em;
    font-weight: bold;
    width: 300px;
    height: 75px;
    line-height: 75px;
    text-align: center;
    border-radius: 50px;
    cursor: pointer;
  }

  #most-viewed-blog-post-button:hover
  {
    filter: brightness(110%);
  }

  #blog-posts-container
  {
    align-self: center;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    grid-column-gap: 40px;
    grid-row-gap: 60px;
    margin-bottom: 100px;
    justify-content: center;
    align-items: center;
  }

  .blog-post
  {
    width: 350px;
    height: 350px;
    background: white;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    color: black;
    overflow-x: hidden;
    overflow-y: hidden;
    cursor: pointer;
  }

  .blog-post:hover
  {
    border: 1px solid black;
    box-shadow: 0px 0px 30px #00838F;
  }

  .blog-post>img
  {
    width: 350px;
    height: 300px;
    border-radius: 50px;
    position: relative;
    margin-top: -35px;
  }

  .blog-post-information, .blog-post-category,
  .blog-post-title, .blog-post-description,
  .blog-post-description span
  {
    background: white;
    margin: 0 10px;
  }

  .blog-post-category
  {
    height: auto;
    padding: 10px 25px;
    border: solid 1px #028FBC;
    background: white;
    border-radius: 150px;
    width: 80px;
    margin-top: -25px;
    margin-left: 30px;
    z-index: 2;
    text-align: center;
  }

  .blog-post-information
  {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .blog-post-title
  {
    font-weight: bold;
    font-size: 1.5em;
    margin-top: 10px;
    font-family: Arial, Helvetica, sans-serif;
    height: auto;
  }

  .blog-post-description
  {
    margin-top: 5px;
    height: auto;
    display: flex;
    align-items: center;
  }

  #mailing
  {
    display: flex;
    justify-content: center;
    margin-bottom: 100px;
  }

  @media only screen and (max-width : 1200px)
  {
    #blog-posts-container
    {
      grid-template-columns: repeat(2, 1fr);
    }

     #most-viewed-blog-post>img
     {
       width: 45vw;
       height: 25vh;
     }

    #most-viewed-blog-post-text
    {
      width: 40vw;
    }

    #most-viewed-blog-post-button
    {
      width: 25vw;
      height: auto;
    }

    .blog-post
    {
      width: 40vw;
    }
  }

  /* Mobile layout */
  @media only screen and (max-width : 600px)
  {

    #blog-hero-buttons-container
    {
      font-size: 1.5em;
    }

    #most-viewed-blog-post
    {
      flex-direction: column;
      align-items: center;
    }

    #most-viewed-blog-post-button
    {
      width: 80vw;
    }

    #most-viewed-blog-post>img,
    #most-viewed-blog-post-text
    {
      width: 80vw;
      margin-top: 20px;
    }

    #most-viewed-blog-post-text
    {
      align-items: center;
    }

    #most-viewed-blog-post-button
    {
      align-self: center;
    }

    #blog-posts-container
    {
      grid-template-columns: 1fr;
    }

    .blog-post
    {
      width: 80vw;
    }
  }

</style>
