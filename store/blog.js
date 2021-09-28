/* eslint-disable no-multi-str */
export const state = () => ({
  blogPosts: [
    {
      title: 'ES6 JavaScript Tips and Tricks',
      date: 'July 22, 2021',
      imageSrc: 'https://tinyurl.com/blog-post-js',
      category: 'JavaScript',
      minuteReadTime: 3,
      views: 25,
      content: 'JavaScript ES6 adds a lot of functionality, but what in particular \
      is helpful. Today, we explore several nuances of ES6 that is helpful.\n\nFirst \
      of all is the use of const and let opposed to the original keyword var. What \
      is the difference between all of these?',
      comments: [
        {
          message: 'Edward101: Great blog post!'
        }
      ]
    },
    {
      title: 'The Beauty of Vue JS',
      date: 'Aug 19, 2021',
      imageSrc: 'https://tinyurl.com/blog-post-vue',
      category: 'VueJS',
      minuteReadTime: 5,
      views: 21,
      content: 'Former Google employee Evan You created VueJS after working at the \
      company Google.\n\n He had been dealing with AngularJS and found several \
      several aspects about the framework that were difficult to understand.\n\n \
      We\'ve all come to terms with how bad Angular was. However, a great beauty \
      came out of it. That... is VueJS',
      comments: [
        {
          message: 'Edward101: I love Evan! omgggg'
        }
      ]
    },
    {
      title: 'Facebook and its beloved child, ReactJS',
      date: 'Oct 1, 2021',
      imageSrc: 'https://tinyurl.com/blog-post-react',
      category: 'React',
      minuteReadTime: 28,
      views: 50,
      content: 'All the FAANG companies are respected. The same goes for Facebook. \
        Its baby framework and library React has grown substantially over the years. \
        \n\nSo, how does it par up to its competitors such as Google\'s Angular, and \
        Evan You\'s VueJS ',
      comments: [
        {
          message: 'Shiva: Fantastic article'
        }
      ]
    },
    {
      title: '10 books to learn JavaScript',
      date: 'Oct 7, 2021',
      imageSrc: 'https://tinyurl.com/blog-post-best-books-js',
      category: 'React',
      minuteReadTime: 28,
      views: 59,
      content: 'All the FAANG companies are respected. The same goes for Facebook.\
       Its baby framework and library React has grown substantially over the years.\
       \n\nSo, how does it par up to its competitors such as Google\'s Angular, and \
       Evan You\'s VueJS ',
      comments: []
    }
  ],
  blogAuthors: [
    {
      name: 'Josh Piper',
      image: 'jpiper_picture.png',
      description: 'Software Architect at NFP Designs',
      posts: [
        'ES6 JavaScript Tips and Tricks',
        'The Beauty of Vue JS',
        'Facebook and its beloved child, ReactJS'
      ]
    },
    {
      name: 'Dr Shiva Pokhrel',
      image: 'spokrel_picture.png',
      posts: [
        '10 books to learn JavaScript'
      ]
    }
  ]
})

export const mutations = {
  postComment (state, index, newMessage) {
    state.blogPosts[index].comments.push(newMessage)
  }
}
