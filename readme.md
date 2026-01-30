# Microsoft Club Website

A modern, beginner-friendly website for the Microsoft Club built with React, Vite, and Tailwind CSS.

## 🚀 Features

- **Home Page** - Club introduction with upcoming events
- **About Page** - Mission, vision, and what we do
- **Events Page** - Upcoming and past events with filtering
- **Team Page** - Meet our amazing team members
- **Contact Page** - Get in touch and join the club
- **Responsive Design** - Works perfectly on all devices
- **Easy Content Management** - Update events and team via JSON files

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd micro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Build for Production

```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## 📁 Project Structure

```
micro/
├── public/              # Static assets
│   ├── posters/        # Event posters (add your images here)
│   └── team/           # Team member photos (add your images here)
├── src/
│   ├── components/     # Reusable components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── EventCard.jsx
│   │   └── TeamCard.jsx
│   ├── pages/         # Page components
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Events.jsx
│   │   ├── Team.jsx
│   │   └── Contact.jsx
│   ├── data/          # JSON data files
│   │   ├── events.json
│   │   └── team.json
│   ├── App.jsx        # Main app component
│   ├── main.jsx       # Entry point
│   └── index.css      # Global styles
└── package.json
```

## ✏️ How to Update Content

### Adding/Editing Events

Edit `src/data/events.json`:

```json
{
  "id": 1,
  "title": "Event Name",
  "date": "2026-02-15",
  "time": "2:00 PM - 5:00 PM",
  "location": "Computer Lab A",
  "description": "Event description...",
  "poster": "/posters/event-name.jpg",
  "status": "upcoming",
  "registrationLink": "https://forms.google.com/your-form"
}
```

### Adding/Editing Team Members

Edit `src/data/team.json`:

```json
{
  "id": 1,
  "name": "John Doe",
  "role": "President",
  "year": "3rd Year",
  "department": "Computer Science",
  "image": "/team/john-doe.jpg",
  "linkedin": "https://linkedin.com/in/johndoe",
  "github": "https://github.com/johndoe"
}
```

### Adding Images

1. **Event Posters**: Add to `public/posters/` folder
2. **Team Photos**: Add to `public/team/` folder
3. Update the corresponding JSON file with the correct path

### Updating Google Form

In `src/pages/Contact.jsx`, replace the placeholder div with your Google Form embed code.

## 🚀 Deployment on Vercel

### Option 1: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Vercel will auto-detect Vite and configure everything
6. Click "Deploy"

### Option 2: Deploy via Vercel CLI

```bash
npm install -g vercel
vercel
```

## 🎨 Customization

### Colors

Microsoft brand colors are defined in `tailwind.config.js`:

```javascript
colors: {
  'ms-blue': '#0078D4',
  'ms-green': '#107C10',
  'ms-purple': '#5C2D91',
  'ms-orange': '#D83B01',
}
```

### Styles

Global styles and utility classes are in `src/index.css`.

## 🤝 Contributing

This project is designed to be beginner-friendly. To contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/YourFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature/YourFeature`)
6. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 👥 Maintainers

- Microsoft Club Team

## 🆘 Need Help?

- Check the [React documentation](https://react.dev)
- Check the [Vite documentation](https://vitejs.dev)
- Check the [Tailwind CSS documentation](https://tailwindcss.com)
- Open an issue in the repository

---

Made with ❤️ by Microsoft Club
