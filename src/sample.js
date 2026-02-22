// Security Rule (better)
// Detect hardcoded secrets like: password = "123", token: 'abc', apiKey = "..."
const hardcodedSecretRegex =
  /\b(password|passwd|pwd|token|apikey|api_key|secret|access_key)\b\s*[:=]\s*["'][^"']{3,}["']/i;

if (hardcodedSecretRegex.test(fileContent)) {
  console.log("🚨 Security Issue: Possible hardcoded secret detected.");
  securityIssues++;
}
const password = process.env.PASSWORD;
function login(user) {
if(user === null ){
    console.log("user not found")
}
}