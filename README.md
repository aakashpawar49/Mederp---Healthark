# 🏥 MedERP – Intelligent Hospital Management System

**MedERP** is a next-generation Enterprise Resource Planning (ERP) system designed for hospitals and multi-specialty clinics. Unlike traditional legacy software, MedERP acts as the **Central Nervous System** of a healthcare facility, unifying clinical precision with operational excellence.

It features a **"Dual-Brain" AI Architecture** (Planned) to separate generic queries from secure, RAG-based clinical decision support.


## 🚀 Key Features

### 🏥 **Core Clinical Modules**
* **Patient Registration:** Enterprise-grade demographics capture with auto-calculation of Age and **Unique Health ID (UHID)** generation.
* **Doctor's Desk:** Real-time dashboard for doctors to search patients by UHID, view clinical history, and write digital prescriptions.
* **OPD Queue Management:** Token-based queue system to manage patient wait times efficiently.

### 💊 **Pharmacy & Inventory**
* **Smart Inventory:** Real-time stock tracking with Batch management.
* **FEFO Logic:** **First-Expired-First-Out** logic automatically prioritizes selling medicines closest to expiry to reduce waste.
* **Low Stock Alerts:** Dashboard warnings for items below minimum quantity.

### 🔬 **Diagnostics (Lab & Path)**
* **Order Management:** Doctors can order tests directly from their desk.
* **Report Versioning:** Audit trail for lab reports; if a result is changed, the old version is archived for compliance.

## 🛠️ Tech Stack

### **Backend (The Core)**
* **Framework:** [FastAPI](https://fastapi.tiangolo.com/) (Python 3.10+)
* **Database:** [MongoDB Atlas](https://www.mongodb.com/) (Cloud NoSQL)
* **ODM:** [Beanie](https://beanie-odm.dev/) (Asynchronous ODM for MongoDB)
* **Validation:** Pydantic V2

### **Frontend (The Interface)**
* **Framework:** React (Vite)
* **Styling:** Tailwind CSS + Lucide React (Icons)
* **HTTP Client:** Axios

### **AI & Deployment (Planned/In-Progress)**
* **AI Engine:** OpenAI / Ollama (Local Llama 3)
* **Vector Store:** MongoDB Atlas Vector Search
* **Deployment:** Vercel (Frontend & Serverless Backend)

## ⚙️ Installation & Setup

Follow these steps to run the system locally.

### **1. Prerequisites**
* Python 3.10+
* Node.js 18+
* MongoDB Atlas Connection String

### **2. Clone the Repository**
```bash
git clone [https://github.com/your-username/mederp.git](https://github.com/your-username/mederp.git)
cd mederp
```

### **3. Backend Setup**
```bash
# Navigate to backend folder (if separate, otherwise root)
cd app

# Install dependencies
pip install -r requirements.txt

# Create .env file
echo "MONGODB_URL=mongodb+srv://<your-db-url>" > .env
echo "OPENAI_API_KEY=sk-..." >> .env

# Run Server
uvicorn app.main:app --reload
````

### **4. Frontend Setup**
```bash
# Open a new terminal and navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=[http://127.0.0.1:8000](http://127.0.0.1:8000)" > .env

# Run React App
npm run dev
````

## Project Structure
<img width="566" height="267" alt="image" src="https://github.com/user-attachments/assets/007d99b8-030b-4d5c-95a6-02e61b09f3b8" />

Built with ❤️ for better Healthcare.
