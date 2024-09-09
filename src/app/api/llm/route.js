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
        if (origin !== 'http://localhost:3000' && origin !== vercelUrl && origin != 'https://testifynotes-josephattallas-projects.vercel.app') {
            console.error("Invalid origin:", origin)
            return Response.json({ error: "Invalid origin" }, { status: 403 })
        }
    } catch (error) {
        console.error("Invalid origin:", origin)
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

    let result = []

    // Process Chunks if Needed
    const chunks = data.prompt.length > 15000 ? chunkText(data.prompt, 10000) : [data.prompt]

    try {
        await Promise.all(chunks.map(async (chunk) => {
            const response = await createCompletion(chunk)
            console.info("RESPONSE: ", response.choices[0].message.content)
            result.push(response.choices[0].message.content)
        }))
    } catch (error) {
        console.error("Error processing chunks:", error)
        return Response.json({ error: "Error processing chunks" }, { status: 500 })
    }

    // Parse Results
    try {
        let parsedResults = result.map((item) => JSON.parse(item).exam)
        parsedResults = parsedResults.flat()
        return Response.json(parsedResults)
    } catch (error) {
        console.error("Error parsing results:", error)
        return Response.json({ error: "Error parsing results" }, { status: 500 })
    }
}
