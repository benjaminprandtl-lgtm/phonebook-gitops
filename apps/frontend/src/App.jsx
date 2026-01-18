import { useEffect, useState } from "react";import "./App.css";

function App() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError("");

        
	const res = await fetch("/api/contacts");
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();
        setContacts(data);
      } catch (e) {
        setError(`Konnte Kontakte nicht laden: ${e.message}`);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", fontFamily: "system-ui" }}>
      <h1>Phone Book</h1>

      <p>
        Dieses Frontend lädt Kontakte über <code>/api/contacts</code> vom Backend.
      </p>

      {loading && <p>Lade...</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      {!loading && !error && (
        <ul>
          {contacts.map((c) => (
            <li key={c.id}>
              <strong>{c.name}</strong> — {c.phone}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

