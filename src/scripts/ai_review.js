const fs = require("fs");
const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.GH_MODELS_TOKEN, // GitHub token (models:read)
  baseURL: "https://models.github.ai/inference", // IMPORTANT
});

async function main() {
  const diffPath = process.argv[2] || "diff.txt";
  const diff = fs.readFileSync(diffPath, "utf8");

  const prompt = `
You are a senior code reviewer.
Review the following PR diff and give:
- Summary (2-4 lines)
- Findings with severity [HIGH|MED|LOW]
- Suggested fixes
Diff:
${diff}
`;

  const res = await client.chat.completions.create({
    model: "openai/gpt-4o-mini", // or whichever model GitHub Models allows for you
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2,
  });

  console.log(res.choices[0].message.content);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});