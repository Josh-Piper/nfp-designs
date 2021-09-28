// layout of the Question and Answers
export interface QuestionAndAnswer {
  question: string,
  answer: string,
  type: string
}

export interface Service {
  serviceName: string,
  imageSrc: string,
  description: string
}

export interface BlogPost {
  title: string,
  date: string,
  imageSrc: string,
  category: string,
  minuteReadTime: number,
  views: number,
  content: string,
  comments: string[]
}

export interface BlogAuthor {
  name: string,
  image: string,
  description: string,
  posts: string[]
}

export interface WebDevSkill {
  name: string,
  value: string,
  text: string
}

export interface CompletedForm {
  'form-name': string,
  'form-company-name': string,
  'form-email-address': string,
  'form-phone-nunber': string,
  'form-comments': string,
  'form-job-role': string,
  'form-service-type': string,
  'form-web-skills': string[]
}

export interface ContactButton {
  colorCode: string,
  enquiryText: string
}

export interface BasicFormData {
  text: string,
  name: string,
  placeholder: string
}
