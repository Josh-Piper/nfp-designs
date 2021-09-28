<template>
  <div class="app">
    <NavigationBar :current-link="'Blog'" />

    <p v-show="redirecting" class="section-header-text">
      Sorry, there is no blog post called "{{ $route.params.Blog }}""
    </p>

    <p v-show="redirecting" class="section-header-text">
      Redirecting in {{ timeout }} seconds
    </p>

    <div v-if="blogPost">
      <p class="section-header-text">
        Viewing a Blog Post!
      </p>

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
  data () {
    return {
      blogPost: undefined as BlogPost | undefined,
      redirecting: false as boolean,
      timeout: 5 as number
    }
  },
  computed: {
    ...mapState('blog', ['blogPosts'])
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
  }
})
</script>

<style>

</style>
