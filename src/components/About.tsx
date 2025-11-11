const About = () => {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            About <span className="text-primary">Me</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full glow-blue" />
        </div>
        
        {/* Main 2-Column Layout */}
        <div className="grid lg:grid-cols-[1.2fr,1fr] gap-8 mb-12">
          {/* Left Column - Main Profile Card */}
          <div className="space-y-6">
            <div className="relative bg-card border border-border rounded-xl p-8 hover:glow-blue transition-all duration-300">
              {/* Decorative corner elements */}
              <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-primary" />
              <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-primary" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-primary" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-primary" />
              
              <h3 className="text-3xl font-bold mb-6">
                Hello! I'm <span className="text-primary">Harshita</span>
              </h3>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  I'm a <strong className="text-foreground">Computer Science Engineering student</strong> at RV College of Engineering, Bangalore, with a deep passion for creating innovative digital solutions.
                </p>
                
                <p>
                  My journey spans across <strong className="text-primary">Machine Learning, Natural Language Processing,</strong> and <strong className="text-primary">Full-Stack Development</strong>, transforming complex problems into elegant, user-friendly applications.
                </p>
                
                <p>
                  From building sentiment analysis models with 98% accuracy to crafting responsive web applications, I thrive at the intersection of <strong className="text-foreground">creativity and code</strong>.
                </p>
                
                <div className="mt-6 pt-6 border-l-4 border-primary pl-6 italic text-muted-foreground">
                  "Where creativity meets code, and every challenge is a chance to level up."
                </div>
              </div>
            </div>
            
            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-card border border-border rounded-lg p-6 text-center hover:border-primary/50 transition-all duration-300">
                <div className="text-4xl font-bold text-primary mb-2">25+</div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 text-center hover:border-primary/50 transition-all duration-300">
                <div className="text-4xl font-bold text-primary mb-2">8</div>
                <div className="text-sm text-muted-foreground">Languages</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 text-center hover:border-primary/50 transition-all duration-300">
                <div className="text-4xl font-bold text-primary mb-2">4+</div>
                <div className="text-sm text-muted-foreground">Years Coding</div>
              </div>
            </div>
          </div>
          
          {/* Right Column - 2x2 Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Education Card */}
            <div className="bg-surface rounded-lg p-6 border border-border hover:border-primary/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-primary/20 border border-primary/50 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-primary mb-2">Education</h4>
              <p className="text-foreground font-medium text-sm mb-1">B.Tech in Computer Science</p>
              <p className="text-muted-foreground text-xs">RV College of Engineering | Sophomore</p>
            </div>
            
            {/* Focus Areas Card */}
            <div className="bg-surface rounded-lg p-6 border border-border hover:border-primary/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-primary/20 border border-primary/50 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-primary mb-2">Focus Areas</h4>
              <p className="text-foreground font-medium text-sm mb-1">AI/ML & Cybersecurity</p>
              <p className="text-muted-foreground text-xs">Building intelligent & secure systems</p>
            </div>
            
            {/* Tech Stack Card */}
            <div className="bg-surface rounded-lg p-6 border border-border hover:border-primary/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-primary/20 border border-primary/50 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-primary mb-2">Tech Stack</h4>
              <p className="text-foreground font-medium text-sm mb-1">Full-Stack Development</p>
              <p className="text-muted-foreground text-xs">React, TypeScript, Python, TensorFlow</p>
            </div>
            
            {/* Experience Card */}
            <div className="bg-surface rounded-lg p-6 border border-border hover:border-primary/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-primary/20 border border-primary/50 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-primary mb-2">Experience</h4>
              <p className="text-foreground font-medium text-sm mb-1">25+ Projects Built</p>
              <p className="text-muted-foreground text-xs">Open source contributor & problem solver</p>
            </div>
          </div>
        </div>
        
        {/* Bottom Section - Interests and Goals */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* What I'm Interested In */}
          <div className="bg-surface rounded-lg p-8 border border-border hover:border-primary/50 transition-all duration-300">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <h4 className="text-xl font-semibold text-foreground">
                What I'm interested in
              </h4>
            </div>
            <div className="flex flex-wrap gap-3">
              {["Machine Learning", "Web3", "Cybersecurity", "UI/UX Design", "Open Source", "Game Development"].map((interest) => (
                <span 
                  key={interest}
                  className="px-4 py-2 bg-panel border border-primary/30 rounded-full text-sm text-foreground
                           hover:border-primary hover:bg-primary/10 transition-all duration-300 cursor-default"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
          
          {/* Current Goals */}
          <div className="bg-surface rounded-lg p-8 border border-border hover:border-primary/50 transition-all duration-300">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <h4 className="text-xl font-semibold text-foreground">
                Current Goals
              </h4>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-muted-foreground">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>Build impactful projects with real-world applications</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>Grow as a collaborative and inspiring leader</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>Contribute to open source and support tech communities</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;