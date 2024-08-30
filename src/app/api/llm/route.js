import Groq from 'groq-sdk';
import { systemMessage } from '@/utils/systemMessage';
import { jsonSchema } from '@/utils/jsonSchema';
import chunkText from '@/utils/chunkText';
import { headers } from 'next/headers';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req) {
    // Validate Origin
    try {
        const headersList = headers();
        const origin = headersList.get('origin')
		const vercelUrl = `https://${process.env.VERCEL_URL}`
		console.log(vercelUrl + '\n' + origin);
        if (origin !== 'http://localhost:3000' && origin !== 'https://' + process.env.VERCEL_URL) {
            return Response.json({ error: "Invalid origin" }, { status: 403 });
        }
    } catch (error) {
        console.error("Error checking origin:", error);
        return Response.json({ error: "Error checking origin" }, { status: 403 });
    }

    // Validate Request Body
    let data = null;
    try {
        data = await req.json();
    } catch (error) {
        console.error("Invalid request body:", error);
        return Response.json({ error: "Invalid request" }, { status: 400 });
    }

    let result = [];

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
            model: "llama3-8b-8192",
            temperature: 0.1,
            stream: false,
            response_format: { type: "json_object" },
        });
    };

    // Process Chunks if Needed
    const chunks = data.prompt.length > 15000 ? chunkText(data.prompt, 10000) : [data.prompt];

    for (let chunk of chunks) {
        try {
            const response = await createCompletion(chunk);
            console.log("RESPONSE: ", response.choices[0].message.content);
            result.push(response.choices[0].message.content);
        } catch (error) {
            console.error("Error processing chunk:", error);
            return Response.json({ error: "Error processing chunk" }, { status: 500 });
        }
    }

    // Parse Results
    try {
        let parsedResults = result.map((item) => JSON.parse(item).exam);
        parsedResults = parsedResults.flat();
        return Response.json(parsedResults);
    } catch (error) {
        console.error("Error parsing results:", error);
        return Response.json({ error: "Error parsing results" }, { status: 500 });
    }
}
