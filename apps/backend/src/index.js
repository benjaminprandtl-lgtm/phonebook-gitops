const express = require("express");

const app = express();
const PORT = process.env.PORT || 3001;

/**
 * Middleware:
 * - app.use(express.json()) sorgt dafür, dass JSON im Request-Body automatisch gelesen wird.
 *   Beispiel: Wenn ein Client POST /api/contacts mit JSON sendet, kannst du es später in req.body auslesen.
 */
app.use(express.json());

/**
 * Health-Check Route:
 * Diese Route ist wichtig für Kubernetes/Monitoring.
 * Sie sagt: "Der Server lebt."
 */
app.get("/healthz", (req, res) => {
  res.status(200).json({ status: "ok" });
});

/**
 * Mini-Demo-API:
 * Wir starten mit einer In-Memory Liste (nur im RAM).
 * Später ersetzen wir das durch PostgreSQL.
 */
let contacts = [
  { id: 1, name: "Alice", phone: "+49 111 111" },
  { id: 2, name: "Bob", phone: "+49 222 222" },
];

app.get("/api/contacts", (req, res) => {
  res.json(contacts);
});

app.post("/api/contacts", (req, res) => {
  const { name, phone } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: "name and phone are required" });
  }

  const newContact = {
    id: Date.now(),
    name,
    phone,
  };

  contacts.push(newContact);
  res.status(201).json(newContact);
});

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
