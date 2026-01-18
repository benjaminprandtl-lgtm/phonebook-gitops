# 1) Basis: Wir nehmen ein offizielles Node.js Image.
# "20-alpine" ist klein (Alpine Linux) und schnell zu laden.
FROM node:20-alpine

# 2) Arbeitsverzeichnis im Container: Alle folgenden Befehle laufen relativ zu /app
WORKDIR /app

# 3) Wir kopieren zuerst nur package.json + package-lock.json.
# Warum? Docker kann dann "npm ci" cachen, solange sich diese Dateien nicht ändern.
COPY package*.json ./

# 4) Abhängigkeiten installieren.
# "npm ci" ist für CI/Produktion besser als "npm install", weil es exakt nach lockfile installiert.
RUN npm ci --omit=dev

# 5) Jetzt erst den eigentlichen Code kopieren.
COPY src ./src

# 6) Port dokumentieren (öffnen tut das später docker run -p).
EXPOSE 3001

# 7) Startbefehl: startet dein Backend.
CMD ["node", "src/index.js"]
