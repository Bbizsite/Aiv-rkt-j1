
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Kun POST tilladt' })
  }

  const { prompt } = req.body

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt mangler' })
  }

  try {
    const chat = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'Du er en hjælpsom dansk AI-assistent.' },
        { role: 'user', content: prompt }
      ]
    })

    const result = chat.choices[0].message.content
    res.status(200).json({ result })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Noget gik galt med OpenAI' })
  }
}
