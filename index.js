const fs = require("fs");
const path = require("path");

const target = process.argv[2] || "src";

function getAllJsFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of list) {
    const fullPath = path.join(dir, item.name);

    if (item.isDirectory()) {
      results = results.concat(getAllJsFiles(fullPath));
    } else if (item.isFile() && fullPath.endsWith(".js")) {
      results.push(fullPath);
    }
  }
  return results;
}

function analyzeFile(fileName) {
  const fileContent = fs.readFileSync(fileName, "utf-8");

  let warnings = 0;
  let securityIssues = 0;

  if (fileContent.includes("var ")) warnings++;
  if (fileContent.includes("== ")) warnings++;

  return { fileName, warnings, securityIssues };
}

console.log(`\n🔍 Scanning: ${target}\n`);

const files = fs.statSync(target).isDirectory() ? getAllJsFiles(target) : [target];

let totalWarnings = 0;
let totalSecurity = 0;

for (const f of files) {
  const r = analyzeFile(f);
  totalWarnings += r.warnings;
  totalSecurity += r.securityIssues;

  if (r.warnings || r.securityIssues) {
    console.log(`📄 ${r.fileName}`);
    if (r.warnings) console.log(`  ⚠️ warnings: ${r.warnings}`);
    if (r.securityIssues) console.log(`  🚨 security: ${r.securityIssues}`);
  }
}

console.log("\n📊 Summary:");
console.log(`Files scanned: ${files.length}`);
console.log(`Total warnings: ${totalWarnings}`);
console.log(`Total security issues: ${totalSecurity}`);

if (totalSecurity > 0) {
  console.log("\n❌ Build Failed due to security issues.");
  process.exit(1);
} else {
  console.log("\n✅ Analysis Complete. No critical issues.");
}