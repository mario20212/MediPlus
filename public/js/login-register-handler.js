


$(document).ready(() => {
  $('#sign-in-form').submit((event) => {
    event.preventDefault();

    $('#email_error_si').text('');
    $('#password_error_si').text('');

    const email = $('#email-signin').val();
    const password = $('#password-signin').val();

    let email_err = '';
    let pass_err = '';

    if (email === '' || email === null) {
      email_err = 'Email is required';
    }

    if (password === '') {
      pass_err = 'Password is required';
    } else if (password === 'password') {
      pass_err = "Password cannot be 'password'";
    } else if (password.length < 6) {
      pass_err = 'Password cannot be less than 6 characters';
    } else if (password.length > 20) {
      pass_err = 'Password cannot be more than 20 characters';
    }

    $('#email_error_si').text(email_err);
    $('#password_error_si').text(pass_err);

    if (email_err.length === 0 && pass_err.length === 0) {
      const loginData = {
        email: email,
        password: password,
      };

      $.ajax({
        type: 'POST',
        url: '/signinup/login',
        data: loginData,
        success: (response) => {
          if (response.success !== "true") {
            $('#password_error_si').text(response.success);
          } else {
            sessionStorage.setItem('ongo', response.success);
            sessionStorage.setItem('username', response.data.username);
            sessionStorage.setItem('email', response.data.email);
            sessionStorage.setItem('id', response.data.user_id);
            if(response.data.isAdmin === 1){
              sessionStorage.setItem('isAdmin', true);
            } else{
              sessionStorage.setItem('isAdmin', false);
            }
            window.location.replace('/');
          }
        },
      });
    }
  });
});























$('#sign-up-form').submit((event) => {
  event.preventDefault();

  $('#username_error_su').text('');
  $('#password_error_su').text('');
  $('#email_error_su').text('');

  const username = $('#username-signup').val();
  const password = $('#password-signup').val();
  const email = $('#email-signup').val();
  const isAdmin = $('#cb1-6').is(':checked') ? 1 : 0;
  console.log(isAdmin)

  let user_err = '';
  let pass_err = '';
  let email_err = '';

  if (username === '' || username === null) {
    user_err = 'Username is required';
  }

  if (password === '') {
    pass_err = 'Password is required';
  } else if (password === 'password') {
    pass_err = "Password cannot be 'password'";
  } else if (password.length < 6) {
    pass_err = 'Password cannot be less than 6 characters';
  } else if (password.length > 20) {
    pass_err = 'Password cannot be more than 20 characters';
  }

  if (email === '' || email === null) {
    email_err = 'Email is required';
  } else {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailRegex.test(email)) {
      email_err = 'Invalid email format';
    }
  }

  $('#username_error_su').text(user_err);
  $('#password_error_su').text(pass_err);
  $('#email_error_su').text(email_err);

  if (user_err.length === 0 && pass_err.length === 0 && email_err.length === 0) {
    const signupData = {
      username: username,
      password: password,
      email: email,
      isAdmin: isAdmin,
    };

    $.ajax({
      type: 'POST',
      url: '/signinup/register',
      data: signupData,
      success: (response) => {
        if (response.success !== "true") {
          $('#password_error_su').text(response.success);
        } else {
          // Check if response.data.user is defined before accessing properties
          if (response.data.user && response.data.user.username) {
            sessionStorage.setItem('ongo', response.success);
            sessionStorage.setItem('username', response.data.user.username);
            console.log(response.data.user.username)
            sessionStorage.setItem('email', response.data.user.email);
    
            if (response.data.isAdmin) {
              sessionStorage.setItem('isAdmin', 'true');
            }
            window.location.replace('/');
          } else {
            console.error('User or username is undefined in the response data');
          }
        }
      },
    });
    
  }
});

  