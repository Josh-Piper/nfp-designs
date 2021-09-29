<template>
  <div class="app">
    <NavigationBar :current-link="'Blog'" />

    <!-- If blog post does not exist, redirect them back to previous page -->
    <div v-show="redirecting" id="redirect-user">
      <p class="section-header-text">
        Sorry, there is no blog post called "{{ $route.params.Blog }}"
      </p>
      <!-- Countdown for how long till user is redirected -->
      <p class="section-header-text">
        Redirecting in {{ timeout }} seconds
      </p>
    </div>

    <!-- All blog content -->
    <div
      v-if="blogPost"
      class="main-container"
    >
      <!-- The blog post details -->
      <div id="blog-post">
        <!-- Basic blog details such as image and title -->
        <img
          id="blog-post-image"
          :src="blogPost.imageSrc"
          :alt="blogPost.title + 'image'"
        >

        <p class="section-header-text">
          {{ blogPost.title }}
        </p>

        <hr>

        <!-- Write all the blog content -->
        <div id="blog-post-text-content">
          {{ blogPost.content }}
        </div>

        <hr>

        <!-- Write all the details about the author -->
        <div id="blog-author-container">
          <img
            :src="getImageSource(blogAuthor.image)"
            :alt="blogAuthor.name + 'picture'"
          >
          <div id="blog-author-container-text">
            <div id="blog-author-container-text-name">
              {{ blogAuthor.name }}
            </div>
            <div id="blog-author-container-text-title">
              {{ blogAuthor.description }}
            </div>
          </div>
        </div>
      </div>

      <!-- Blog comment section -->
      <div id="blog-comments">
        <div id="blog-comments-section-holder">
          <div id="blog-comments-section-holder-title">
            Join the discussion:
          </div>

          <!-- Write the blog comments from Vuex -->
          <div
            v-for="(item, index) in blogPost.comments"
            :key="index"
            class="blog-comment-post"
          >
            {{ item.message }}
          </div>
        </div>

        <!-- Let the user post their own comments -->
        <div id="create-blog-comment">
          <input
            v-model.trim="comment"
            type="text"
            placeholder="Join the discussion"
          >
          <a @click="uploadComment">
            POST COMMENT
          </a>
        </div>
      </div>
    </div>

    <div class="mailing-list-container">
      <MailingList />
    </div>
    <Footer class="footer-main" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'
import GetImageSourceLocally from '~/mixins/GetImageSourceLocally.js'
import { BlogPost, BlogAuthor } from '~/Types/types'

Vue.mixin(GetImageSourceLocally)

export default Vue.extend({
  data () {
    return {
      blogPost: undefined as BlogPost | undefined,
      blogAuthor: undefined as BlogAuthor | undefined,
      redirecting: false as boolean,
      timeout: 5 as number,
      comment: '' as string
    }
  },
  computed: {
    ...mapState('blog', ['blogPosts', 'blogAuthors'])
  },
  watch: {
    // Begin countdown when the user wants to be redirected
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

    // If no blog exists (title), then redirect
    if (!this.blogPost) {
      this.redirecting = true
      return
    }

    this.updatePost()

    // Set author
    const authors: BlogAuthor[] = this.blogAuthors
    const author: BlogAuthor | undefined = authors.find(
      a => a.posts.includes(findPost))

    this.blogAuthor = author
  },
  methods: {
    ...mapMutations('blog', ['postComment']),
    updatePost () {
      const posts: BlogPost[] = this.blogPosts
      if (this.blogPost) {
        const post: BlogPost | undefined = posts.find(
          p => p.title === this.blogPost?.title
        )
        this.blogPost = post
      }
    },
    uploadComment (): void {
      const message: string = this.comment
      if (message === '') {
        return
      }

      const index: number = this.blogPosts.indexOf(this.blogPost)
      this.postComment({ index, message })
      this.updatePost()
      this.comment = ''
    }
  }
})
</script>

<style>
  /* Redirect user appearance (Take whole page) */
  #redirect-user
  {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
  }

  /* Control the size of all content */
  .main-container
  {
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* Appearance of the blog post and comments container */
  #blog-post, #blog-comments
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

  /* Blog post appearance, post's details */
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

  /* Blog post text content */
  #blog-post-text-content
  {
    background: white;
    font-size: 1.25em;
    white-space: pre-line;
    margin: 0 50px;
  }

  /* Bottom blog details such as the author details */
  #blog-author-container
  {
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;;
  }

  #blog-author-container>img
  {
    width: 100px;
    height: 100px;
    border-radius: 150px;
  }

  #blog-author-container-text
  {
    margin-left: 20px;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    width: auto;
    height: 150px;
  }

  #blog-author-container-text-name
  {
    background: white;
    height: auto;
  }

  #blog-author-container-text-title
  {
    background: white;
    font-style: italic;
    height: auto;
  }

  /* Blog comment section appearance */
  #create-blog-comment
  {
    background: white;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    margin: 0 30px;
    margin-bottom: 20px;
  }

  /* Comments text box */
  #create-blog-comment>input[type=text]
  {
    font-size: 1.25em;
    height: 1.5em;
    border: none;
    width: 40%;
    padding: 0 10px;
  }

  #create-blog-comment>a
  {
    padding: 20px 20px;
    color: white;
    background: #4473EA;
    border-radius: 50px;
    cursor: pointer;
  }

  #create-blog-comment>a:hover
  {
    filter: brightness(110%);
    font-weight: bold;
    font-style: italic;
  }

  /* Comment section appearance (actual post and header) */
  #blog-comments-section-holder
  {
    background: white;
    padding: 10px;
  }

  #blog-comments-section-holder-title
  {
    background: white;
    margin-left: 20px;
    font-weight: bold;
    font-size: 1.25em;
  }

  .blog-comment-post
  {
    background: white;
    margin-left: 20px;
  }

  /* Set the sizing mailing list component */
  .mailing-list-container
  {
    margin: 50px 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  /*
    Make the blog post and comments width to be responsive 
    (for smaller desktops and tablets)
  */
  @media only screen and (max-width : 1200px)
  {
    #blog-post, #blog-comments
    {
      width: 75vw;
    }
  }

  /* Mobile view, make content larger and column based */
  @media only screen and (max-width : 600px)
  {
    /* Blog and comment section responsive to screen */
    #blog-post, #blog-comments
    {
      width: 85vw;
    }

    /* Blog author appearance (change to column based) */
    #blog-author-container
    {
      flex-direction: column;
    }

    #blog-author-container-text-name
    {
      font-weight: bold;
    }

    #blog-author-container-text
    {
      margin: 0;
      text-align: center;
      font-size: 1.5em;
      margin: 0 20px;
    }

    /* Blog comments */
    #create-blog-comment
    {
      margin-top: 50px;
      flex-direction: column;
      align-items: center;
    }

    #create-blog-comment>input[type=text]
    {
      width: 80%;
    }

    #create-blog-comment>a
    {
      margin-top: 20px;
    }
  }

</style>
