# Harshita Nagesh Portfolio

A modern, interactive portfolio website showcasing my skills, projects, and experiences as a software developer.

## 🚀 Features

- **Responsive Design**: Fully responsive layout that works seamlessly across all devices
- **Dark/Light Theme**: Toggle between dark and light themes with smooth transitions
- **Interactive Components**: Built with modern React components and animations
- **Contact Form**: Integrated contact form with EmailJS for direct communication
- **Hobbies Section**: Personal hobbies tracker with real-time updates via Supabase
- **Resume Download**: Direct access to downloadable resume
- **3D Elements**: Interactive 3D components using React Three Fiber
- **Visual Editing**: Built-in visual editing capabilities for development

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe JavaScript for better development experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **ShadCN UI** - Beautiful and accessible UI components
- **React Router** - Client-side routing
- **React Hook Form** - Performant forms with easy validation
- **Zod** - TypeScript-first schema validation

### Backend & Database
- **Supabase** - Open source Firebase alternative for backend services
- **EmailJS** - Client-side email sending service

### 3D & Animations
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for React Three Fiber
- **Tailwind CSS Animate** - CSS animation utilities

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Type checking
- **Vite** - Build tool and dev server

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # ShadCN UI components
│   ├── About.tsx       # About section
│   ├── Contact.tsx     # Contact form
│   ├── Hero.tsx        # Hero section
│   ├── Navigation.tsx  # Navigation bar
│   ├── Projects.tsx    # Projects showcase
│   ├── Resume.tsx      # Resume section
│   ├── Skills.tsx      # Skills section
│   └── ...
├── contexts/           # React contexts
│   ├── AuthContext.tsx # Authentication context
│   └── ThemeContext.tsx # Theme context
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
│   ├── supabase.ts     # Supabase client
│   ├── utils.ts        # Utility functions
│   └── ...
├── pages/              # Page components
│   ├── Index.tsx       # Main portfolio page
│   ├── Hobbies.tsx     # Hobbies tracker page
│   ├── Login.tsx       # Authentication page
│   └── NotFound.tsx    # 404 page
└── visual-edits/       # Visual editing system
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or bun package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/hash066/HarshitaNageshPortfolio.git
   cd HarshitaNageshPortfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Set up environment variables**

   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

   Fill in your environment variables:
   ```env
   # Supabase Configuration
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

   # EmailJS Configuration
   VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   bun run dev
   ```

5. **Open your browser**

   Navigate to `http://localhost:5173` to view the portfolio.

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Customization

### Personal Information
- Update personal details in the respective components (`About.tsx`, `Hero.tsx`, etc.)
- Replace resume file in `src/HarshitaNagesh_Resume.pdf`
- Modify contact information in `Contact.tsx`

### Styling
- Customize colors and themes in `tailwind.config.ts`
- Modify component styles using Tailwind classes
- Update theme configuration in `ThemeContext.tsx`

### Projects
- Add new projects in `Projects.tsx`
- Update project data with your own projects

## 🔧 Configuration

### Supabase Setup
1. Create a new Supabase project
2. Run the SQL schema from `supabase-schema.sql`
3. Update your environment variables with the project URL and anon key

### EmailJS Setup
1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Set up a service and email template
3. Update environment variables with your service details

## 📱 Features Overview

### Portfolio Sections
- **Hero**: Eye-catching introduction with animated elements
- **About**: Personal background and story
- **Skills**: Technical skills with visual representations
- **Projects**: Showcase of development projects
- **Resume**: Downloadable CV and experience summary
- **Contact**: Contact form with email integration

### Hobbies Tracker
- Personal hobby management system
- Real-time updates with Supabase
- Authentication required for personal data

### Visual Editing System
- Development tool for visual component editing
- Integrated with build process for development mode

## 🤝 Contributing

This is a personal portfolio project, but feel free to:
- Report bugs or issues
- Suggest improvements
- Fork and customize for your own use

## 📄 License

This project is private and intended for personal use.

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/) and [React](https://reactjs.org/)
- UI components from [ShadCN](https://ui.shadcn.com/)
- Icons from [Lucide React](https://lucide.dev/)
- 3D graphics with [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- Backend services with [Supabase](https://supabase.com/)
- Email service with [EmailJS](https://www.emailjs.com/)

---

**Harshita Nagesh** - Full Stack Developer
