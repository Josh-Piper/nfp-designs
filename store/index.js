export const state = () => ({
  navLinks: ['About', 'Services', 'Contact', 'Blog', 'FAQ'],
  isNavOpened: false
})

export const mutations = {
  toggleNavOpened (state) {
    state.isNavOpened = !state.isNavOpened
  }
}
