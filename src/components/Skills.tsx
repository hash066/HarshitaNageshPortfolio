const Skills = () => {
  const skillCategories = [
    {
      title: "MACHINE_LEARNING",
      color: "primary",
      colorClass: "text-primary",
      skills: ["NLP", "Agentic AI", "Transformers", "Deep Learning", "Federated Learning", "Reinforcement Learning"]
    },
    {
      title: "FULL_STACK_DEV", 
      color: "accent",
      colorClass: "text-accent",
      skills: ["TypeScript", "React", "Next.js", "Node.js", "Express", "MongoDB"]
    },
    {
      title: "TOOLS_&_TECH",
      color: "cyber-purple",
      colorClass: "text-[hsl(var(--cyber-purple))]",
      skills: ["Git", "Docker", "AWS", "Linux", "VS Code", "Jupyter"]
    },
    {
      title: "DATABASES_&_ML_OPS",
      color: "cyber-green",
      colorClass: "text-[hsl(var(--cyber-green))]",
      skills: ["PostgreSQL", "MongoDB", "MLflow", "DVC", "CI/CD", "REST APIs"]
    }
  ];

  return (
    <section id="skills" className="py-20 px-6 bg-surface/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-glow">
            Tech <span className="text-primary">Arsenal</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-cyber mx-auto rounded-full glow-blue" />
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
            My toolkit for bringing ideas to life in the digital realm
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <div 
              key={category.title}
              className="group relative bg-card rounded-lg p-6 border border-border
                       hover:glow-blue transition-all duration-500 hover:scale-105
                       animate-fade-in bg-gradient-panel"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Terminal-style header */}
              <div className="flex items-center space-x-2 mb-6">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-accent" />
                </div>
                <div className="flex-1 bg-surface px-3 py-1 rounded text-sm font-mono">
                  <span className="text-accent">~/skills/</span>
                  <span className={category.colorClass}>{category.title.toLowerCase()}</span>
                </div>
              </div>

              {/* Skills Grid */}
              <div className="space-y-3">
                <h3 className={`text-xl font-bold font-mono mb-4 ${category.colorClass}`}>
                  {category.title}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <div 
                      key={skill}
                      className="bg-surface/50 rounded px-3 py-2 text-sm font-mono
                               border border-border hover:border-primary/50
                               transition-all duration-300 hover:bg-surface
                               group-hover:animate-glow-pulse"
                      style={{ animationDelay: `${skillIndex * 0.1}s` }}
                    >
                      <span className="text-foreground">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-100 
                            transition-opacity duration-500 rounded-lg pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Additional stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Projects Built", value: "25+" },
            { label: "Languages", value: "8" },
            { label: "Years Coding", value: "4" },
            { label: "Coffee Consumed", value: "∞" }
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-primary font-mono mb-2 text-glow">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;