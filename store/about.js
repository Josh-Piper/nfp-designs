export const state = () => ({
  heroContent: [
    {
      title: 'Not Sure?',
      steps: [
        'Browse Services',
        'Pick your Needs',
        'Design Together!'
      ],
      redirectLink: { text: 'View Services', route: 'services' },
      backgroundColor: '#4C4AA5'
    },
    {
      title: 'Ready?',
      steps: [
        'Contact Us',
        'Design together',
        'Done!'
      ],
      redirectLink: { text: 'Contact Us', route: 'contact' },
      backgroundColor: '#028FBC'
    }
  ],
  servicesAndExplanations: [
    {
      title: 'Our Motive',
      content: 'NFP designs is about providing Not-For-Profit companies with their technology needs.\nWe are run by volunteers and create Open-Source templates and products to allow NFP’s to start and grow quicker.\nWe are always looking  for qualified volunteers. Please view the volunteer tab to find out more!'
    },
    {
      title: 'Development',
      content: 'First we need to discern what type of  development you need!\nIs it mobile or website development? or do you require consultancy to help bring IoT devices to life!\nWe cater a wide range of development, so view our  services and then contact us to bring your idea into fruition.'
    },
    {
      title: 'Design',
      content: 'We help you take control of your website design whether it be using  Wordpress or Squarespace, we will help design a responsive and optmised website.\nOnce you have a rough idea of what your design to look like, then click Contact Us and we will design it to ensure it is as elegant as possible.'
    }
  ],
  portfolio: [
    {
      imageSrc: 'https://cdn.vox-cdn.com/thumbor/t5bBnfecHwirAFJVbLaS55ZpG_w=/0x0:1920x1080/1070x602/filters:focal(807x387:1113x693):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/65650200/jbareham_191158_ply0958_decade_minecraft.0.jpg',
      imageAlt: 'Minecraft Image',
      description: 'Minecraft',
      descriptionRedirect: 'https://www.minecraft.net/en-us'
    },
    {
      imageSrc: 'https://images8.alphacoders.com/903/903580.png',
      imageAlt: 'Fortnite Image',
      description: 'Fortnite',
      descriptionRedirect: 'https://www.epicgames.com/fortnite/en-US/home'
    },
    {
      imageSrc: 'https://cdn.mos.cms.futurecdn.net/VtqBPkgxgCQSbzjoaXfs8M-970-80.jpg.webp',
      imageAlt: 'Call of Duty Mobile Image',
      description: 'CoDM',
      descriptionRedirect: 'https://www.callofduty.com/au/en/mobile'
    },
    {
      imageSrc: 'https://assets.nintendo.com/image/upload/c_pad,f_auto,h_613,q_auto,w_1089/ncom/en_US/games/switch/f/fall-guys-ultimate-knockout-switch/hero?v=2021091520',
      imageAlt: 'Fall Guys Image',
      description: 'Fall Guys',
      descriptionRedirect: 'https://store.steampowered.com/app/1097150/Fall_Guys_Ultimate_Knockout/'
    },
    {
      imageSrc: 'https://assets.nintendo.com/image/upload/c_pad,f_auto,h_613,q_auto,w_1089/ncom/en_US/games/switch/m/mario-kart-8-deluxe-switch/hero?v=2021092211',
      imageAlt: 'Mario kart Image',
      description: 'Mario Kart',
      descriptionRedirect: 'https://www.nintendo.com/games/detail/mario-kart-8-deluxe-switch/'
    },
    {
      imageSrc: 'https://wallpapercave.com/wp/wp2675347.jpg',
      imageAlt: 'Tetris Image',
      description: 'Tetris',
      descriptionRedirect: 'https://tetris.com/play-tetris/'
    }
  ]
})
