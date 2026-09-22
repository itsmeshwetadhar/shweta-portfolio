import React, { useState, useEffect, useRef } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  Code2, 
  Cpu, 
  BookOpen, 
  Award, 
  Sparkles, 
  Terminal, 
  Layers, 
  FileText, 
  ChevronRight, 
  Send, 
  CheckCircle2, 
  XCircle, 
  Loader2, 
  Menu, 
  X, 
  Sun, 
  Moon,
  Database,
  Brain,
  Globe,
  Star
} from 'lucide-react';

// Custom inline SVG icons for GitHub and LinkedIn (brand icons removed in newer lucide-react versions)
const Github = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const Linkedin = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  // EmailJS Form States
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    loading: false,
    success: false,
    error: null,
    message: ''
  });

  // EmailJS Credentials provided by user
  const EMAILJS_SERVICE_ID = 'service_9pdfknp';
  const EMAILJS_TEMPLATE_ID = 'template_c7mv32k';
  const EMAILJS_PUBLIC_KEY = 'r60hKx4pO_aoirBak';

  useEffect(() => {
    // Dynamically load EmailJS SDK script if not already loaded
    if (!window.emailjs) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
      script.async = true;
      script.onload = () => {
        if (window.emailjs) {
          window.emailjs.init(EMAILJS_PUBLIC_KEY);
        }
      };
      document.body.appendChild(script);
    } else {
      window.emailjs.init(EMAILJS_PUBLIC_KEY);
    }
  }, [EMAILJS_PUBLIC_KEY]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'skills', 'projects', 'achievements', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ loading: true, success: false, error: null, message: '' });

    // Validate inputs
    if (!formData.from_name || !formData.from_email || !formData.message) {
      setFormStatus({
        loading: false,
        success: false,
        error: true,
        message: 'Please fill in all required fields.'
      });
      return;
    }

    try {
      if (window.emailjs) {
        // Submit using EmailJS SDK
        const response = await window.emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            from_name: formData.from_name,
            from_email: formData.from_email,
            reply_to: formData.from_email,
            subject: formData.subject || 'Portfolio Contact Inquiry',
            message: formData.message,
            to_name: 'Shweta Dhar'
          },
          EMAILJS_PUBLIC_KEY
        );

        if (response.status === 200 || response.text === 'OK') {
          setFormStatus({
            loading: false,
            success: true,
            error: null,
            message: 'Thank you! Your message has been sent directly to Shweta Dhar.'
          });
          setFormData({ from_name: '', from_email: '', subject: '', message: '' });
        } else {
          throw new Error('Failed to send email.');
        }
      } else {
        // Fallback REST API call if script hasn't initialized
        const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service_id: EMAILJS_SERVICE_ID,
            template_id: EMAILJS_TEMPLATE_ID,
            user_id: EMAILJS_PUBLIC_KEY,
            template_params: {
              from_name: formData.from_name,
              from_email: formData.from_email,
              reply_to: formData.from_email,
              subject: formData.subject || 'Portfolio Contact Inquiry',
              message: formData.message,
              to_name: 'Shweta Dhar'
            }
          })
        });

        if (res.ok) {
          setFormStatus({
            loading: false,
            success: true,
            error: null,
            message: 'Thank you! Your message has been sent successfully.'
          });
          setFormData({ from_name: '', from_email: '', subject: '', message: '' });
        } else {
          const errText = await res.text();
          throw new Error(errText || 'Error submitting email.');
        }
      }
    } catch (err) {
      console.error('EmailJS Error:', err);
      const isTemplateError = err?.text?.includes('template ID not found') || err?.message?.includes('template ID not found');
      
      setFormStatus({
        loading: false,
        success: false,
        error: true,
        isTemplateError: isTemplateError,
        message: isTemplateError
          ? 'EmailJS Error: The Template ID "template_c7mv32k" was not found in your EmailJS account. Please verify your Template ID in EmailJS Dashboard.'
          : 'Unable to send email right now. You can click the fallback button below to mail directly.'
      });
    }
  };

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Achievements', href: '#achievements', id: 'achievements' },
    { name: 'Contact', href: '#contact', id: 'contact' }
  ];

  const skillCategories = [
    {
      title: 'Core & Languages',
      icon: <Code2 className="w-5 h-5 text-indigo-400" />,
      skills: ['Python', 'C++', 'JavaScript', 'HTML5/CSS3', 'SQL', 'Data Structures & Algorithms']
    },
    {
      title: 'Machine Learning & AI',
      icon: <Brain className="w-5 h-5 text-emerald-400" />,
      skills: ['Machine Learning', 'TensorFlow', 'PyTorch', 'Scikit-Learn', 'OpenCV', 'Deep Learning', 'Data Preprocessing']
    },
    {
      title: 'Web & Frameworks',
      icon: <Globe className="w-5 h-5 text-sky-400" />,
      skills: ['React.js', 'Node.js', 'Flask', 'REST APIs', 'Tailwind CSS', 'Bootstrap']
    },
    {
      title: 'Tools & Analytics',
      icon: <Database className="w-5 h-5 text-amber-400" />,
      skills: ['Git / GitHub', 'Pandas & NumPy', 'Matplotlib & Seaborn', 'Jupyter Notebooks', 'VS Code', 'MySQL']
    }
  ];

  const projects = [
    {
      title: 'Interactive ML Data Analytics Dashboard',
      category: 'Machine Learning & Web',
      description: 'Built a feature-rich interactive machine learning visualization and exploratory data analytics application. Integrated customized models with dynamic parameter tuning and interactive data charts.',
      tags: ['Python', 'React', 'Scikit-Learn', 'Pandas', 'Flask'],
      github: 'https://github.com/shwetadhar',
      featured: true
    },
    {
      title: 'AI Computer Vision Gesture Control System',
      category: 'Computer Vision',
      description: 'Engineered a real-time computer vision system using OpenCV and Python to track hand keypoints, translating gestures into desktop system controls and interactive applications.',
      tags: ['Python', 'OpenCV', 'MediaPipe', 'NumPy'],
      github: 'https://github.com/shwetadhar',
      featured: true
    },
    {
      title: 'Smart Health Predictive Analytics Model',
      category: 'Data Science',
      description: 'Designed and trained classification algorithms on health datasets to accurately predict disease risks with high precision, featuring thorough data cleaning and feature engineering pipelines.',
      tags: ['Python', 'Scikit-Learn', 'Matplotlib', 'Jupyter'],
      github: 'https://github.com/shwetadhar',
      featured: false
    }
  ];

  const achievements = [
    {
      title: 'NASA Space Apps Challenge Participant',
      category: 'Global Hackathon',
      date: 'NASA Space Apps',
      description: 'Participated in the prestigious global hackathon, collaborating on innovative space science solutions using NASA open data sources.',
      icon: <Sparkles className="w-6 h-6 text-amber-400" />,
      badge: 'NASA Hackathon'
    },
    {
      title: 'Research Paper Publication',
      category: 'Academic Achievement',
      date: 'Published Author',
      description: 'Co-authored and published research work focusing on algorithmic intelligence and data systems application.',
      icon: <BookOpen className="w-6 h-6 text-indigo-400" />,
      badge: 'IEEE / Academic Journal'
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? darkMode ? 'bg-slate-950/85 backdrop-blur-md border-b border-slate-800 shadow-lg' : 'bg-white/85 backdrop-blur-md border-b border-slate-200 shadow-md'
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="#home" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-105 transition-transform">
                SD
              </div>
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">
                Shweta Dhar
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === link.id
                      ? 'text-indigo-400 bg-indigo-500/10 font-semibold'
                      : darkMode ? 'text-slate-300 hover:text-white hover:bg-slate-800/50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {link.name}
                </a>
              ))}

              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`ml-3 p-2 rounded-lg transition-colors ${
                  darkMode ? 'bg-slate-800 text-amber-300 hover:bg-slate-700' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
                title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg ${darkMode ? 'bg-slate-800 text-amber-300' : 'bg-slate-200 text-slate-700'}`}
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-lg ${darkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-100'}`}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className={`md:hidden border-b px-4 pt-2 pb-4 space-y-1 ${
            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  activeSection === link.id
                    ? 'text-indigo-400 bg-indigo-500/10'
                    : darkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </nav>

      {}
      <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Passionate Computer Science & AI Developer</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4">
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                  Shweta Dhar
                </span>
              </h1>

              <p className={`text-lg sm:text-xl max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed ${
                darkMode ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Software Developer interested in building intelligent systems, data analytics solutions, and impactful web applications.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-lg shadow-indigo-600/25 transition-all hover:scale-105"
                >
                  <Send className="w-4 h-4" />
                  Get In Touch
                </a>
                <a
                  href="#projects"
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium border transition-all hover:scale-105 ${
                    darkMode 
                      ? 'border-slate-800 bg-slate-900/50 hover:bg-slate-800 text-slate-200' 
                      : 'border-slate-300 bg-white hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  <Code2 className="w-4 h-4" />
                  View Projects
                </a>
                <a
                  href="https://github.com/shwetadhar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl border transition-colors ${
                    darkMode ? 'border-slate-800 bg-slate-900/50 hover:bg-slate-800 text-slate-300' : 'border-slate-300 bg-white hover:bg-slate-100 text-slate-700'
                  }`}
                  title="GitHub Profile"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/in/shweta-dhar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl border transition-colors ${
                    darkMode ? 'border-slate-800 bg-slate-900/50 hover:bg-slate-800 text-slate-300' : 'border-slate-300 bg-white hover:bg-slate-100 text-slate-700'
                  }`}
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-5 h-5 text-sky-400" />
                </a>
              </div>

              {/* Quick info bar */}
              <div className={`grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t ${
                darkMode ? 'border-slate-800/80 text-slate-400' : 'border-slate-200 text-slate-600'
              }`}>
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Location</p>
                  <p className="text-sm font-medium mt-1 flex items-center justify-center lg:justify-start gap-1">
                    <MapPin className="w-3.5 h-3.5 text-indigo-400" /> India
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Focus</p>
                  <p className="text-sm font-medium mt-1 text-emerald-400">Software & ML</p>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Publications</p>
                  <p className="text-sm font-medium mt-1 text-indigo-400">1 Co-Authored</p>
                </div>
              </div>
            </div>

            {/* Visual Avatar / Graphic Box */}
            <div className="w-full max-w-md lg:max-w-none lg:w-96">
              <div className={`relative rounded-3xl p-6 border shadow-2xl backdrop-blur-xl ${
                darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white/80 border-slate-200'
              }`}>
                <div className="absolute -top-3 -right-3 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-slate-950 animate-pulse" />
                  Open for Opportunities
                </div>

                <div className="w-32 h-32 mx-auto rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 p-1 mb-6 shadow-xl">
                  <div className={`w-full h-full rounded-[14px] flex items-center justify-center ${
                    darkMode ? 'bg-slate-950' : 'bg-white'
                  }`}>
                    <Terminal className="w-14 h-14 text-indigo-400" />
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <h3 className="font-bold text-xl">Shweta Dhar</h3>
                  <p className="text-xs text-indigo-400 font-mono">shwetadhar777@gmail.com</p>
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Driven developer with a strong foundation in problem solving, data analytics, and modern programming.
                  </p>
                </div>

                <div className={`mt-6 pt-4 border-t space-y-2 text-xs font-mono ${
                  darkMode ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'
                }`}>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="text-emerald-400">Active Learner</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hackathon:</span>
                    <span className="text-indigo-400">NASA Space Apps</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {}
      <section id="about" className={`py-20 border-t ${darkMode ? 'bg-slate-900/40 border-slate-800/80' : 'bg-slate-100/70 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">Background</h2>
            <h3 className="text-3xl font-extrabold sm:text-4xl">About Me</h3>
            <p className={`mt-4 text-base sm:text-lg ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Bridging theory and application in Computer Science, AI, and Software Engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            <div className={`p-8 rounded-2xl border flex flex-col justify-between ${
              darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div>
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-6">
                  <Cpu className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold mb-4">Who I Am</h4>
                <p className={`leading-relaxed mb-4 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  I am a passionate technology enthusiast with a keen interest in Artificial Intelligence, Machine Learning, and Software Development. My goal is to build intelligent applications that simplify user experiences and extract value from complex data.
                </p>
                <p className={`leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  I enjoy solving computational challenges, actively collaborating on team projects, participating in international tech competitions like the NASA Space Apps Challenge, and publishing research insights.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800/50 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-lg text-xs font-medium bg-indigo-500/10 text-indigo-400">Problem Solving</span>
                <span className="px-3 py-1 rounded-lg text-xs font-medium bg-emerald-500/10 text-emerald-400">Machine Learning</span>
                <span className="px-3 py-1 rounded-lg text-xs font-medium bg-sky-500/10 text-sky-400">Web Engineering</span>
              </div>
            </div>

            <div className={`p-8 rounded-2xl border flex flex-col justify-between ${
              darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6">
                  <Award className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold mb-4">Highlights & Milestones</h4>
                
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">NASA Space Apps Hackathon</p>
                      <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Participated in solving real-world space and earth science challenges.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Published Research Author</p>
                      <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Co-authored academic research exploring tech and algorithmic solutions.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Hands-on Software Development</p>
                      <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Constructed predictive ML models, web dashboards, and computer vision systems.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800/50 flex items-center justify-between">
                <span className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Direct Contact:</span>
                <a href="mailto:shwetadhar777@gmail.com" className="text-xs font-mono text-indigo-400 hover:underline">
                  shwetadhar777@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <section id="skills" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">Capabilities</h2>
            <h3 className="text-3xl font-extrabold sm:text-4xl">Skills & Technical Stack</h3>
            <p className={`mt-4 text-base sm:text-lg ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              A comprehensive breakdown of tools, frameworks, and programming languages I work with.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((cat, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl border transition-all hover:-translate-y-1 ${
                  darkMode ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:shadow-lg'
                }`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50">
                    {cat.icon}
                  </div>
                  <h4 className="font-bold text-base">{cat.title}</h4>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${
                        darkMode 
                          ? 'bg-slate-800/40 border-slate-700/60 text-slate-200' 
                          : 'bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section id="projects" className={`py-20 border-t ${darkMode ? 'bg-slate-900/40 border-slate-800/80' : 'bg-slate-100/70 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">Portfolio</h2>
            <h3 className="text-3xl font-extrabold sm:text-4xl">Featured Projects</h3>
            <p className={`mt-4 text-base sm:text-lg ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Selected technical endeavors highlighting machine learning, computer vision, and software engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((proj, pIdx) => (
              <div
                key={pIdx}
                className={`rounded-2xl border overflow-hidden flex flex-col justify-between transition-all hover:scale-[1.02] ${
                  darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-md'
                }`}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      {proj.category}
                    </span>
                    {proj.featured && (
                      <span className="text-xs font-semibold text-amber-400 flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400" /> Featured
                      </span>
                    )}
                  </div>

                  <h4 className="text-xl font-bold mb-3">{proj.title}</h4>
                  <p className={`text-sm leading-relaxed mb-6 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {proj.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className={`text-xs px-2.5 py-1 rounded-md font-mono ${
                          darkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={`p-4 px-6 border-t flex items-center justify-between ${
                  darkMode ? 'border-slate-800/80 bg-slate-900/30' : 'border-slate-100 bg-slate-50'
                }`}>
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-medium text-indigo-400 hover:text-indigo-300"
                  >
                    <Github className="w-4 h-4" /> Code Repository
                  </a>
                  <ExternalLink className="w-4 h-4 text-slate-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section id="achievements" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">Recognition</h2>
            <h3 className="text-3xl font-extrabold sm:text-4xl">Achievements & Research</h3>
            <p className={`mt-4 text-base sm:text-lg ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Key milestones across international hackathons and scholarly publishing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {achievements.map((ach, aIdx) => (
              <div
                key={aIdx}
                className={`p-8 rounded-2xl border flex items-start gap-6 relative overflow-hidden ${
                  darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 shrink-0">
                  {ach.icon}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {ach.badge}
                    </span>
                    <span className={`text-xs ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                      {ach.date}
                    </span>
                  </div>

                  <h4 className="text-xl font-bold mb-2">{ach.title}</h4>
                  <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {ach.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section id="contact" className={`py-20 border-t ${darkMode ? 'bg-slate-900/40 border-slate-800/80' : 'bg-slate-100/70 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">Connect</h2>
            <h3 className="text-3xl font-extrabold sm:text-4xl">Get In Touch</h3>
            <p className={`mt-4 text-base sm:text-lg ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Send a direct message through the integrated form or reach out directly to my email address.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-5 space-y-6">
              <div className={`p-8 rounded-2xl border ${
                darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <h4 className="text-xl font-bold mb-6">Contact Information</h4>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Email Address</p>
                      <a href="mailto:shwetadhar777@gmail.com" className="text-sm font-medium hover:text-indigo-400 transition-colors">
                        shwetadhar777@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">LinkedIn</p>
                      <a href="https://linkedin.com/in/shweta-dhar" target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-emerald-400 transition-colors">
                        linkedin.com/in/shweta-dhar
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-sky-500/10 text-sky-400 shrink-0">
                      <Github className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">GitHub</p>
                      <a href="https://github.com/shwetadhar" target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-sky-400 transition-colors">
                        github.com/shwetadhar
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Location</p>
                      <p className="text-sm font-medium">India</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Box */}
              <div className={`p-6 rounded-2xl border text-sm ${
                darkMode ? 'bg-indigo-950/30 border-indigo-900/50 text-indigo-300' : 'bg-indigo-50 border-indigo-200 text-indigo-800'
              }`}>
                <p className="font-semibold mb-1 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Live Form Integration
                </p>
                <p className="text-xs opacity-90">
                  Submissions are sent live via EmailJS directly to <span className="font-mono">shwetadhar777@gmail.com</span>.
                </p>
              </div>
            </div>

            {/* Live EmailJS Form */}
            <div className="lg:col-span-7">
              <form onSubmit={handleFormSubmit} className={`p-8 rounded-2xl border space-y-5 ${
                darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <h4 className="text-xl font-bold mb-2">Send a Message</h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                      Your Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="from_name"
                      required
                      value={formData.from_name}
                      onChange={handleInputChange}
                      placeholder="e.g. Alex Smith"
                      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${
                        darkMode 
                          ? 'bg-slate-950/60 border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500' 
                          : 'bg-slate-50 border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                      Your Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="from_email"
                      required
                      value={formData.from_email}
                      onChange={handleInputChange}
                      placeholder="e.g. alex@example.com"
                      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${
                        darkMode 
                          ? 'bg-slate-950/60 border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500' 
                          : 'bg-slate-50 border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Project Inquiry / Opportunity"
                    className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${
                      darkMode 
                        ? 'bg-slate-950/60 border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500' 
                        : 'bg-slate-50 border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows="5"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Hello Shweta, I would like to connect with you regarding..."
                    className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all resize-none ${
                      darkMode 
                        ? 'bg-slate-950/60 border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500' 
                        : 'bg-slate-50 border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                    }`}
                  />
                </div>

                {/* Status alerts */}
                {formStatus.success && (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                    <span>{formStatus.message}</span>
                  </div>
                )}

                {formStatus.error && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm space-y-3">
                    <div className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 shrink-0 text-red-400 mt-0.5" />
                      <div>
                        <p className="font-semibold">{formStatus.message}</p>
                        {formStatus.isTemplateError && (
                          <p className="text-xs text-red-300 mt-1">
                            Go to <a href="https://dashboard.emailjs.com/admin/templates" target="_blank" rel="noopener noreferrer" className="underline font-bold">dashboard.emailjs.com/admin/templates</a>, copy your exact Template ID, and verify it matches the public key <code>r60hKx4pO_aoirBak</code>.
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Direct Mailto Fallback Button */}
                    <a
                      href={`mailto:shwetadhar777@gmail.com?subject=${encodeURIComponent(formData.subject || 'Portfolio Contact Inquiry')}&body=${encodeURIComponent(`Name: ${formData.from_name}\nEmail: ${formData.from_email}\n\nMessage:\n${formData.message}`)}`}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-500/30 transition-colors w-full"
                    >
                      <Mail className="w-4 h-4" />
                      Send via Default Email Client
                    </a>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formStatus.loading}
                  className="w-full py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {formStatus.loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {}
      <footer className={`py-8 border-t text-sm ${
        darkMode ? 'border-slate-800/80 text-slate-500' : 'border-slate-200 text-slate-600'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Shweta Dhar. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="https://github.com/shwetadhar" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">GitHub</a>
            <a href="https://linkedin.com/in/shweta-dhar" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">LinkedIn</a>
            <a href="mailto:shwetadhar777@gmail.com" className="hover:text-indigo-400 transition-colors">Email</a>
          </div>
        </div>
      </footer>

    </div>
  );
}