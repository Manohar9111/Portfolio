import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import PillNav from '@/components/PillNav';
import VariableProximity from '@/components/VariableProximity';
import TiltedCard from '@/components/TiltedCard';
import LiquidEther from '@/components/LiquidEther';
import { Button } from '@/components/ui/button';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import './Home.css';

const navItems = [
  { label: 'About',      href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Contact',    href: '#contact' },
];

// Original "M" logo (matches the old design)
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

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);

  // Contact form state
  type FormStatus = 'idle' | 'sending' | 'success' | 'error';
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    try {
      const res = await fetch('https://formspree.io/f/maqgvgba', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  const projects = [
    {
      title: 'JobBoard',
      description: 'A full-featured job board platform with JWT authentication, role-based access control, and advanced search capabilities.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop',
      tags: ['Express', 'Node.js', 'PostgreSQL', 'JWT', 'Multer'],
      link: '#',
    },
    {
      title: 'Real-Time Multiplayer Quiz',
      description: 'An interactive multiplayer quiz platform with real-time synchronization using WebGL and GSAP animations.',
      image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500&h=500&fit=crop',
      tags: ['React', 'Socket.io', 'MongoDB', 'WebGL', 'GSAP'],
      link: '#',
    },
  ];

  const skills = {
    Frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    Backend:  ['Node.js', 'Express.js', 'PostgreSQL', 'MongoDB', 'JWT'],
    Tools:    ['Git', 'Docker', 'VS Code', 'Figma'],
  };

  const experience = [
    { role: 'MOSS Web Development Team Member',  period: '2024 – Present', description: 'Contributing to web development projects and mentoring junior developers.' },
    { role: 'Summer School Backend Instructor',  period: '2024',           description: 'Teaching backend development concepts and best practices to students.' },
    { role: 'Event Management Committee',        period: '2023 – Present', description: 'Organizing and managing technical events and hackathons.' },
    { role: 'CTF Organizer',                     period: '2023 – Present', description: 'Organizing Capture The Flag cybersecurity competitions.' },
  ];

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          if (id) {
            window.history.replaceState(null, '', `#${id}`);
            window.dispatchEvent(new HashChangeEvent('hashchange'));
          }
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div ref={containerRef} className="home-container">

      {/* ── Fixed full-screen interactive background ── */}
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

      {/* ── Navbar: original "M" logo + sections ── */}
      <PillNav
        logo={ManoharLogo}
        logoAlt="Manohar Logo"
        items={navItems}
        baseColor="#ffffff"
        pillColor="rgba(255,255,255,0.1)"
        hoveredPillTextColor="#000000"
        pillTextColor="#ffffff"
        initialLoadAnimation={true}
        rightElement={
          <a
            href="#contact"
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

      {/* ── HERO: Photo centred as the main visual, text below ── */}
      <section className="hero-section">
        <div className="hero-content">

          {/* Profile photo with TiltedCard effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
            className="hero-image"
          >
            <TiltedCard
              imageSrc="/WhatsAppImage2026-07-05at3.35.18PM.jpeg"
              altText="Manohar Adimalla"
              captionText="Manohar Adimalla"
              containerHeight="360px"
              containerWidth="360px"
              imageHeight="360px"
              imageWidth="360px"
              rotateAmplitude={14}
              scaleOnHover={1.06}
              showMobileWarning={false}
              showTooltip={false}
              displayOverlayContent={false}
            />
          </motion.div>

          {/* Text under photo */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-text"
          >
            <div ref={nameRef} className="hero-name-container">
              <VariableProximity
                label="Adimalla Naga Manohar"
                fromFontVariationSettings="'wght' 300, 'opsz' 9"
                toFontVariationSettings="'wght' 700, 'opsz' 40"
                containerRef={nameRef as React.RefObject<HTMLDivElement>}
                radius={120}
                falloff="linear"
                className="hero-name"
              />
            </div>

            <div className="hero-title-container" ref={containerRef}>
              <VariableProximity
                label="Full-Stack Developer"
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 900, 'opsz' 72"
                containerRef={containerRef as React.RefObject<HTMLDivElement>}
                radius={150}
                falloff="exponential"
                className="hero-title"
              />
            </div>

            <p className="hero-subtitle">
              Building meaningful web applications with modern technologies.
              B.Tech CSE (AI &amp; ML) · MIT Manipal · 2028
            </p>

            <div className="hero-ctas">
              <a href="#projects" className="cta-primary">View My Work</a>
              <a href="#contact"  className="cta-secondary">Get In Touch</a>
            </div>

            <div className="hero-socials">
              <a href="https://github.com"    target="_blank" rel="noopener noreferrer" className="social-link"><FaGithub /></a>
              <a href="https://linkedin.com"  target="_blank" rel="noopener noreferrer" className="social-link"><FaLinkedin /></a>
              <a href="https://twitter.com"   target="_blank" rel="noopener noreferrer" className="social-link"><FaTwitter /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link"><FaInstagram /></a>
              <a href="mailto:nagamanohar859@gmail.com" className="social-link"><SiGmail /></a>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="about-section">
        <div className="section-container">
          <h2 className="section-subtitle">About</h2>
          <h2 className="section-title">
            About Me
          </h2>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="about-content">
            <p>I'm a passionate Full-Stack Developer studying B.Tech in Computer Science Engineering (AI &amp; ML) at MIT Manipal, graduating in 2028. I love building web applications that solve real problems and creating polished, interactive user experiences.</p>
            <p>My expertise spans both frontend and backend technologies, with a focus on modern web development practices. I'm particularly interested in system design, performance optimization, and creating seamless user experiences.</p>
            <p>Outside of coding, I enjoy playing football, running, and learning video editing. I'm also passionate about mentoring others and sharing knowledge with the developer community.</p>
          </motion.div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" className="skills-section">
        <div className="section-container">
          <h2 className="section-title">
            Skills &amp; Technologies
          </h2>
          <div className="skills-grid">
            {Object.entries(skills).map(([category, skillList], idx) => (
              <motion.div key={category} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: idx * 0.1 }} className="skill-category">
                <h3 className="skill-title">{category}</h3>
                <div className="skill-tags">
                  {skillList.map(skill => <span key={skill} className="skill-tag">{skill}</span>)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Experience ── */}
      <section id="experience" className="experience-section">
        <div className="section-container">
          <h2 className="section-subtitle">Experience</h2>
          <h2 className="section-title">
            Experience
          </h2>
          <div className="experience-timeline">
            {experience.map((exp, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: idx * 0.1 }} className="experience-item">
                <div className="experience-dot" />
                <div className="experience-content">
                  <h3 className="experience-role">{exp.role}</h3>
                  <p className="experience-period">{exp.period}</p>
                  <p className="experience-description">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Projects ── */}
      <section id="projects" className="projects-section">
        <div className="section-container">
          <h2 className="section-subtitle">Projects</h2>
          <h2 className="section-title">
            Featured Projects
          </h2>
          <div className="projects-grid">
            {projects.map((project, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: idx * 0.1 }} className="project-card-wrapper">
                <TiltedCard
                  imageSrc={project.image}
                  altText={project.title}
                  captionText={project.title}
                  containerHeight="320px"
                  containerWidth="100%"
                  imageHeight="320px"
                  imageWidth="100%"
                  rotateAmplitude={12}
                  scaleOnHover={1.05}
                  showMobileWarning={false}
                  showTooltip={true}
                  displayOverlayContent={true}
                  overlayContent={
                    <div className="project-overlay">
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                    </div>
                  }
                />
                <div className="project-info">
                  <h3 className="project-title">{project.title}</h3>
                  <div className="project-tags">
                    {project.tags.map(tag => <span key={tag} className="project-tag">{tag}</span>)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} className="view-all-projects">
            <Button className="view-all-btn">View All Projects</Button>
          </motion.div>
        </div>
      </section>

      {/* ── Contact & Footer ── */}
      <section id="contact" className="contact-section">
        <div className="section-container">
          <h2 className="section-subtitle">Contact</h2>
          <h2 className="section-title">
            Get In Touch
          </h2>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="contact-content">
            <p className="contact-description">
              I'm always interested in hearing about new projects and opportunities. Feel free to reach out!
            </p>

            {/* Formspree AJAX form — stays on page, shows success/error */}
            {formStatus === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="form-success"
              >
                <div className="form-success-icon">✓</div>
                <h3 className="form-success-title">Message Sent!</h3>
                <p className="form-success-text">Thanks for reaching out. I'll get back to you as soon as possible.</p>
                <button className="form-success-reset" onClick={() => setFormStatus('idle')}>
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleFormSubmit}
                className="contact-form"
                style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', width: '100%' }}
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="form-input"
                  value={formData.name}
                  onChange={handleFormChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  className="form-input"
                  value={formData.email}
                  onChange={handleFormChange}
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  required
                  rows={4}
                  className="form-textarea"
                  value={formData.message}
                  onChange={handleFormChange}
                />
                {formStatus === 'error' && (
                  <p className="form-error">Something went wrong. Please try again or email me directly.</p>
                )}
                <Button type="submit" className="submit-btn" disabled={formStatus === 'sending'}>
                  {formStatus === 'sending' ? 'Sending…' : 'Send Message'}
                </Button>
              </form>
            )}

            {/* Social icons */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <a href="https://github.com/Manohar9111"             target="_blank" rel="noopener noreferrer" className="social-button"><FaGithub size={22} /></a>
              <a href="https://www.linkedin.com/in/manohar-adimalla"           target="_blank" rel="noopener noreferrer" className="social-button"><FaLinkedin size={22} /></a>
              <a href="https://x.com/manohar_911_"            target="_blank" rel="noopener noreferrer" className="social-button"><FaTwitter size={22} /></a>
              <a href="https://www.instagram.com/manohar_911_"          target="_blank" rel="noopener noreferrer" className="social-button"><FaInstagram size={22} /></a>
              <a href="mailto:nagamanohar859@gmail.com"                                          className="social-button"><SiGmail size={22} /></a>
            </div>
          </motion.div>

          {/* Footer credit */}
          <p className="footer-credit">© 2026 Adimalla Naga Manohar · All rights reserved</p>
        </div>
      </section>

    </div>
  );
}
