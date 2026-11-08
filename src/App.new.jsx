import React, { useCallback, useState, useEffect, useRef } from 'react';
import {
  BookOpen,
  Award,
  GraduationCap,
  Code,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  ChevronLeft,
  Volume2,
  VolumeX,
  Lightbulb,
  User,
  CheckCircle2,
  Send,
  ExternalLink
} from 'lucide-react';

const cvData = {
  name: 'NGEVAO FORYOH',
  title: 'Computer Science Student & ICT Specialist',
  contact: {
    email: 'ngevaoaforyoh@gmail.com',
    phone: '+232 79 633 366',
    location: 'Kailahun Town, Sierra Leone',
    openTo: 'Remote & Onsite Internships / Entry Roles'
  },
  about: 'I am a Year Two Computer Science student at Njala University and a certified ICT professional from GTI Kailahun. I enjoy building clean websites, writing straightforward code in Python and Java, and tackling real-world tech challenges. With strong attention to detail and a top-class academic record, I am actively looking for internship and entry-level opportunities in software development, web development, data annotation, and technical administration.',
  education: [
    {
      institution: 'Njala University',
      degree: 'Bachelor of Science in Computer Science (Year Two)',
      period: '2024 - Present',
      gpa: '4.49 / 5.00',
      highlights: 'Maintained a 4.49 GPA across first two years of study.',
      courses: ['Software Development', 'Web Programming', 'Data Structures', 'Applied Mathematics', 'Systems Analysis']
    },
    {
      institution: 'Government Technical Institute (GTI)',
      degree: 'Certificate in Information & Communication Technology (ICT)',
      location: 'Kailahun',
      period: '2023 - 2024',
      highlights: 'Awarded Top-Achieving Student for earning high grades across all subjects.',
      courses: ['Networking', 'Data Communication', 'Office Applications', 'Operating Systems']
    },
    {
      institution: 'Methodist Secondary School',
      degree: 'Senior Secondary Education & WASSCE',
      location: 'Kailahun, Sierra Leone',
      period: '2021 - 2023'
    }
  ],
  skills: {
    dev: [
      { name: 'Python', level: 85 },
      { name: 'Java', level: 80 },
      { name: 'HTML5 / CSS3', level: 90 },
      { name: 'JavaScript (Basics)', level: 75 },
      { name: 'Web Design', level: 85 }
    ],
    productivity: ['MS Office (Word, Excel, PowerPoint)', 'Data Entry', 'Technical Documentation'],
    systems: ['Windows OS', 'Technical Support', 'Guideline Adherence', 'Remote Work Tools'],
    languages: ['English (Fluent)', 'Kissi (Native)']
  },
  experience: [
    {
      title: 'Academic & Practical Coding Projects',
      organization: 'Njala University & GTI Labs',
      period: '2023 - Present',
      bullets: [
        'Web Projects: Designed responsive webpages using clean HTML and CSS layout techniques.',
        'Programming Exercises: Solved logical problems and built small software tools in Python and Java.',
        'Research: Reviewed software development models and methods for reducing technical errors.'
      ]
    },
    {
      title: 'Advocacy Volunteer',
      organization: 'Children Forum Network',
      location: 'Kailahun, Sierra Leone',
      period: '2021 - Present',
      bullets: ['Participated in community initiatives promoting children\'s rights, education, and equal opportunities.']
    },
    {
      title: 'Member of the Prefectorial Board',
      organization: 'Methodist Secondary School',
      period: '2022 - 2023',
      bullets: ['Supported student leadership, guided younger students, and assisted school staff with events.']
    }
  ],
  awards: [
    { title: 'Best Certificate Award (2024)', issuer: 'Send Sierra Leone' },
    { title: 'Top Academic Performance Award in ICT (2023-2024)', issuer: 'GTI Kailahun' }
  ],
  references: [
    { name: 'MR. KANGOMA MANSARAY', title: 'Lecturer, Njala University', phone: '+232 78 977 771', email: 'kangoma.mansaray56449@njala.edu.sl' },
    { name: 'MR. FOCKO', title: 'Lecturer, GTI Kailahun', phone: '+232 76 367 366' }
  ]
};

const currentYear = new Date().getFullYear();

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [lampOn, setLampOn] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const audioCtxRef = useRef(null);

  const playPageTurnSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      const bufferSize = ctx.sampleRate * 0.15;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i += 1) {
        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }
      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 800;
      filter.Q.value = 1.0;
      whiteNoise.connect(filter);
      filter.connect(ctx.destination);
      whiteNoise.start();
    } catch (error) {
      console.warn('Page-turn audio could not be played:', error);
    }
  }, [soundEnabled]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 15;
      const y = (e.clientY / innerHeight - 0.5) * 15;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const openBook = () => {
    playPageTurnSound();
    setIsOpen(true);
    setCurrentPage(1);
  };

  const nextPage = useCallback(() => {
    if (currentPage < 4) {
      playPageTurnSound();
      setCurrentPage((prev) => prev + 1);
    }
  }, [currentPage, playPageTurnSound]);

  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      playPageTurnSound();
      setCurrentPage((prev) => prev - 1);
    } else {
      playPageTurnSound();
      setIsOpen(false);
      setCurrentPage(0);
    }
  }, [currentPage, playPageTurnSound]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight' && currentPage < 4) {
        nextPage();
      } else if (e.key === 'ArrowLeft' && currentPage > 0) {
        prevPage();
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentPage, nextPage, prevPage]);

  return (
    <div className={`relative min-h-screen w-full overflow-hidden transition-colors duration-700 select-none ${lampOn ? 'bg-[#0a0a0c]' : 'bg-[#030304]'}`}>
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          background: lampOn
            ? 'radial-gradient(circle at 50% 30%, rgba(255, 205, 140, 0.15) 0%, rgba(10, 10, 12, 0.95) 75%)'
            : 'radial-gradient(circle at 50% 30%, rgba(100, 120, 180, 0.05) 0%, rgba(3, 3, 4, 0.98) 80%)'
        }}
      />

      <header className="relative z-50 flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40 backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-mono text-neutral-400 tracking-wider">PALASH TECH STUDIO • INTERACTIVE PORTFOLIO</span>
        </div>

        <div className="flex items-center space-x-4">
          <a
            href={`mailto:${cvData.contact.email}?subject=Inquiry%20for%20Ngevao%20Foryoh%20-%20Portfolio`}
            className="px-4 py-1.5 rounded-full text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-black transition-all shadow-lg flex items-center space-x-1.5"
          >
            <Send size={12} />
            <span>Hire Me</span>
          </a>

          <button
            onClick={() => setLampOn(!lampOn)}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              lampOn ? 'bg-amber-500/20 border-amber-500/40 text-amber-300' : 'bg-neutral-800 border-neutral-700 text-neutral-400'
            }`}
          >
            <Lightbulb size={14} />
            <span>{lampOn ? 'Desk Lamp ON' : 'Desk Lamp OFF'}</span>
          </button>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-full border border-neutral-700 text-neutral-300 hover:bg-neutral-800 transition-colors"
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
        </div>
      </header>

      <main className="relative z-10 flex min-h-[calc(100vh-65px)] items-center justify-center p-4 md:p-8">
        <div
          className="relative w-full max-w-6xl transition-transform duration-300 ease-out flex flex-col items-center justify-center"
          style={{
            transform: `perspective(1200px) rotateX(${mousePos.y * 0.3}deg) rotateY(${mousePos.x * 0.3}deg)`
          }}
        >
          <div className="absolute top-4 right-12 hidden md:flex items-center space-x-6 opacity-60 pointer-events-none">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-4 border-neutral-700 bg-neutral-900 shadow-inner flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-[#4a2e18] border border-amber-900/40" />
              </div>
              {lampOn && <div className="absolute -top-4 left-4 w-1 h-4 bg-white/20 rounded-full blur-sm animate-bounce" />}
            </div>
            <div className="w-24 h-1 bg-amber-700/60 rounded-full rotate-12" />
          </div>

          <div className={`relative transition-all duration-700 ${isOpen ? 'w-full max-w-5xl h-[680px]' : 'w-80 md:w-96 h-[520px] cursor-pointer group'}`}>
            {!isOpen && (
              <div
                onClick={openBook}
                className="w-full h-full rounded-r-2xl rounded-l-md bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 border-r-4 border-y border-neutral-800 shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between p-8 transform transition-transform duration-300 group-hover:-translate-y-2 group-hover:rotate-1"
              >
                <div className="flex justify-between items-start">
                  <div className="p-2 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <BookOpen size={24} />
                  </div>
                  <span className="text-xs font-mono text-neutral-500">2026 EDITION</span>
                </div>

                <div className="space-y-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase">
                    GPA 4.49 / 5.00
                  </span>
                  <h1 className="text-3xl font-bold text-white tracking-tight leading-none">{cvData.name}</h1>
                  <p className="text-xs text-neutral-400 font-mono">{cvData.title}</p>
                </div>

                <div className="pt-6 border-t border-neutral-800/80 flex items-center justify-between">
                  <span className="text-xs text-neutral-400 group-hover:text-amber-400 transition-colors flex items-center gap-1">
                    Click to Open Portfolio <ChevronRight size={14} />
                  </span>
                  <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                </div>
              </div>
            )}

            {isOpen && (
              <div className="w-full h-full rounded-2xl bg-[#141417] border border-neutral-800 shadow-2xl flex flex-col md:flex-row overflow-hidden relative">
                <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -ml-px w-0.5 bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-800 z-30 shadow-inner" />

                {currentPage === 1 && (
                  <div className="w-full h-full flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-neutral-800/80">
                    <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                      <div className="space-y-4">
                        <span className="text-xs font-mono text-amber-400 tracking-widest uppercase">TABLE OF CONTENTS</span>
                        <h2 className="text-xl font-bold text-white">Jump to Section</h2>
                        <div className="space-y-2 pt-2">
                          <button onClick={() => { playPageTurnSound(); setCurrentPage(2); }} className="w-full text-left p-2.5 rounded bg-neutral-900 hover:bg-neutral-800 text-xs text-neutral-200 flex justify-between items-center">
                            <span>01. Executive Profile & Education</span>
                            <ChevronRight size={14} className="text-amber-400" />
                          </button>
                          <button onClick={() => { playPageTurnSound(); setCurrentPage(3); }} className="w-full text-left p-2.5 rounded bg-neutral-900 hover:bg-neutral-800 text-xs text-neutral-200 flex justify-between items-center">
                            <span>02. Technical Skills & Awards</span>
                            <ChevronRight size={14} className="text-amber-400" />
                          </button>
                          <button onClick={() => { playPageTurnSound(); setCurrentPage(4); }} className="w-full text-left p-2.5 rounded bg-neutral-900 hover:bg-neutral-800 text-xs text-neutral-200 flex justify-between items-center">
                            <span>03. Experience & References</span>
                            <ChevronRight size={14} className="text-amber-400" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-neutral-500">Use the arrow buttons or keyboard arrows to turn pages.</p>
                    </div>
                    <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center items-center text-center">
                      <div className="mb-5 rounded-full border border-amber-500/20 bg-amber-500/10 p-4 text-amber-400">
                        <BookOpen size={30} />
                      </div>
                      <span className="text-xs font-mono tracking-widest text-amber-400">WELCOME</span>
                      <h2 className="mt-3 text-2xl font-bold text-white">{cvData.name}</h2>
                      <p className="mt-2 max-w-sm text-sm leading-relaxed text-neutral-400">Explore my education, skills, projects, and experience in this interactive portfolio.</p>
                      <a href={`mailto:${cvData.contact.email}`} className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-500 px-4 py-2 text-xs font-semibold text-black transition-colors hover:bg-amber-400">
                        <Mail size={14} />Get in touch
                      </a>
                    </div>
                  </div>
                )}

                {currentPage === 2 && (
                  <div className="grid h-full w-full grid-cols-1 md:grid-cols-2">
                    <section className="overflow-y-auto p-6 md:p-8">
                      <span className="text-xs font-mono tracking-widest text-amber-400">01 / PROFILE</span>
                      <h2 className="mt-3 text-xl font-bold text-white">About Me</h2>
                      <p className="mt-4 text-sm leading-relaxed text-neutral-300">{cvData.about}</p>
                      <div className="mt-6 space-y-3 text-xs text-neutral-300">
                        <p className="flex items-center gap-2"><MapPin size={14} className="text-amber-400" />{cvData.contact.location}</p>
                        <p className="flex items-center gap-2"><Mail size={14} className="text-amber-400" />{cvData.contact.email}</p>
                        <p className="flex items-center gap-2"><Phone size={14} className="text-amber-400" />{cvData.contact.phone}</p>
                      </div>
                    </section>
                    <section className="overflow-y-auto border-t border-neutral-800 p-6 md:border-l md:border-t-0 md:p-8">
                      <span className="text-xs font-mono tracking-widest text-amber-400">EDUCATION</span>
                      <div className="mt-4 space-y-5">
                        {cvData.education.map((item) => (
                          <article key={item.institution} className="border-l border-amber-500/40 pl-4">
                            <div className="flex items-start gap-2">
                              <GraduationCap size={16} className="mt-0.5 shrink-0 text-amber-400" />
                              <div>
                                <h3 className="text-sm font-semibold text-white">{item.institution}</h3>
                                <p className="mt-1 text-xs text-neutral-300">{item.degree}</p>
                                <p className="mt-1 text-[11px] text-neutral-500">{item.period}{item.gpa ? ` · GPA ${item.gpa}` : ''}</p>
                                {item.highlights && <p className="mt-2 text-xs leading-relaxed text-neutral-400">{item.highlights}</p>}
                              </div>
                            </div>
                          </article>
                        ))}
                      </div>
                    </section>
                  </div>
                )}

                {currentPage === 3 && (
                  <div className="grid h-full w-full grid-cols-1 md:grid-cols-2">
                    <section className="overflow-y-auto p-6 md:p-8">
                      <span className="text-xs font-mono tracking-widest text-amber-400">02 / TOOLKIT</span>
                      <h2 className="mt-3 flex items-center gap-2 text-xl font-bold text-white"><Code size={18} className="text-amber-400" />Technical Skills</h2>
                      <div className="mt-5 space-y-4">
                        {cvData.skills.dev.map((skill) => (
                          <div key={skill.name}>
                            <div className="mb-1 flex justify-between text-xs text-neutral-300">
                              <span>{skill.name}</span><span>{skill.level}%</span>
                            </div>
                            <div className="h-1.5 overflow-hidden rounded-full bg-neutral-800">
                              <div className="h-full rounded-full bg-amber-500" style={{ width: `${skill.level}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                      <h3 className="mt-6 text-xs font-semibold uppercase tracking-wider text-neutral-300">Productivity & Systems</h3>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {[...cvData.skills.productivity, ...cvData.skills.systems].map((skill) => (
                          <span key={skill} className="rounded-full border border-neutral-700 bg-neutral-900 px-2.5 py-1 text-[11px] text-neutral-300">{skill}</span>
                        ))}
                      </div>
                      <p className="mt-4 text-xs text-neutral-400">Languages: {cvData.skills.languages.join(' · ')}</p>
                    </section>
                    <section className="overflow-y-auto border-t border-neutral-800 p-6 md:border-l md:border-t-0 md:p-8">
                      <span className="text-xs font-mono tracking-widest text-amber-400">RECOGNITION</span>
                      <h2 className="mt-3 flex items-center gap-2 text-xl font-bold text-white"><Award size={18} className="text-amber-400" />Awards</h2>
                      <div className="mt-5 space-y-3">
                        {cvData.awards.map((award) => (
                          <article key={award.title} className="flex gap-3 rounded-lg border border-neutral-800 bg-neutral-900/70 p-4">
                            <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-emerald-400" />
                            <div>
                              <h3 className="text-sm font-semibold text-white">{award.title}</h3>
                              <p className="mt-1 text-xs text-neutral-400">{award.issuer}</p>
                            </div>
                          </article>
                        ))}
                      </div>
                    </section>
                  </div>
                )}

                {currentPage === 4 && (
                  <div className="grid h-full w-full grid-cols-1 md:grid-cols-2">
                    <section className="overflow-y-auto p-6 md:p-8">
                      <span className="text-xs font-mono tracking-widest text-amber-400">03 / EXPERIENCE</span>
                      <h2 className="mt-3 flex items-center gap-2 text-xl font-bold text-white"><Briefcase size={18} className="text-amber-400" />Experience & Projects</h2>
                      <div className="mt-5 space-y-5">
                        {cvData.experience.map((item) => (
                          <article key={`${item.title}-${item.organization}`} className="border-l border-amber-500/40 pl-4">
                            <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                            <p className="mt-1 text-xs text-amber-300">{item.organization}</p>
                            <p className="mt-1 text-[11px] text-neutral-500">{item.period}{item.location ? ` · ${item.location}` : ''}</p>
                            <ul className="mt-2 space-y-1.5">
                              {item.bullets.map((bullet) => <li key={bullet} className="text-xs leading-relaxed text-neutral-400">{bullet}</li>)}
                            </ul>
                          </article>
                        ))}
                      </div>
                    </section>
                    <section className="overflow-y-auto border-t border-neutral-800 p-6 md:border-l md:border-t-0 md:p-8">
                      <span className="text-xs font-mono tracking-widest text-amber-400">LET'S CONNECT</span>
                      <h2 className="mt-3 text-xl font-bold text-white">References</h2>
                      <div className="mt-5 space-y-3">
                        {cvData.references.map((reference) => (
                          <article key={reference.name} className="rounded-lg border border-neutral-800 bg-neutral-900/70 p-4">
                            <h3 className="flex items-center gap-2 text-sm font-semibold text-white"><User size={15} className="text-amber-400" />{reference.name}</h3>
                            <p className="mt-1 text-xs text-neutral-400">{reference.title}</p>
                            <div className="mt-3 space-y-2 text-xs text-neutral-300">
                              <a className="flex items-center gap-2 hover:text-amber-300" href={`tel:${reference.phone}`}><Phone size={13} />{reference.phone}</a>
                              {reference.email && <a className="flex items-center gap-2 break-all hover:text-amber-300" href={`mailto:${reference.email}`}><Mail size={13} />{reference.email}</a>}
                            </div>
                          </article>
                        ))}
                      </div>
                      <p className="mt-5 text-xs text-neutral-400">{cvData.contact.openTo}</p>
                      <a href={`mailto:${cvData.contact.email}`} className="mt-4 inline-flex items-center gap-2 rounded-full bg-amber-500 px-4 py-2 text-xs font-semibold text-black transition-colors hover:bg-amber-400">
                        <Mail size={14} />Contact me<ExternalLink size={12} />
                      </a>
                    </section>
                  </div>
                )}

                <div className="absolute inset-x-0 bottom-0 z-40 flex items-center justify-between border-t border-neutral-800 bg-[#141417]/95 px-4 py-3 md:px-6">
                  <button onClick={prevPage} className="inline-flex items-center gap-1 rounded-full border border-neutral-700 px-3 py-1.5 text-xs text-neutral-300 transition-colors hover:bg-neutral-800" aria-label="Previous page">
                    <ChevronLeft size={14} /> Previous
                  </button>
                  <span className="text-[11px] font-mono text-neutral-500">PAGE {currentPage} / 4</span>
                  {currentPage < 4 ? (
                    <button onClick={nextPage} className="inline-flex items-center gap-1 rounded-full border border-neutral-700 px-3 py-1.5 text-xs text-neutral-300 transition-colors hover:bg-neutral-800" aria-label="Next page">
                      Next <ChevronRight size={14} />
                    </button>
                  ) : (
                    <button onClick={() => { setIsOpen(false); setCurrentPage(0); }} className="rounded-full bg-amber-500 px-3 py-1.5 text-xs font-semibold text-black transition-colors hover:bg-amber-400">
                      Close portfolio
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="relative z-10 border-t border-white/10 px-4 py-3 text-center text-[10px] tracking-wide text-neutral-600">
        © {currentYear} {cvData.name} · Interactive Portfolio
      </footer>
    </div>
  );
}
