
import { useState } from 'react'

export default function Home() {
  const [tool, setTool] = useState('writer')
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!input) return
    setLoading(true)
    setResult('')

    let prompt = ''
    if (tool === 'writer') prompt = `Skriv en tekst ud fra dette: ${input}`
    if (tool === 'translator') prompt = `Oversæt dette til engelsk: ${input}`
    if (tool === 'summary') prompt = `Opsummer denne tekst kort: ${input}`

    const res = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    })

    const data = await res.json()
    setResult(data.result)
    setLoading(false)
  }

  return (
    <main style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1 style={{ fontWeight: 'bold', fontSize: '1.5rem', marginBottom: 20 }}>🧠 AI Værktøjskasse</h1>

      <div style={{ marginBottom: 20 }}>
        <label>
          <input
            type="radio"
            name="tool"
            value="writer"
            checked={tool === 'writer'}
            onChange={() => setTool('writer')}
          />
          ✍️ Skriv tekst
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="tool"
            value="translator"
            checked={tool === 'translator'}
            onChange={() => setTool('translator')}
          />
          🌍 Oversæt til engelsk
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="tool"
            value="summary"
            checked={tool === 'summary'}
            onChange={() => setTool('summary')}
          />
          📝 Opsummer tekst
        </label>
      </div>

      <textarea
        rows={6}
        style={{ width: '100%', marginBottom: 10 }}
        placeholder="Skriv her..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Arbejder...' : 'Kør AI'}
      </button>

      {result && (
        <div style={{ whiteSpace: 'pre-wrap', marginTop: 20, padding: 10, border: '1px solid #ccc' }}>
          <h2>🔎 Resultat:</h2>
          {result}
        </div>
      )}
    </main>
  )
}
