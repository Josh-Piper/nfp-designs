export const state = () => ({
  blogPosts: [
    {
      title: '',
      date: '',
      imageSrc: '',
      description: '',
      comments: [
        {
          message: 'Edward101: Great blog post!'
        }
      ]
    }
  ]
})

export const mutations = {
  postComment (state, index, newMessage) {
    state.blogPosts[index].comments.push(newMessage)
  }
}
