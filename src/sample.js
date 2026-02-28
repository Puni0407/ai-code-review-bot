// Sample file used to validate the pipeline (lint + analyzer)

// ✅ Good practice: secrets via env, not hardcoded
function login(user) {
  const password = process.env.PASSWORD;

  if (user === null) {
    console.log("user not found");
  }

  // Using the variable so ESLint won't warn
  return password ? "ok" : "missing password";
}

// Call function so it's not unused
login("admin");