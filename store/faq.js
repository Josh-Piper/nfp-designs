export const state = () => ({
  faqData: [
    {
      question: 'What is the unit team for SIT120',
      answer: 'Shiva Porkel, Shang Gao, Ting-Chieh Lin and Nisha Kumari',
      type: 'SIT120 Info'
    },
    {
      question: 'What is SIT120',
      answer: 'Deakin University\'s unit Introduction to Responsive Web Apps',
      type: 'SIT120 Info'
    },
    {
      question: 'What is NFP Designs',
      answer: 'A non-for-profit organisation providing services to other charities requiring technical consultation',
      type: 'General Enquiries'
    },
    {
      question: 'How do I contact NFP Designs?',
      answer: 'Navigate to the /contact page found in the navigation bar',
      type: 'General Enquiries'
    },
    {
      question: 'How do I volunteer/help NFP Designs',
      answer: 'Please use the contact us page and select the Volunteering & Contributing button',
      type: 'General Enquiries'
    }
  ]
})

export const mutations = {
  addQuestion (state, q) {
    if (q === '') {
      return
    }

    state.faqData.push({ question: q, answer: 'TBA' })
  }
}
