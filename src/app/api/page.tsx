export default function ApiLandingPage() {
  return (
    <div className="font-sans min-h-screen px-4 py-8 sm:px-8 sm:py-20">
      <main className="w-full max-w-3xl mx-auto flex flex-col gap-6">
        <h1 className="text-3xl font-semibold">API</h1>

        <section>
          <h2 className="text-xl font-medium">/api/clicks</h2>
          <p className="text-sm text-muted-foreground mt-2">
            A minimal API for a single global click counter. It supports GET to
            read the current count and POST to increment the count by one.
          </p>

          <h3 className="mt-4 font-semibold">GET</h3>
          <p className="text-sm text-muted-foreground">
            Request: GET /api/clicks
          </p>
          <p className="text-sm mt-1">Response (200):</p>
          <pre className="font-mono bg-slate-900 text-slate-100 p-3 rounded-md text-sm overflow-auto shadow-sm border border-slate-800">{`{ "count": 42 }`}</pre>

          <h3 className="mt-4 font-semibold">POST</h3>
          <p className="text-sm text-muted-foreground">
            Request: POST /api/clicks
          </p>
          <p className="text-sm mt-1">Body (application/json):</p>
          <pre className="font-mono bg-slate-900 text-slate-100 p-3 rounded-md text-sm overflow-auto shadow-sm border border-slate-800">{`{ "action": "Increment-Count" }`}</pre>
          <p className="text-sm mt-1">Response (200):</p>
          <pre className="font-mono bg-slate-900 text-slate-100 p-3 rounded-md text-sm overflow-auto shadow-sm border border-slate-800">{`{ "count": 43 }`}</pre>

          <p className="text-sm text-muted-foreground mt-3">
            Invalid requests will return a 400 with an error object, for
            example: {`{"error":"invalid action"}`}
          </p>

          <h4 className="mt-4 font-semibold">Example fetch</h4>
          <pre className="font-mono bg-slate-900 text-slate-100 p-3 rounded-md text-sm overflow-auto shadow-sm border border-slate-800">{`// read
fetch('/api/clicks')
  .then(r => r.json())
  .then(data => console.log(data.count))

// increment
fetch('/api/clicks', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ action: 'Increment-Count' }),
})
  .then(r => r.json())
  .then(data => console.log(data.count));`}</pre>
        </section>
      </main>
    </div>
  );
}
