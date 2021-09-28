<template>
  <div class="app">
    <NavigationBar :current-link="'Blog'" />

    <!-- If blog post does not exist, redirect them back to previous page -->
    <div v-show="redirecting" id="redirect-user">
      <p class="section-header-text">
        Sorry, there is no blog post called "{{ $route.params.Blog }}"
      </p>

      <p class="section-header-text">
        Redirecting in {{ timeout }} seconds
      </p>
  </div>

    <div
      v-if="blogPost"
      class="main-container"
    >
      <div id="blog-post">
        <img
          id="blog-post-image"
          :src="blogPost.imageSrc"
          :alt="blogPost.title + 'image'"
        >

        <p class="section-header-text">
          {{ blogPost.title }}
        </p>

        <hr>

        <div id="blog-post-text-content">
          {{ blogPost.content }}
        </div>

        <hr>

        <div id="blog-author-container">
          <img
            :src="getImageSource(blogAuthor.image)"
            :alt="blogAuthor.name + 'picture'"
          >
        </div>
      </div>

    </div>
    <Footer class="footer-main" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import GetImageSourceLocally from '~/mixins/GetImageSourceLocally.js'
import { BlogPost, BlogAuthor } from '~/Types/types'

Vue.mixin(GetImageSourceLocally)

export default Vue.extend({
  data () {
    return {
      blogPost: undefined as BlogPost | undefined,
      blogAuthor: undefined as BlogAuthor | undefined,
      redirecting: false as boolean,
      timeout: 5 as number
    }
  },
  computed: {
    ...mapState('blog', ['blogPosts', 'blogAuthors'])
  },
  watch: {
    redirecting (newValue) {
      if (newValue) {
        setTimeout(() => {
          this.timeout--
        }, 1000)
      }
    },
    timeout: {
      handler (numSeconds) {
        // When timer is out, redirect
        if (numSeconds <= 0) {
          this.$router.go(-1)
        }

        if (numSeconds > 0 && this.redirecting) {
          setTimeout(() => {
            this.timeout--
          }, 1000)
        }
      },
      immediate: true
    }
  },
  mounted () {
    const posts: BlogPost[] = this.blogPosts
    const findPost = this.$route.params.Blog
    this.blogPost = posts.find(post => post.title === findPost)

    if (!this.blogPost) {
      this.redirecting = true
    }

    // Set author
    const authors: BlogAuthor[] = this.blogAuthors
    const author: BlogAuthor | undefined = authors.find(
      a => a.posts.includes(findPost))

    this.blogAuthor = author

    // Set post
    const post: BlogPost | undefined = posts.find(
      p => p.title === findPost
    )
    this.blogPost = post
  },
  methods: {
  }
})
</script>

<style>

  #redirect-user
  {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
  }

  .main-container
  {
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #blog-post
  {
    font-family: Arial, Helvetica, sans-serif;
    margin: 100px 0;
    display: flex;
    flex-direction: column;
    align-content: center;
    width: 850px;
    background: white;
    overflow-x: hidden;
    border-radius: 30px;;
  }

  #blog-post-image
  {
    border-radius: 30px;
  }

  #blog-post>p
  {
    background: white;
    height: auto;
    width: auto;
    text-align: center;
    margin-top: 50px;
  }

  #blog-post>hr
  {
    width: 80%;
    align-self: center;
    margin: 50px;
  }

  #blog-post-text-content
  {
    background: white;
    font-size: 1.25em;
    white-space: pre-line;
    margin: 0 50px;
  }

  #blog-author-container
  {
    background: white;
    display: flex;
    justify-content: center;
    margin-bottom: 50px;;
  }

  #blog-author-container>img
  {
    width: 100px;
    height: 100px;
  }

</style>
