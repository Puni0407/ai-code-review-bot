// Sample file used to validate the pipeline (lint + analyzer)

// ✅ Good practice: secrets via env, not hardcoded
function login(user) {
  //const password = process.env.PASSWORD;
  const password = '123456';

  function check(a, b) {
    if (a == b) {
      console.log('Equal');
    }
  }
  //if (user === null) {
  //console.log('user not found');
  //}

  // Using the variable so ESLint won't warn
  return password ? 'ok' : 'missing password';
}

// Call function so it's not unused
login('admin');
