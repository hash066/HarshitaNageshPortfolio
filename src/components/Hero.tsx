import { useEffect, useState } from "react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const fullText = "CS Engineering Student";
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-background/70" />
      
      {/* Animated Grid */}
      <div className="absolute inset-0 cyber-grid opacity-30" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-16 h-16 border border-primary/30 rotate-45 animate-float" />
      <div className="absolute bottom-40 right-40 w-12 h-12 border border-accent/30 animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/3 right-20 w-8 h-8 bg-cyber-purple/20 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="animate-slide-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-glow">Harshita</span>
            <span className="text-primary ml-4">Nagesh</span>
          </h1>
          
          <div className="text-xl md:text-2xl mb-8 h-8">
            <span className="text-accent font-mono">
              {displayText}
              <span className="animate-pulse text-primary">|</span>
            </span>
          </div>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Where creativity meets code, and every challenge is a chance to level up
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-gradient-cyber text-primary-foreground font-semibold rounded-lg 
                       glow-blue hover:scale-105 transition-all duration-300 animate-glow-pulse"
            >
              Explore Projects
            </button>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 border border-primary text-primary font-semibold rounded-lg 
                       hover:bg-primary hover:text-primary-foreground hover:glow-blue
                       transition-all duration-300"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;