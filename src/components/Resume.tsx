import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, ExternalLink, GraduationCap, Briefcase, Award } from "lucide-react";

const Resume = () => {
  const education = [
    {
      degree: "Bachelor of Technology in Computer Science and Engineering",
      school: "R.V. College of Engineering, Bangalore",
      period: "2024 - 2028",
      gpa: "9.2/10",
      highlights: ["Specialization in AI/ML", "Active participant in coding competitions"]
    }
  ];

  const skills = [
    "Python", "Machine Learning", "Deep Learning", "NLP", "TensorFlow", "PyTorch",
    "TypeScript", "React", "Next.js", "Node.js", "MongoDB", "Git", "Docker", "AWS"
  ];

  const resumeUrl = 'https://drive.google.com/file/d/1qgyRe3QqNAaZCvDwDOg6ihKTOZqlOZt1/view?usp=sharing';

  const handleDownloadPDF = () => {
    // For Google Drive links, we can use the export link to force download
    const fileId = '1qgyRe3QqNAaZCvDwDOg6ihKTOZqlOZt1';
    const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'HarshitaNagesh_Resume.pdf';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewOnline = () => {
    window.open(resumeUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="resume" className="py-20 bg-surface/20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4 text-glow">
            Resume & <span className="text-primary">Experience</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            My professional journey, skills, and academic achievements
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleViewOnline}
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow"
              size="lg"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              View Online
            </Button>
            <Button 
              onClick={handleDownloadPDF}
              variant="outline" 
              className="border-primary/50 text-primary hover:bg-primary/10"
              size="lg"
            >
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* Education */}
          <Card className="bg-surface/30 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center text-glow">
                <GraduationCap className="mr-2 h-5 w-5 text-primary" />
                Education
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {education.map((edu, index) => (
                <div key={index} className="border-l-2 border-primary/30 pl-4">
                  <h3 className="font-semibold text-foreground">{edu.degree}</h3>
                  <p className="text-primary font-medium">{edu.school}</p>
                  <p className="text-sm text-muted-foreground mb-2">{edu.period}</p>
                  <p className="text-sm mb-2">GPA: <span className="font-medium">{edu.gpa}</span></p>
                  <div className="flex flex-wrap gap-2">
                    {edu.highlights.map((highlight) => (
                      <span key={highlight} className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Skills Section */}
        <Card className="mt-8 bg-surface/30 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <CardHeader>
            <CardTitle className="flex items-center text-glow">
              <Award className="mr-2 h-5 w-5 text-primary" />
              Technical Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <div 
                  key={skill}
                  className="px-3 py-1 text-sm rounded-full border border-primary/30 text-foreground bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  {skill}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Resume;
