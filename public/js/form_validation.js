const signin_form = document.getElementById('sign-in-form');
const signup_form = document.getElementById('sign-up-form');


const username_signin = document.getElementById('username-signin');
const password_signin = document.getElementById('password-signin');
const username_signup = document.getElementById('username-signup');
const password_signup = document.getElementById('password-signup');
const email_signup = document.getElementById('email-signup');


const username_error_si = document.getElementById('username_error_si');
const password_error_si = document.getElementById('password_error_si');
const username_error_su = document.getElementById('username_error_su');
const password_error_su = document.getElementById('password_error_su');
const email_error_su = document.getElementById('email_error_su');

const sign_up_button = document.getElementById('sign-up-btn')
const sign_in_button = document.getElementById('sign-in-btn')

sign_up_button.addEventListener('click', () => {
  username_error_su.innerText = ''
  password_error_su.innerText = ''
  email_error_su.innerText = ''
  username_signup.value = ''
  password_signup.value = ''
  email_signup.value = ''

});
sign_in_button.addEventListener('click', () => {
  username_error_si.innerText = '';
  password_error_si.innerText = '';
  username_signin.value = ''
  password_signin.value = ''
});

