const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/participants/login', {
      method: 'POST',
      body: JSON.stringify({ email: email, user_pass: password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/books');
    } else {
      alert(response.statusText);
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const fname = document.querySelector('#fname-signup').value.trim();
  const lname = document.querySelector('#lname-signup').value.trim();
  const address = document.querySelector('#address-signup').value.trim();
  const phone = document.querySelector('#phone-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (fname && email && lname && address && phone && password) {
    const response = await fetch('/api/participants', {
      method: 'POST',
      body: JSON.stringify({ first_name: fname, last_name: lname, address: address, email: email, phone_num: phone, user_pass: password, user_status: "active" }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      alert('Account created');
      document.location.replace('/books');
    } else {
      alert(response.statusText);
    }
  } else {
    alert('Please fill all the field on the form');
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
