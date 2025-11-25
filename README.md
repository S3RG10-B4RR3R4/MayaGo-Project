# 🗿 MayaGo - Technical Documentation

<div align="center">

![MayaGo](https://img.shields.io/badge/MayaGo-Authentic_Experiences-00D9FF?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.9+-blue?style=for-the-badge&logo=python)
![Flask](https://img.shields.io/badge/Flask-3.0-black?style=for-the-badge&logo=flask)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A collaborative economy platform connecting travelers with authentic Mayan experiences**

[📖 Full Documentation](./docs/PROJECT_DOCUMENTATION.md) • [🎥 Live Demo](#running-the-project) • [👥 Team](#team)

</div>

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Running the Project](#running-the-project)
- [Development](#development)
- [Deployment](#deployment)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [Team](#team)
- [License](#license)

---

## 🎯 About the Project

**MayaGo** is a digital tourism platform designed to connect international travelers directly with local experience providers in the Yucatan Peninsula. This project was developed as part of the **Digital Economy** course, demonstrating how technology transforms traditional tourism through collaborative economy models.

### Project Objectives
- Design a viable digital business model
- Apply collaborative economy principles
- Demonstrate value creation through technology
- Generate positive social and economic impact

### Key Highlights
- 🌐 Two-sided marketplace platform
- 💳 Integrated payment processing
- 🔍 Advanced search and filtering
- 📱 Mobile-responsive design
- 🌍 Multi-language support
- ⭐ Review and rating system

---

## ✨ Features

### For Travelers
- 🔎 **Discover Experiences**: Browse authentic local activities and tours
- 📅 **Easy Booking**: Real-time availability and instant confirmation
- 💰 **Secure Payments**: Integrated payment gateway with multiple currencies
- ⭐ **Reviews & Ratings**: Community-driven quality assurance
- 💬 **Direct Messaging**: Communicate with providers before booking

### For Local Providers
- 📊 **Provider Dashboard**: Manage bookings, calendar, and earnings
- 📈 **Analytics**: Track performance and customer insights
- 🖼️ **Professional Profiles**: Showcase experiences with photos and descriptions
- 💵 **Automated Payouts**: Receive payments securely and on time
- 🎓 **Support & Training**: Resources to optimize listings

### Platform Features
- 🗺️ **Interactive Map**: Explore experiences by location
- 🔐 **User Authentication**: Secure login and registration
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- 🌐 **Internationalization**: Multi-language interface
- 🎨 **Modern UI**: Apple-inspired dark theme design

---

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Flexbox/Grid
- **JavaScript (Vanilla)** - Interactive functionality
- **Tabler Icons** - Beautiful icon set
- **Google Fonts (Inter)** - Clean typography

### Backend
- **Python 3.9+** - Core language
- **Flask 3.0** - Web framework
- **Jinja2** - Template engine
- **Werkzeug** - WSGI utilities

### Data Storage
- **JSON Files** - Demo data storage
- *(Production would use PostgreSQL)*

### External Services (Demo)
- **Stripe** - Payment processing (sandbox mode)
- **Google Maps API** - Location services (mock)

---

## 📁 Project Structure

```
mayago-project/
│
├── README.md                          # This file (technical documentation)
├── requirements.txt                   # Python dependencies
├── .gitignore                        # Git ignore rules
│
├── docs/                             # Academic documentation
│   ├── PROJECT_DOCUMENTATION.md      # Full project documentation (PDF replacement)
│   ├── PRESENTATION.md               # Presentation summary
│   └── diagrams/                     # Visual diagrams
│       ├── business-model-canvas.md
│       ├── system-architecture.md
│       └── user-flow.md
│
├── web/                              # Flask application
│   ├── app.py                        # Main application entry point
│   ├── config.py                     # Configuration settings
│   │
│   ├── static/                       # Static assets
│   │   ├── css/
│   │   │   ├── presentation.css      # Presentation page styles
│   │   │   └── demo.css              # Demo app styles
│   │   ├── js/
│   │   │   ├── presentation.js       # Presentation interactions
│   │   │   └── demo.js               # Demo app logic
│   │   └── images/                   # Image assets
│   │       ├── hero/
│   │       ├── features/
│   │       └── demo/
│   │
│   └── templates/                    # HTML templates
│       ├── base.html                 # Base template
│       ├── index.html                # Landing/presentation page
│       ├── demo.html                 # Interactive demo
│       └── components/               # Reusable components
│           ├── navbar.html
│           └── footer.html
│
└── data/                             # Sample data for demo
    ├── experiences.json              # Experience listings
    ├── users.json                    # User profiles
    └── bookings.json                 # Booking records
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.9 or higher** - [Download here](https://www.python.org/downloads/)
- **pip** - Python package installer (comes with Python)
- **Git** - [Download here](https://git-scm.com/downloads)
- **A code editor** - VS Code, Sublime Text, or your preferred editor

### Installation

#### 1. Clone the Repository

```bash
# Clone the repo
git clone https://github.com/yourusername/mayago-project.git

# Navigate to project directory
cd mayago-project
```

#### 2. Create Virtual Environment

```bash
# Create virtual environment
python3 -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate

# On Windows:
venv\Scripts\activate
```

#### 3. Install Dependencies

```bash
# Install all required packages
pip install -r requirements.txt

# Verify installation
pip list
```

You should see Flask, Werkzeug, Jinja2, and other dependencies listed.

#### 4. Verify Project Structure

```bash
# Check all files are present
ls -la

# You should see:
# - web/ folder
# - data/ folder
# - docs/ folder
# - README.md
# - requirements.txt
```

---

## 🎬 Running the Project

### Quick Start

```bash
# Make sure you're in the project root directory
cd mayago-project

# Activate virtual environment (if not already active)
source venv/bin/activate  # macOS/Linux
# or
venv\Scripts\activate     # Windows

# Navigate to web directory
cd web

# Run the Flask application
python app.py
```

You should see output like:
```
 * Running on http://127.0.0.1:5000
 * Debug mode: on
```

### Access the Application

Open your browser and navigate to:

- **Presentation Page**: http://localhost:5000/
- **Interactive Demo**: http://localhost:5000/demo

### Stopping the Server

Press `CTRL + C` in the terminal to stop the Flask server.

---

## 💻 Development

### Development Mode

The application runs in debug mode by default, which provides:
- Auto-reload on code changes
- Detailed error messages
- Interactive debugger

### Project Components

#### 1. **Presentation Site** (`/`)
- Landing page showcasing the platform
- Features, benefits, and value proposition
- Modern Apple-inspired design
- Dark theme with smooth animations

#### 2. **Interactive Demo** (`/demo`)
- Functional prototype of the platform
- Browse experiences
- Filter and search
- View details and mock booking flow
- Provider dashboard simulation

### Modifying the Project

#### Update Styles
Edit CSS files in `web/static/css/`:
```bash
# Presentation styles
nano web/static/css/presentation.css

# Demo styles
nano web/static/css/demo.css
```

#### Update Content
Edit HTML templates in `web/templates/`:
```bash
# Main presentation page
nano web/templates/index.html

# Demo page
nano web/templates/demo.html
```

#### Update Data
Edit JSON files in `data/`:
```bash
# Add new experiences
nano data/experiences.json

# Modify users
nano data/users.json
```

#### Update Logic
Edit Python files in `web/`:
```bash
# Main application
nano web/app.py

# Configuration
nano web/config.py
```

### Adding New Features

1. **Add Route** in `app.py`:
```python
@app.route('/new-feature')
def new_feature():
    return render_template('new_feature.html')
```

2. **Create Template** in `templates/`:
```bash
touch web/templates/new_feature.html
```

3. **Add Styles** in `static/css/`:
```bash
echo "/* New feature styles */" >> web/static/css/demo.css
```

---

## 🚀 Deployment

### Local Network Access

To access the app from other devices on your network:

```bash
# Run Flask with host binding
python app.py --host=0.0.0.0
```

Then access via: `http://YOUR_LOCAL_IP:5000`

### Production Deployment

#### Option 1: Heroku
```bash
# Install Heroku CLI
# Login
heroku login

# Create app
heroku create mayago-app

# Deploy
git push heroku main
```

#### Option 2: DigitalOcean / AWS / GCP
- Use Gunicorn as WSGI server
- Configure Nginx as reverse proxy
- Set up SSL certificate
- Use PostgreSQL instead of JSON files

#### Option 3: Vercel / Netlify (Frontend only)
- Deploy static presentation page
- Backend would need separate hosting

---

## 📚 Documentation

### Full Project Documentation

For complete academic documentation including:
- Business model analysis
- Market research
- Revenue projections
- Social impact assessment
- Technical architecture

**See**: [`docs/PROJECT_DOCUMENTATION.md`](./docs/PROJECT_DOCUMENTATION.md)

### Presentation Materials

For presentation slides and talking points:

**See**: [`docs/PRESENTATION.md`](./docs/PRESENTATION.md)

### Diagrams

Visual representations of:
- Business Model Canvas
- System Architecture
- User Flow

**See**: [`docs/diagrams/`](./docs/diagrams/)

---

## 🤝 Contributing

This is an academic project, but contributions are welcome!

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- Follow PEP 8 for Python code
- Use semantic HTML5
- Write descriptive commit messages
- Comment complex logic
- Test before committing

---

## 👥 Team

**Digital Economy Project - Universidad Politecnica de Yucatán**

- **Sergio Barrera**
  - GitHub: https://github.com/S3RG10-B4RR3R4
    
- **[Team Member 2]**
  - GitHub: [@username2](https://github.com/username2)

- **[Team Member 3]** 
  - GitHub: [@username3](https://github.com/username3)

**Instructor**: Sarah Jeannette Carrillo Ruiz  
**Course**: Digital Economy  
**Institution**: Universidad Politecnica de Yucatán 
**Date**: November 2024

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Yucatan Tourism Board** - Market insights and data
- **Local Experience Providers** - Inspiration and validation
- **Course Instructor** - Guidance and feedback
- **Tabler Icons** - Beautiful icon set
- **Flask Community** - Excellent documentation

---

## 📞 Contact & Support

- **Project Website**: [mayago-demo.com](http://localhost:5000)
- **Documentation**: [Full Docs](./docs/PROJECT_DOCUMENTATION.md)
- **Issues**: [GitHub Issues](https://github.com/yourusername/mayago-project/issues)
- **Email**: team@mayago-project.com

---

## 🗺️ Roadmap

### ✅ Phase 1 (Completed)
- [x] Project structure and setup
- [x] Documentation and business model
- [x] Presentation website
- [x] Interactive demo

### 🚧 Phase 2 (Future)
- [ ] User authentication system
- [ ] Real database integration (PostgreSQL)
- [ ] Payment gateway integration (Stripe)
- [ ] Email notifications
- [ ] Advanced search filters

### 🔮 Phase 3 (Vision)
- [ ] Mobile app (iOS/Android)
- [ ] AI-powered recommendations
- [ ] Real-time chat
- [ ] Multi-language support
- [ ] Analytics dashboard

---

<div align="center">

**Built with ❤️ for the Mayan communities of Yucatan**

*"Connecting cultures, one experience at a time"*

[⬆ Back to top](#-mayago---technical-documentation)

</div>
