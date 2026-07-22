export const environment = {
  production: false,

  // EmailJS setup — create a free account at https://www.emailjs.com/
  // Connect Gmail as the email service, then create a template with two
  // variables: `button_clicked` and `timestamp`.
  emailjs: {
    publicKey: 'xpdu3mrjZleXiK_G8',
    serviceId: 'service_lk87unj',
    templateId: 'template_y9nhfnk',
  },

  // Hidden /ilovelips admin page PIN gate (not real security, just a casual
  // deterrent against accidental discovery). Change this to whatever you like.
  adminPin: '2580', // TODO: change this PIN
};
