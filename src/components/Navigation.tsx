import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { LogOut, LogIn, Sun, Moon } from "lucide-react";

const Navigation = () => {
  const [activeSection, setActiveSection] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { id: "home", label: "Home", path: "/" },
    { id: "about", label: "About", path: "/#about" },
    { id: "skills", label: "Skills", path: "/#skills" },
    { id: "projects", label: "Projects", path: "/#projects" },
    { id: "resume", label: "Resume", path: "/#resume" },
    { id: "hobbies", label: "Hobbies", path: "/hobbies" },
    { id: "contact", label: "Contact", path: "/#contact" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (item: typeof navItems[0]) => {
    // Handle home button - always navigate to / and scroll to top
    if (item.id === "home") {
      if (location.pathname !== "/") {
        navigate("/");
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (item.path.startsWith('/') && !item.path.includes('#')) {
      navigate(item.path);
    } else if (item.path.includes('#')) {
      const [path, hash] = item.path.split('#');
      if (path && path !== location.pathname) {
        navigate(path);
        setTimeout(() => {
          const element = document.getElementById(hash);
          element?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        const element = document.getElementById(hash);
        element?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <button 
            onClick={() => handleNavigation(navItems[0])}
            className="text-xl font-bold text-glow cursor-pointer hover:scale-105 transition-transform"
          >
            Harshita<span className="text-primary">Nagesh</span>
          </button>
          
          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)}
                className={`relative px-3 py-2 transition-all duration-300 ${
                  activeSection === item.id
                    ? "text-primary text-glow"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-cyber animate-glow-pulse" />
                )}
              </button>
            ))}
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="relative ml-4 p-2 rounded-lg border border-border hover:border-primary 
                       transition-all duration-300 group overflow-hidden bg-background/50"
              aria-label="Toggle theme"
            >
              <div className="relative w-5 h-5">
                <Sun 
                  className={`absolute inset-0 w-5 h-5 transition-all duration-500 ${
                    theme === 'light' 
                      ? 'rotate-0 scale-100 opacity-100' 
                      : 'rotate-90 scale-0 opacity-0'
                  }`}
                />
                <Moon 
                  className={`absolute inset-0 w-5 h-5 transition-all duration-500 ${
                    theme === 'dark' 
                      ? 'rotate-0 scale-100 opacity-100' 
                      : '-rotate-90 scale-0 opacity-0'
                  }`}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-cyber opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </button>
            
            {user ? (
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="ml-2"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/login")}
                className="ml-2"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Theme Toggle for Mobile */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-border hover:border-primary transition-all duration-300"
              aria-label="Toggle theme"
            >
              <div className="relative w-5 h-5">
                <Sun 
                  className={`absolute inset-0 w-5 h-5 transition-all duration-500 ${
                    theme === 'light' 
                      ? 'rotate-0 scale-100 opacity-100' 
                      : 'rotate-90 scale-0 opacity-0'
                  }`}
                />
                <Moon 
                  className={`absolute inset-0 w-5 h-5 transition-all duration-500 ${
                    theme === 'dark' 
                      ? 'rotate-0 scale-100 opacity-100' 
                      : '-rotate-90 scale-0 opacity-0'
                  }`}
                />
              </div>
            </button>
            
            <button className="text-foreground">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;