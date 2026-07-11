#  Smart CRM Importer

An AI-powered CSV Importer that intelligently extracts CRM lead information from CSV files with different structures and converts them into the GrowEasy CRM format using Google's Gemini AI.

Built as part of the GrowEasy Software Developer Internship Assignment.

---

## Live Demo

### Frontend
https://smart-crm-importer-six.vercel.app

### Backend API
https://smart-crm-importer-ujcd.onrender.com

---

#  Features

- AI-powered CSV field mapping using Gemini AI
- Supports CSVs with different column names and layouts
- Drag & Drop CSV upload
- CSV Preview before importing
- Responsive UI
- Sticky table headers
- Batch AI processing
- Import statistics
- Success & error handling
- Loading indicators
- Empty state UI
- Clean TypeScript architecture

---

# 🛠 Tech Stack

## Frontend

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Axios
- React Dropzone

## Backend

- Node.js
- Express.js
- TypeScript
- Multer
- PapaParse
- Google Gemini AI

---

# Project Structure

```
Smart-CRM-Importer
│
├── client
│   ├── src
|   |___ app
│   ├── components
│   ├── services
│   ├── hooks
│   └── types
|   |__ lib
│
├── Server
│   ├── controllers
│   ├── routes
│   ├── services
│   ├── middleware
│   ├── config
│   └── utils
|   └── types
|   └── uploads
│   └── app.ts
|   └── index.ts
└── test_csv
```

---

# Setup

## Clone Repository

```bash
git clone https://github.com/Ayaan-shakeel/Smart-CRM-Importer.git
```

## Backend

```bash
cd Server
npm install
```

Create a `.env` file:

```env
PORT=8080
GEMINI_API_KEY=YOUR_API_KEY
```

Run backend

```bash
npm run dev
```

---

## Frontend

```bash
cd client
npm install
```

Create `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

Run

```bash
npm run dev
```

---

# API

## Upload CSV

```
POST /api/upload
```

Request:

```
multipart/form-data
```

Field

```
file
```

Response

```json
{
  "success": true,
  "totalImported": 10,
  "totalSkipped": 2,
  "records": []
}
```

---

# AI Extraction

Gemini AI intelligently maps CSV fields into the following CRM schema:

- created_at
- name
- email
- country_code
- mobile_without_country_code
- company
- city
- state
- country
- lead_owner
- crm_status
- crm_note
- data_source
- possession_time
- description

The application supports messy CSVs with different column names and automatically extracts the most relevant CRM fields.

---


#  Tested Scenarios

- Standard CSV
- Facebook Lead Export
- Google Ads Export
- Email Only
- Phone Only
- Extra Columns
- Random Column Order
- Empty CSV
- Invalid File
- Large CSV
- Missing Contact Records

---

# Future Improvements

- Progress Bar
- Retry Failed AI Requests
- Virtualized Tables
- Authentication
- Database Support
- Docker Deployment
- Unit Testing
- Dark Mode

---

# Author

**Ayyan Shakeel**

GitHub

https://github.com/Ayaan-shakeel

---

Built with using Next.js, Express.js, Gemini AI and Tailwind CSS.