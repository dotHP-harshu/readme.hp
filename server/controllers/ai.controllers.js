const { formatError, formatResponse } = require("../utils/responseFormatter");
const { getChunks } = require("../utils/getChunks");
const { default: OpenAI } = require("openai");
const { SUMMARY_PROMPT, README_PROMPT } = require("../utils/prompts");


const client = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY
})

const getReadme = async (req, res) => {
  const { contentArray } = req.body

  if (!contentArray) {
    return res.send(formatError(null, "Codebase not found", 400))
  }
  try {
    const chunks = getChunks(contentArray)
    const summaries = []

    for (const chunk of chunks) {
      try {
        const apiResponse = await client.chat.completions.create({
          model: 'xiaomi/mimo-v2-flash:free',
          messages: [
            {
              role: 'user',
              content: `${SUMMARY_PROMPT}\n==CHUNK START==\n${chunk}\n==CHUNK END==`,
            },
          ],
          reasoning: { enabled: true }
        });
        summaries.push(apiResponse.choices[0].message.content)
      } catch (error) {
        return res.send(formatError(error, error.message || "Catched error in summarising chunking.", 400))
      }
    }

    const response = await client.chat.completions.create({
      model: 'xiaomi/mimo-v2-flash:free',
      messages: [
        {
          role: 'user',
          content: `${README_PROMPT}\n==SUMMARIES START==\n${summaries.join("\n")}\n==SUMMARIES END==`,
        },
      ],
      reasoning: { enabled: true }
    });

    const readme = response.choices[0].message.content

    return res.send(formatResponse(true, { readme }, "Get readme successfully."))
  }
  catch (error) {
    console.log(error)
    return res.send(formatError(error, error.message || "Catched error", 400))
  }

}

module.exports = { getReadme }