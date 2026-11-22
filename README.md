# 🚨 RESCUEFLOW AI
### Intelligent Emergency Response & Coordination System

<p align="center">
  <strong>Report Faster. Respond Smarter. Save Lives.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.10+-blue?logo=python" />
  <img src="https://img.shields.io/badge/Flask-Backend-black?logo=flask" />
  <img src="https://img.shields.io/badge/Database-SQLite-blue?logo=sqlite" />
  <img src="https://img.shields.io/badge/Map-OpenStreetMap-green" />
  <img src="https://img.shields.io/badge/Project-Educational%20Prototype-orange" />
</p>

---

## 🌍 About the Project

**RESCUEFLOW AI** is an emergency response coordination platform designed to simplify incident reporting, identify emergency priority levels, visualize incident locations, and recommend suitable rescue teams.

The platform provides a centralized dashboard where users can report simulated emergencies and monitor incidents through an interactive map and real-time dashboard updates.

Our goal is to demonstrate how technology can support faster and more organized emergency response coordination.

## ✨ Key Features

| Feature | Description |
|---|---|
| 📊 Smart Dashboard | Monitor total incidents and priority statistics |
| 🚨 Incident Reporting | Submit and manage emergency reports |
| 🧠 Priority Classification | Automatically classify incidents using keyword-based rules |
| 🗺️ Interactive Map | Visualize incident locations using OpenStreetMap |
| 📍 GPS Location | Select locations using browser geolocation |
| 👨‍🚒 Rescue Team Matching | Recommend teams based on incident type |
| 🔔 Notifications | Display recent incident notifications |
| 📈 Incident Analytics | Visualize incident categories and risk levels |
| 🗄️ Database Management | Store incident records using SQLite |

## 🖥️ Dashboard Preview

Add your actual dashboard screenshot here:

```text
docs/screenshots/dashboard.png
```

Once uploaded, display it using:

```markdown
![RESCUEFLOW AI Dashboard](docs/screenshots/dashboard.png)
```

## ⚙️ Technology Stack

**Frontend**
- HTML5
- CSS3
- JavaScript
- Leaflet.js

**Backend**
- Python
- Flask
- Flask-SQLAlchemy

**Database**
- SQLite

**Mapping**
- OpenStreetMap
- Leaflet

## 🏗️ Project Architecture

```text
RESCUEFLOW_AI/
│
├── app/
│   ├── models/
│   │   └── incident.py
│   │
│   ├── routes/
│   │   └── incidents.py
│   │
│   ├── services/
│   │   ├── priority_classifier.py
│   │   └── team_matcher.py
│   │
│   ├── extensions.py
│   └── __init__.py
│
├── static/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── script.js
│
├── templates/
│   └── dashboard/
│       └── index.html
│
├── data/
├── docs/
├── tests/
├── app.py
├── requirements.txt
├── README.md
└── .gitignore
```

## 🚀 Getting Started

Follow these steps to run RESCUEFLOW AI locally.

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Open the Project Folder

```bash
cd RESCUEFLOW_AI
```

### 3. Create a Virtual Environment

```bash
python -m venv .venv
```

### 4. Activate the Environment

**Windows PowerShell:**

```powershell
.\.venv\Scripts\Activate.ps1
```

### 5. Install Dependencies

```bash
pip install -r requirements.txt
```

### 6. Run the Application

```bash
python app.py
```

### 7. Open in Browser

```text
http://127.0.0.1:5000/
```

## 🔄 How It Works

1. User reports a simulated emergency.
2. User selects the incident location on the map.
3. The system stores incident information in SQLite.
4. A rule-based classifier determines the priority.
5. The dashboard updates incident statistics and notifications.
6. The system recommends a rescue team based on incident type.

## 🎯 Project Objectives

- Simplify emergency incident reporting.
- Demonstrate automated priority classification.
- Improve visibility of incident locations.
- Demonstrate skill-based rescue team recommendations.
- Provide centralized incident monitoring.

## 🔮 Future Enhancements

- 🤖 Machine-learning-based incident classification.
- 📱 Mobile application integration.
- 🛰️ Advanced location and geospatial analysis.
- 🔔 SMS and email notifications.
- 👥 User authentication and role management.
- 🚑 Live rescue team tracking.
- ☁️ Cloud database and deployment.

## 👨‍💻 Project Information

**Project Name:** RESCUEFLOW AI

**Category:** AI-Assisted Emergency Response Coordination

**Development:** Python + Flask

**Project Type:** Educational / Hackathon Prototype

## ⚠️ Disclaimer

RESCUEFLOW AI is an educational simulation prototype. It is not connected to official emergency services and must not be used for real emergency dispatch, medical decisions, or rescue operations.

## ⭐ Support

If you find this project interesting, consider giving the repository a ⭐ on GitHub.

<p align="center">
  <strong>RESCUEFLOW AI</strong><br/>
  Building Smarter Emergency Response Solutions.
</p>
