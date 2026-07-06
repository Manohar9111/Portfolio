import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import PillNav from '@/components/PillNav';
import TiltedCard from '@/components/TiltedCard';
import LiquidEther from '@/components/LiquidEther';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/sonner';
import { FaGithub, FaArrowLeft, FaExternalLinkAlt } from 'react-icons/fa';
import './Projects.css';

const navItems = [
  { label: 'About',      href: '/#about' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Projects',   href: '/projects' },
  { label: 'Contact',    href: '/#contact' },
];

const ManoharLogo = (
  <div style={{
    width: 36, height: 36, borderRadius: '50%',
    background: 'rgba(255,255,255,0.15)',
    border: '1px solid rgba(255,255,255,0.3)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  }}>
    <span style={{ color: '#fff', fontWeight: 900, fontSize: '1.1rem', letterSpacing: '-1px' }}>M</span>
  </div>
);

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters')
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const allProjects = [
  {
    id: 1,
    title: 'JobBoard',
    description: 'A comprehensive job board platform with advanced search, filtering, and job posting capabilities. Features JWT authentication, role-based access control, resume uploads, and full-text search functionality.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop',
    tags: ['Express', 'Node.js', 'PostgreSQL', 'JWT', 'Multer', 'Full-text Search'],
    features: [
      'JWT Authentication',
      'Role-based Access Control',
      'Resume Upload & Storage',
      'Advanced Job Search',
      'Responsive Design',
      'RESTful API'
    ],
    github: '#',
    live: '#'
  },
  {
    id: 2,
    title: 'Real-Time Multiplayer Quiz',
    description: 'An interactive multiplayer quiz platform with real-time synchronization using WebSockets. Features dynamic animations with GSAP, WebGL effects, and a smooth user experience for competitive quiz gameplay.',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&h=600&fit=crop',
    tags: ['React', 'Socket.io', 'MongoDB', 'WebGL', 'GSAP', 'Express'],
    features: [
      'Real-time Multiplayer',
      'WebSocket Communication',
      'Dynamic Animations',
      'WebGL Effects',
      'Leaderboard System',
      'Question Management'
    ],
    github: '#',
    live: '#'
  },
  {
    id: 3,
    title: 'Expense Tracker REST API',
    description: 'A robust REST API for expense tracking with JWT authentication, role-based access, and comprehensive expense management. Built with modern backend practices and database optimization.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=600&fit=crop',
    tags: ['Node.js', 'Express', 'MongoDB', 'JWT', 'REST API'],
    features: [
      'JWT Authentication',
      'Expense CRUD Operations',
      'Category Management',
      'Expense Analytics',
      'User Profiles',
      'API Documentation'
    ],
    github: '#',
    live: '#'
  }
];

export default function Projects() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Form data:', data);
      toast.success('Message sent successfully! I\'ll get back to you soon.');
      reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="projects-container">
      <LiquidEther
        colors={['#111111', '#555555', '#cccccc']}
        mouseForce={25}
        cursorSize={120}
        autoDemo={true}
        autoSpeed={0.4}
        autoIntensity={2.0}
        resolution={0.5}
        style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', zIndex: 0 }}
      />

      <PillNav
        logo={ManoharLogo}
        logoAlt="Manohar Logo"
        items={navItems}
        activeHref="/projects"
        baseColor="#ffffff"
        pillColor="rgba(255,255,255,0.1)"
        hoveredPillTextColor="#000000"
        pillTextColor="#ffffff"
        initialLoadAnimation={true}
        rightElement={
          <a
            href="/#contact"
            style={{
              background: '#ffffff',
              color: '#000',
              borderRadius: '9999px',
              padding: '0.45rem 1.1rem',
              fontWeight: 700,
              fontSize: '0.9rem',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'all 0.3s ease',
            }}
          >
            Hire me
          </a>
        }
      />

      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="back-button-container"
      >
        <Button variant="ghost" onClick={() => window.history.back()} className="back-btn">
          <FaArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Button>
      </motion.div>

      {/* Header */}
      <section className="projects-header">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="header-content"
        >
          <h1 className="header-title">All Projects</h1>
          <p className="header-subtitle">
            A collection of projects showcasing my skills in full-stack development, modern web technologies, and problem-solving.
          </p>
        </motion.div>
      </section>

      {/* Projects Grid */}
      <section className="all-projects-section">
        <div className="section-container">
          <div className="projects-full-grid">
            {allProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (idx % 3) * 0.1 }}
                className="project-full-card"
              >
                <div className="project-card-image">
                  <TiltedCard
                    imageSrc={project.image}
                    altText={project.title}
                    captionText={project.title}
                    containerHeight="300px"
                    containerWidth="100%"
                    imageHeight="300px"
                    imageWidth="100%"
                    rotateAmplitude={12}
                    scaleOnHover={1.05}
                    showMobileWarning={false}
                    showTooltip={true}
                  />
                </div>

                <div className="project-card-content">
                  <h3 className="project-card-title">{project.title}</h3>
                  <p className="project-card-description">{project.description}</p>

                  <div className="project-features">
                    <h4>Key Features:</h4>
                    <ul>
                      {project.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="project-tech-stack">
                    <h4>Tech Stack:</h4>
                    <div className="tech-tags">
                      {project.tags.map((tag) => (
                        <span key={tag} className="tech-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="project-links">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                      <FaGithub className="h-5 w-5" />
                      <span>Source Code</span>
                    </a>
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-link">
                      <FaExternalLinkAlt className="h-5 w-5" />
                      <span>Live Demo</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="contact-form-section">
        <div className="section-container">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="section-title"
          >
            Let's Work Together
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="contact-form-wrapper"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <Input
                  id="name"
                  placeholder="Your name"
                  {...register('name')}
                  className="form-input"
                />
                {errors.name && <span className="form-error">{errors.name.message}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  {...register('email')}
                  className="form-input"
                />
                {errors.email && <span className="form-error">{errors.email.message}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="subject" className="form-label">
                  Subject
                </label>
                <Input
                  id="subject"
                  placeholder="What is this about?"
                  {...register('subject')}
                  className="form-input"
                />
                {errors.subject && <span className="form-error">{errors.subject.message}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Your message here..."
                  rows={5}
                  {...register('message')}
                  className="form-input form-textarea"
                />
                {errors.message && <span className="form-error">{errors.message.message}</span>}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="form-submit"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2026 Manohar Adimalla. All rights reserved.</p>
      </footer>
    </div>
  );
}
