import Groq from 'groq-sdk'
import { systemMessage } from '@/utils/systemMessage'
import { jsonSchema } from '@/utils/jsonSchema'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

// Function to Handle API Call
const createCompletion = async (content) => {
    return await groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: `${systemMessage}\n The JSON object must use the schema: ${jsonSchema}`,
            },
            {
                role: "user",
                content: `the lecture notes: ${content}`,
            },
        ],
        model: "llama-3.1-8b-instant",
        temperature: 0.1,
        stream: false,
        response_format: { type: "json_object" },
    })
}

export default createCompletion