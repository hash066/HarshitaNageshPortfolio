import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from '@/components/ui/sonner';

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current!,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      console.log('Email sent successfully:', result.text);
      toast.success('Thank you for your message! I will get back to you soon.');
      
      // Reset form
      setFormData({ user_name: '', user_email: '', message: '' });
      formRef.current?.reset();
    } catch (error) {
      console.error('Failed to send email:', error);
      toast.error('Sorry, there was an error sending your message. Please try again or email me directly at harshitanagesh4@gmail.com');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-6 bg-surface/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-glow">
            Initialize <span className="text-primary">Connection</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-cyber mx-auto rounded-full glow-blue" />
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
            Ready to collaborate on exciting projects or discuss opportunities in the tech universe
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 border border-border hover:glow-blue 
                          transition-all duration-500 animate-fade-in bg-gradient-panel">
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-accent" />
                </div>
                <span className="text-sm font-mono text-muted-foreground">contact_info.json</span>
              </div>
              
              <div className="space-y-4 font-mono text-sm">
                <div className="text-primary">{"{"}</div>
                <div className="ml-4">
                  <div className="flex">
                    <span className="text-accent">"email":</span>
                    <span className="ml-2">"harshitanagesh4@gmail.com"</span>
                  </div>
                </div>
                <div className="ml-4">
                  <div className="flex">
                    <span className="text-accent">"location":</span>
                    <span className="ml-2">"Bengaluru, India"</span>
                  </div>
                </div>
                <div className="ml-4">
                  <div className="flex">
                    <span className="text-accent">"status":</span>
                    <span className="ml-2 text-cyber-green">"Available for opportunities"</span>
                  </div>
                </div>
                <div className="ml-4">
                  <div className="flex">
                    <span className="text-accent">"response_time":</span>
                    <span className="ml-2">"&lt; 24 hours"</span>
                  </div>
                </div>
                <div className="text-primary">{"}"}</div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-card rounded-lg p-6 border border-border hover:glow-accent 
                          transition-all duration-500 animate-slide-up bg-gradient-panel"
                 style={{ animationDelay: '0.2s' }}>
              <h3 className="text-xl font-semibold mb-4 text-accent font-mono">
                Social Links
              </h3>
              
              <div className="space-y-3">
                <a 
                  href="https://www.linkedin.com/in/harshita-nagesh/"
                  className="flex items-center space-x-3 p-3 bg-surface rounded border border-border
                           hover:border-primary hover:glow-blue transition-all duration-300 group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="w-8 h-8 bg-primary/20 rounded flex items-center justify-center
                                group-hover:bg-primary/30 transition-colors">
                    <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold">LinkedIn</div>
                    <div className="text-sm text-muted-foreground">Professional Network</div>
                  </div>
                </a>

                <a 
                  href="https://github.com/hash066"
                  className="flex items-center space-x-3 p-3 bg-surface rounded border border-border
                           hover:border-accent hover:glow-accent transition-all duration-300 group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="w-8 h-8 bg-accent/20 rounded flex items-center justify-center
                                group-hover:bg-accent/30 transition-colors">
                    <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold">GitHub</div>
                    <div className="text-sm text-muted-foreground">Code Repository</div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card rounded-lg p-6 border border-border hover:glow-blue 
                        transition-all duration-500 animate-slide-up bg-gradient-panel"
               style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex space-x-1">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-accent" />
              </div>
              <span className="text-sm font-mono text-muted-foreground">send_message.exe</span>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-mono text-accent mb-2">
                  &gt; name_input
                </label>
                <input 
                  type="text"
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-surface border border-border rounded
                           focus:border-primary focus:ring-1 focus:ring-primary
                           transition-colors font-mono text-sm"
                  placeholder="Enter your name..."
                />
              </div>

              <div>
                <label className="block text-sm font-mono text-accent mb-2">
                  &gt; email_input
                </label>
                <input 
                  type="email"
                  name="user_email"
                  value={formData.user_email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-surface border border-border rounded
                           focus:border-primary focus:ring-1 focus:ring-primary
                           transition-colors font-mono text-sm"
                  placeholder="your.email@domain.com"
                />
              </div>

              <div>
                <label className="block text-sm font-mono text-accent mb-2">
                  &gt; message_body
                </label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-surface border border-border rounded
                           focus:border-primary focus:ring-1 focus:ring-primary
                           transition-colors font-mono text-sm resize-none"
                  placeholder="Hi Harshita! I'd like to discuss..."
                />
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-3 bg-gradient-cyber text-primary-foreground font-semibold rounded
                         glow-blue hover:scale-105 transition-all duration-300 animate-glow-pulse
                         font-mono disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'SENDING...' : 'TRANSMIT_MESSAGE()'}
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-border">
          <p className="text-muted-foreground font-mono text-sm">
            &copy; 2024 Harshita Nagesh. Built with React, TypeScript & lots of ☕
          </p>
          <div className="mt-4 flex justify-center space-x-2">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="w-2 h-2 bg-cyber-purple rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;