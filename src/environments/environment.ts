export const environment = {
  production: false,

  // EmailJS setup — create a free account at https://www.emailjs.com/
  // Connect Gmail as the email service, then create a template with two
  // variables: `button_clicked` and `timestamp`.
  emailjs: {
    publicKey: 'YOUR_EMAILJS_PUBLIC_KEY', // TODO: fill in EmailJS public key
    serviceId: 'YOUR_EMAILJS_SERVICE_ID', // TODO: fill in EmailJS service ID
    templateId: 'YOUR_EMAILJS_TEMPLATE_ID', // TODO: fill in EmailJS template ID
  },

  // Hidden /ilovelips admin page PIN gate (not real security, just a casual
  // deterrent against accidental discovery). Change this to whatever you like.
  adminPin: '2580', // TODO: change this PIN
};
