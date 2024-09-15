import chunkText from '@/utils/chunkText'
import { headers } from 'next/headers'
import createCompletion from './createCompletion'

export const maxDuration = 60   // set max duration of request 

export async function POST(req) {
    // Validate Origin
    try {
        const headersList = headers()
        const origin = headersList.get('origin')
        const vercelUrl = `https://${process.env.VERCEL_URL}`
        if (origin !== 'http://localhost:3000' && origin !== vercelUrl && origin !== 'https://testifynotes-josephattallas-projects.vercel.app') {
            console.error("Invalid origin:", origin)
            return Response.json({ error: "Invalid origin" }, { status: 403 })
        }
    } catch (error) {
        console.error("Error checking origin:", error)
        return Response.json({ error: "Error checking origin" }, { status: 403 })
    }

    // Validate Request Body
    let data = null
    try {
        data = await req.json()
    } catch (error) {
        console.error("Invalid request body:", error)
        return Response.json({ error: "Invalid request" }, { status: 400 })
    }

    let results = []

    // Process Chunks if Needed
    const chunks = data.prompt.length > 15000 ? chunkText(data.prompt, 15000) : [data.prompt]

    await Promise.all(chunks.map(async (chunk) => {
        try {
            const response = await createCompletion(chunk)
            console.info("RESPONSE: ", response.choices[0].message.content)
            results.push(response.choices[0].message.content)
        } catch (error) {
            console.error("Error processing chunk:", error)
            if (error.status === 429) {
                return Response.json({ error: "Rate limit exceeded" }, { status: 429 })
            }
        }
    }))

    // Parse Results
    let parsedResults = []
    try {
        parsedResults = results.map((item) => {
            try {
                return JSON.parse(item).exam
            } catch (error) {
                console.error("Error parsing individual result:", error)
                return null
            }
        }).filter((result) => result !== null)  // Filter out any null results
        parsedResults = parsedResults.flat()
    } catch (error) {
        console.error("Error parsing results:", error)
        return Response.json({ error: "Error parsing question results" }, { status: 500 })
    }

    return Response.json(parsedResults)
}

