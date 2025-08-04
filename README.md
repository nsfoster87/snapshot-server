# 📸 Snapshot Server

A minimal Node + TypeScript + Express server for capturing, storing, and viewing image snapshots. Designed for use with canvas-based image viewers.

---

## 🚀 Features

- Accepts base64-encoded PNG snapshots via HTTP POST
- Stores the latest snapshot in memory
- Serves a simple HTML viewer to preview the latest image
- Supports modern ESM syntax with TypeScript
- Live development with `tsc --watch` + `nodemon`

---

## 📁 Project Structure

```
snapshot-server/
├── public/              # Static assets (HTML viewer)
│   └── snapshot.html
├── src/                 # TypeScript source
│   └── server.ts
├── dist/                # Compiled JavaScript output (ignored by Git)
├── tsconfig.json        # TypeScript configuration
├── package.json         # Project config & scripts
├── .gitignore
```

---

## 🛠️ Setup Instructions

### 1. Clone and install dependencies

```bash
git clone https://github.com/your-org/snapshot-server.git
cd snapshot-server
npm install
```

---

### 2. Start development server (hot reload)

Use two terminals:

**Terminal 1: Watch TypeScript**

```bash
npm run watch
```

**Terminal 2: Run the server**

```bash
npm run dev
```

Server will start at:  
📍 `http://localhost:3001`

---

## 📡 API Endpoints

### `POST /api/snapshot`

Store a new snapshot image.

```http
POST http://localhost:3001/api/snapshot
Content-Type: application/json
```

**Body:**

```json
{
  "image": "data:image/png;base64,..."
}
```

---

### `GET /api/latest-image`

Fetch the latest snapshot as a base64 image.

- Returns 404 if no image exists.

**Response:**

```json
{
  "image": "data:image/png;base64,..."
}
```

---

### `GET /snapshot/view`

Returns a lightweight HTML viewer that displays the most recent snapshot.  
Use this for quick visual confirmation of uploaded images.

---

## ⚙️ Build for production

```bash
npm run build
node dist/server.js
```

---

## 🧼 Notes

- Snapshots are stored **in memory only** — restarting the server clears the image.
- CORS is not configured; assume same-origin usage.
- This project is intentionally minimal for local testing and development pipelines.

---

## 🧾 License

MIT — use freely in testing environments or extend for production as needed.
