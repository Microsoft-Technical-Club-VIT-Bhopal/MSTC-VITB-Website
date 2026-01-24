# Microsoft Club Website - Quick Start Guide

## ✅ Project Status: READY TO USE!

Your Microsoft Club website is fully set up and running at **http://localhost:5173**

## 📦 What's Included

### Pages (All Working!)
- ✅ **Home** - Club intro with upcoming events
- ✅ **About** - Mission, vision, and what we do
- ✅ **Events** - Filter between upcoming and past events
- ✅ **Team** - Display team members by role
- ✅ **Contact** - Contact info and join form placeholder

### Components (Reusable!)
- ✅ **Header** - Responsive navigation with mobile menu
- ✅ **Footer** - Links and social media
- ✅ **EventCard** - Display event details
- ✅ **TeamCard** - Display team member profiles

### Data Management (Easy Updates!)
- ✅ **events.json** - Add/edit events here
- ✅ **team.json** - Add/edit team members here

### Styling (Beautiful!)
- ✅ Microsoft brand colors configured
- ✅ Tailwind CSS utility classes
- ✅ Fully responsive design
- ✅ Smooth animations and hover effects

## 🚀 Next Steps for Your Team

### 1. Update Content (5 minutes)

**Add Real Events:**
```
1. Open src/data/events.json
2. Edit the sample events with your actual events
3. Save - the page updates instantly!
```

**Add Real Team Members:**
```
1. Open src/data/team.json
2. Edit with your actual team members
3. Update social media links
4. Save - see changes live!
```

### 2. Add Images (10 minutes)

**Event Posters:**
- Add poster images to `public/posters/` folder
- Update the `poster` field in events.json
- Recommended size: 1200x800px

**Team Photos:**
- Add photos to `public/team/` folder
- Update the `image` field in team.json
- Recommended size: 500x500px (square)

### 3. Customize Google Form (5 minutes)

```
1. Create a Google Form for joining the club
2. Get the embed code (Send → Embed HTML)
3. Open src/pages/Contact.jsx
4. Replace the placeholder div with your iframe
```

### 4. Deploy to Vercel (10 minutes)

**Method 1: GitHub + Vercel (Recommended)**
```bash
# Push to GitHub
git add .
git commit -m "Initial Microsoft Club website"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main

# Then on vercel.com:
1. Click "Import Project"
2. Select your GitHub repository
3. Click "Deploy" (Vercel auto-detects Vite!)
4. Your site is live in ~1 minute!
```

**Method 2: Vercel CLI**
```bash
npm install -g vercel
vercel
```

## 📝 Common Tasks

### Adding a New Event
1. Open `src/data/events.json`
2. Copy an existing event object
3. Update the details (title, date, location, etc.)
4. Add poster image to `public/posters/`
5. Set status to "upcoming" or "past"

### Adding a New Team Member
1. Open `src/data/team.json`
2. Copy an existing member object
3. Update name, role, department, etc.
4. Add photo to `public/team/`
5. Update social media links

### Changing Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  'ms-blue': '#0078D4',    // Your custom blue
  'ms-green': '#107C10',   // Your custom green
  'ms-purple': '#5C2D91',  // Your custom purple
  'ms-orange': '#D83B01',  // Your custom orange
}
```

### Stopping the Dev Server
In the terminal: Press `Ctrl + C`

### Starting the Dev Server Again
```bash
npm run dev
```

### Building for Production
```bash
npm run build
```

## 🛠️ Development Commands

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start development server (with hot reload) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |

## 📚 Documentation Links

- **React**: https://react.dev
- **Vite**: https://vitejs.dev
- **Tailwind CSS**: https://tailwindcss.com
- **React Router**: https://reactrouter.com

## 🆘 Troubleshooting

**Server won't start?**
```bash
npm install
npm run dev
```

**Changes not showing?**
- Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
- Check if dev server is running
- Check browser console for errors

**Build errors?**
```bash
npm install
npm run build
```

## 👥 For Contributors

Read [CONTRIBUTING.md](CONTRIBUTING.md) for:
- How to contribute
- Code standards
- Pull request process

## 🎉 You're All Set!

Your website is production-ready. Just:
1. ✅ Update the content (JSON files)
2. ✅ Add your images
3. ✅ Deploy to Vercel
4. ✅ Share with the world!

**Need help?** Check README.md or ask your club's tech team.

---

**Built with ❤️ for Microsoft Club students**
