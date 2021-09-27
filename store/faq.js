export const state = () => ({
  faqData: [
    {
      question: 'Who is in the unit team for SIT120?',
      answer: 'Shiva Porkel, Shang Gao, Ting-Chieh Lin and Nisha Kumari',
      type: 'SIT120 Info'
    },
    {
      question: 'Which tutor in SIT120 is based in Geelong?',
      answer: 'Shang Gao',
      type: 'SIT120 Info'
    },
    {
      question: 'What subjects am I enrolled in?',
      answer: 'SIT120, SIT112 and SIT232',
      type: 'SIT120 Info'
    },
    {
      question: 'What is SIT120?',
      answer: 'Deakin University\'s unit Introduction to Responsive Web Apps which teaches the basics of programming',
      type: 'SIT120 Info'
    },
    {
      question: 'What is NFP Designs?',
      answer: 'A non-for-profit organisation providing services to other charities requiring technical consultation',
      type: 'General Enquiries'
    },
    {
      question: 'How do I contact NFP Designs?',
      answer: 'Navigate to the /contact page found in the navigation bar',
      type: 'General Enquiries'
    },
    {
      question: 'How do I volunteer/help NFP Designs?',
      answer: 'Please use the contact us page and select the Volunteering & Contributing button',
      type: 'General Enquiries'
    },
    {
      question: 'What are your favourite foods?',
      answer: 'I love big breakfeasts, which includes chorizo, bread and egg. Absolute classic food',
      type: 'General Enquiries'
    }
  ]
})

export const mutations = {
  addQuestion (state, qna) {
    if (qna.question === '') {
      return
    }

    state.faqData.push(qna)
  }
}
