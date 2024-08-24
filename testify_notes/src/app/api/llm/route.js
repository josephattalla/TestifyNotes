import Groq from 'groq-sdk'
import { systemMessage } from '@/utils/systemMessage'
import { jsonSchema } from '@/utils/jsonSchema'
import chunkText from '@/utils/chunkText'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(req) {
  const data = await req.json()
  let result = []

  // CHUNK REQUEST IF PROMPT LENGTH IS TOO LONG
  if (data.prompt.length > 15000) {
      console.log("Prompt length: ", data.prompt.length)

      const chunks = chunkText(data.prompt, 10000) 

      for (let i = 0; i < chunks.length; i++) {
          const chunk = chunks[i]
          try {
              const response = await groq.chat.completions.create({
                  messages: [
                      {
                          role: "system",
                          content: `${systemMessage}\n The JSON object must use the schema: ${jsonSchema}`,
                      },
                      {
                          role: "user",
                          content: `the lecture notes: ${chunk}`, // Pass the chunk here
                      }
                  ],
                  model: "llama3-8b-8192",
                  temperature: 0.1,
                  stream: false,
                  response_format: { type: "json_object" },
              })
              console.log("RESPONSE: ", response.choices[0].message.content)
              result.push(response.choices[0].message.content)
          } 
          catch (error) {
              console.error("Error processing chunk:", error)
              return Response.error(error)
          }
      }
  } 
  else {
      try {
          const response = await groq.chat.completions.create({
              messages: [
                  {
                      role: "system",
                      content: `${systemMessage}\n The JSON object must use the schema: ${jsonSchema}`,
                  },
                  {
                      role: "user",
                      content: `the lecture notes: ${data.prompt}`, 
                  }
              ],
              model: "llama3-8b-8192",
              temperature: 0.1,
              stream: false,
              response_format: { type: "json_object" },
          })
          console.log("RESPONSE: ", response.choices[0].message.content)
          result.push(response.choices[0].message.content) 
      } 
      catch (error) {
          console.error("Error processing request:", error)
          return Response.error(error)
      }
  }

  // RETURN EXAM QUESTIONS IN ARRAY
  let parsedResults = result.map((item) => JSON.parse(item))
  parsedResults = parsedResults.map((item) => item.exam)
  parsedResults = parsedResults.flat()

  return Response.json(parsedResults)
}