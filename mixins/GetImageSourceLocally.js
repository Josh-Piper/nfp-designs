export default {
  methods: {
    // Relative paths are binded at compile time.
    // This is a workaround to the v-bind img>src
    getImageSource (src) {
      return require(`~/assets/${src}`)
    }
  }
}
