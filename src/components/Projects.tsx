const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Movie Review Sentiment Analysis",
      description: "Sentiment analysis on IMDb movie reviews using an Embedding + LSTM model in TensorFlow/Keras. Classifies reviews as positive or negative with ~98% accuracy.",
      tech: ["Python", "TensorFlow", "Keras", "NLP", "LSTM", "Embedding"],
      status: "LIVE",
      github: "https://github.com/hash066/movie-review-sentiment-analysis-imdb",
      demo: null,
      featured: true
    },
    {
      id: 2,
      title: "QA BERT SQuAD",
      description: "Question answering system using BERT fine-tuned on the SQuAD dataset. Extracts answers from passages for given questions with transformer-based architecture.",
      tech: ["Python", "PyTorch", "Transformers", "BERT", "NLP"],
      status: "LIVE",
      github: "https://github.com/hash066/qa-bert-squad",
      demo: null,
      featured: true
    },
    {
      id: 3,
      title: "Prompt Frame Gallery",
      description: "A gallery for showcasing and managing AI-generated prompts and their outputs.",
      tech: ["TypeScript", "React", "Next.js", "Tailwind CSS"],
      status: "DEVELOPMENT",
      github: "https://github.com/hash066/prompt-frame-gallery",
      demo: null,
      featured: true
    },
    {
      id: 4,
      title: "Feather Press",
      description: "A lightweight, modern content management system built with modern web technologies.",
      tech: ["TypeScript", "Next.js", "Tailwind CSS", "Prisma"],
      status: "DEVELOPMENT",
      github: "https://github.com/hash066/feather-press",
      demo: null,
      featured: false
    },
    {
      id: 5,
      title: "Kisan Saathi Suno App",
      description: "An application designed to assist farmers with agricultural information and resources.",
      tech: ["React Native", "Node.js", "MongoDB"],
      status: "PROTOTYPE",
      github: "https://github.com/hash066/kisan-saathi-suno-app",
      demo: null,
      featured: false
    },
    {
      id: 6,
      title: "Phishing Simulator",
      description: "An educational tool to demonstrate and test phishing awareness and prevention techniques.",
      tech: ["Python", "Flask", "JavaScript", "Cybersecurity"],
      status: "LIVE",
      github: "https://github.com/hash066/Phishingsimulator",
      demo: null,
      featured: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "LIVE": return "text-accent";
      case "DEVELOPMENT": return "text-primary";
      case "PROTOTYPE": return "text-cyber-purple";
      default: return "text-muted-foreground";
    }
  };

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-glow">
            Digital <span className="text-primary">Creations</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-cyber mx-auto rounded-full glow-blue" />
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
            Exploring the boundaries of technology through innovative projects
          </p>
        </div>

        {/* Featured Projects */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {projects.filter(p => p.featured).map((project, index) => (
            <div 
              key={project.id}
              className="group relative bg-card rounded-lg border border-border overflow-hidden
                       hover:glow-blue transition-all duration-500 hover:scale-[1.02]
                       animate-fade-in bg-gradient-panel"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Project Header */}
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-accent rounded-full animate-pulse" />
                    <span className={`text-sm font-mono ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-destructive" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-accent" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-primary font-mono mb-3">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Tech Stack */}
              <div className="p-6 border-b border-border">
                <div className="text-sm font-mono text-accent mb-2">TECH_STACK:</div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span 
                      key={tech}
                      className="px-2 py-1 bg-surface rounded text-xs font-mono
                               border border-border hover:border-primary/50 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 flex space-x-4">
                <a 
                  href={project.github}
                  className="flex items-center space-x-2 px-4 py-2 bg-surface rounded
                           border border-border hover:border-primary hover:text-primary
                           transition-all duration-300 text-sm font-mono"
                >
                  <span>GitHub</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </a>
                
                {project.demo && (
                  <a 
                    href={project.demo}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded
                             hover:glow-blue transition-all duration-300 text-sm font-mono"
                  >
                    <span>Live Demo</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-100 
                            transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Other Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.filter(p => !p.featured).map((project, index) => (
            <div 
              key={project.id}
              className="bg-card rounded-lg p-6 border border-border
                       hover:border-primary/50 hover:glow-accent transition-all duration-300
                       animate-slide-up bg-gradient-panel"
              style={{ animationDelay: `${(index + 2) * 0.2}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-primary font-mono">
                  {project.title}
                </h3>
                <span className={`text-xs font-mono ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>
              
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.slice(0, 3).map((tech) => (
                  <span 
                    key={tech}
                    className="px-2 py-1 bg-surface rounded text-xs font-mono
                             border border-border"
                  >
                    {tech}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="px-2 py-1 text-xs text-muted-foreground">
                    +{project.tech.length - 3} more
                  </span>
                )}
              </div>
              
              <div className="flex space-x-3">
                <a 
                  href={project.github}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </a>
                
                {project.demo && (
                  <a 
                    href={project.demo}
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
