// Where the weekly-letter form posts. Leave empty until an email provider is chosen;
// the form then tells visitors signups aren't open yet instead of pretending to work.
// Kit:        https://app.kit.com/forms/<FORM_ID>/subscriptions   (field: email_address)
// Buttondown: https://buttondown.com/api/emails/embed-subscribe/<USERNAME> (field: email)
// Beehiiv:    use the embed URL from your publication settings
export const SIGNUP = {
  endpoint: '',
  emailField: 'email',
};

// Drop a portrait into /public (e.g. /ben.jpg) and set its path here.
export const PORTRAIT = {
  src: '',
  alt: 'Ben Walther',
};
