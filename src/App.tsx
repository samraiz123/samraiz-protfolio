import { useEffect, useRef, useState, type FormEvent, type MouseEvent, type ReactNode } from 'react';
import * as THREE from 'three';
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Braces,
  Check,
  ChevronDown,
  Code2,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
} from 'lucide-react';
import { education, experience, journey, profile, projects, services, technologyGroups, type Project } from './portfolio';

const navigation = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

function AppScene() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = host.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(33, 1, 0.1, 100);
    camera.position.set(0, 0.15, 8.5);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 700 ? 1.15 : 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const rig = new THREE.Group();
    scene.add(rig);
    const device = new THREE.Group();
    device.rotation.set(-0.08, -0.2, 0.04);
    rig.add(device);

    const frameMaterial = new THREE.MeshPhysicalMaterial({ color: 0x1a2029, metalness: 0.78, roughness: 0.2, clearcoat: 1 });
    const phoneBody = new THREE.Mesh(new THREE.BoxGeometry(2.18, 4.25, 0.16), frameMaterial);
    phoneBody.position.z = -0.02;
    device.add(phoneBody);

    const screenCanvas = document.createElement('canvas');
    screenCanvas.width = 540;
    screenCanvas.height = 1040;
    const context = screenCanvas.getContext('2d');
    if (context) {
      context.fillStyle = '#10151c';
      context.fillRect(0, 0, 540, 1040);
      context.fillStyle = '#171f2a';
      context.fillRect(0, 0, 540, 285);
      context.fillStyle = '#778697';
      context.font = '500 18px sans-serif';
      context.fillText('GOOD EVENING', 42, 62);
      context.fillStyle = '#f5f7fa';
      context.font = '600 37px sans-serif';
      context.fillText('What will you', 42, 118);
      context.fillText('build today?', 42, 164);
      context.fillStyle = '#51b7ee';
      context.beginPath();
      context.roundRect(42, 203, 190, 45, 10);
      context.fill();
      context.fillStyle = '#10151c';
      context.font = '600 17px sans-serif';
      context.fillText('Start a project', 68, 232);
      context.fillStyle = '#f5f7fa';
      context.font = '600 20px sans-serif';
      context.fillText('Your workspace', 42, 341);
      const cardColors = ['#1f2c3a', '#202834', '#1c3035'];
      const labels = ['Donation requests', 'AI outfit ideas', 'App activity'];
      const captions = ['6 new this week', 'Your daily edit', 'Everything in sync'];
      cardColors.forEach((color, index) => {
        const y = 373 + index * 166;
        context.fillStyle = color;
        context.beginPath();
        context.roundRect(36, y, 468, 143, 16);
        context.fill();
        context.fillStyle = ['#53b7ed', '#a889ff', '#63d3bd'][index];
        context.beginPath();
        context.roundRect(56, y + 22, 72, 72, 17);
        context.fill();
        context.fillStyle = '#f5f7fa';
        context.font = '600 20px sans-serif';
        context.fillText(labels[index], 151, y + 53);
        context.fillStyle = '#98a4b3';
        context.font = '16px sans-serif';
        context.fillText(captions[index], 151, y + 83);
        context.fillStyle = '#687889';
        context.fillRect(151, y + 108, 188 + index * 27, 4);
      });
      context.fillStyle = '#7f8b99';
      context.font = '15px sans-serif';
      context.fillText('HOME     PROJECTS     PROFILE', 61, 1012);
    }
    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    screenTexture.colorSpace = THREE.SRGBColorSpace;
    const screenMaterial = new THREE.MeshBasicMaterial({ map: screenTexture, toneMapped: false });
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(2.03, 4.05), screenMaterial);
    screen.position.z = 0.067;
    device.add(screen);

    const speaker = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.065, 0.26, 4, 12),
      new THREE.MeshBasicMaterial({ color: 0x303b49 }),
    );
    speaker.rotation.z = Math.PI / 2;
    speaker.position.set(0, 1.93, 0.075);
    device.add(speaker);

    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x52c7f3, transparent: true, opacity: 0.52 });
    const orbit = new THREE.Mesh(new THREE.TorusGeometry(2.56, 0.012, 8, 160), ringMaterial);
    orbit.rotation.set(0.82, 0.15, -0.36);
    rig.add(orbit);
    const orbitTwo = new THREE.Mesh(
      new THREE.TorusGeometry(2.25, 0.008, 8, 160),
      new THREE.MeshBasicMaterial({ color: 0x6289fa, transparent: true, opacity: 0.38 }),
    );
    orbitTwo.rotation.set(0.36, -0.76, 0.28);
    rig.add(orbitTwo);

    const nodes: THREE.Mesh[] = [];
    const nodeSpecs = [
      { position: [-1.9, 1.35, 0.45], color: 0x65d6bd, geometry: new THREE.IcosahedronGeometry(0.19, 1) },
      { position: [1.88, 0.72, -0.1], color: 0x62b9ee, geometry: new THREE.OctahedronGeometry(0.22) },
      { position: [1.65, -1.5, 0.34], color: 0x698df4, geometry: new THREE.DodecahedronGeometry(0.16) },
    ] as const;
    nodeSpecs.forEach(({ position, color, geometry }) => {
      const node = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color, metalness: 0.22, roughness: 0.25 }));
      node.position.set(position[0], position[1], position[2]);
      rig.add(node);
      nodes.push(node);
    });

    const particleCount = window.innerWidth < 700 ? 130 : 260;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let index = 0; index < particleCount; index += 1) {
      particlePositions[index * 3] = (Math.random() - 0.5) * 8;
      particlePositions[index * 3 + 1] = (Math.random() - 0.5) * 8;
      particlePositions[index * 3 + 2] = (Math.random() - 0.5) * 4 - 1;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({ color: 0xa8b7c8, size: 0.014, transparent: true, opacity: 0.5 });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    scene.add(new THREE.HemisphereLight(0xbcd9f5, 0x1a2430, 2));
    const keyLight = new THREE.PointLight(0xffffff, 48);
    keyLight.position.set(3, 3, 5);
    scene.add(keyLight);
    const cyanLight = new THREE.PointLight(0x4ebdea, 27);
    cyanLight.position.set(-3, -1, 3);
    scene.add(cyanLight);

    let pointerX = 0;
    let pointerY = 0;
    let targetX = 0;
    let targetY = 0;
    const onPointerMove = (event: PointerEvent) => {
      const bounds = container.getBoundingClientRect();
      targetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.2;
      targetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.14;
    };
    container.addEventListener('pointermove', onPointerMove, { passive: true });

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.z = width < 700 ? 10.3 : 8.5;
      camera.updateProjectionMatrix();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    const clock = new THREE.Clock();
    let frame = 0;
    let active = true;
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting;
      if (active) animate();
      else cancelAnimationFrame(frame);
    }, { threshold: 0.05 });
    visibilityObserver.observe(container);

    const animate = () => {
      if (!active) return;
      frame = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.05);
      const time = clock.elapsedTime;
      pointerX = THREE.MathUtils.damp(pointerX, targetX, 3.2, delta);
      pointerY = THREE.MathUtils.damp(pointerY, targetY, 3.2, delta);
      rig.rotation.y = Math.sin(time * 0.34) * 0.045 + pointerX;
      rig.rotation.x = Math.sin(time * 0.24) * 0.025 + pointerY;
      device.position.y = Math.sin(time * 0.8) * 0.07;
      device.rotation.y = -0.2 + Math.sin(time * 0.31) * 0.035 + pointerX * 0.28;
      nodes.forEach((node, index) => {
        node.rotation.x += delta * (0.18 + index * 0.04);
        node.rotation.y += delta * (0.24 + index * 0.03);
      });
      particles.rotation.y = time * 0.018;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      active = false;
      cancelAnimationFrame(frame);
      container.removeEventListener('pointermove', onPointerMove);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>();
      scene.traverse((object) => {
        if (!(object instanceof THREE.Mesh || object instanceof THREE.Points)) return;
        geometries.add(object.geometry);
        (Array.isArray(object.material) ? object.material : [object.material]).forEach((material) => materials.add(material));
      });
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      screenTexture.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="app-scene" ref={host} aria-hidden="true" />;
}

function Cursor() {
  const cursor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const element = cursor.current;
    if (!element) return;
    let x = -100;
    let y = -100;
    const move = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    const over = (event: PointerEvent) => {
      if ((event.target as HTMLElement).closest('a, button, input, textarea, select')) element.classList.add('is-hovering');
      else element.classList.remove('is-hovering');
    };
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerover', over, { passive: true });
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
    };
  }, []);

  return <div ref={cursor} className="custom-cursor" aria-hidden="true" />;
}

function ProjectVisual({ type }: { type: Project['type'] }) {
  return (
    <div className={`project-visual visual-${type}`} aria-hidden="true">
      <div className="visual-orbit visual-orbit-one" />
      <div className="visual-orbit visual-orbit-two" />
      {type === 'mobile' && <PhoneMockup />}
      {type === 'ai' && <FashionMockup />}
      {type === 'concept' && <TailorMockup />}
      {type === 'editorial' && <EditorialMockup />}
      <span className="visual-id">CASE / {type.toUpperCase()}</span>
    </div>
  );
}

function PhoneMockup() {
  return (
    <div className="project-device">
      <span className="project-device-notch" />
      <span className="device-brand"><i>W</i> wasela</span>
      <span className="device-overline">FOOD, SHARED WELL</span>
      <strong>Good food.<br />Good things.</strong>
      <span className="device-action">Find a donation <ArrowUpRight size={12} /></span>
      <span className="device-list"><i /><span>Fresh groceries<small>Available nearby</small></span></span>
    </div>
  );
}

function FashionMockup() {
  return (
    <div className="fashion-mockup">
      <span className="fashion-stamp">O / O</span>
      <span className="fashion-sun" />
      <span className="fashion-line fashion-line-one" />
      <span className="fashion-line fashion-line-two" />
      <div className="fashion-suggestion"><span>YOUR DAILY EDIT</span><i>✳</i><strong>A look<br />of your own.</strong><small>Personalised with AI</small></div>
    </div>
  );
}

function TailorMockup() {
  return (
    <div className="tailor-mockup">
      <div className="tailor-header"><span>TAILORFLOW</span><span>STUDIO / 01</span></div>
      <div className="tailor-body"><div className="tailor-measure"><i /><b /><span /><small>MEASUREMENTS</small></div><div className="tailor-order"><span>ACTIVE ORDER</span><strong>Custom fit</strong><i /><i /><i /></div></div>
      <div className="tailor-footer"><span>CLIENTS</span><span>ORDERS</span><span>STUDIO</span></div>
    </div>
  );
}

function EditorialMockup() {
  return (
    <div className="editorial-mockup">
      <span>VERSCE / JOURNAL</span>
      <i />
      <strong>Words<br />worth<br /><em>keeping.</em></strong>
      <small>AN EDITORIAL WEB PROJECT</small>
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    element.showModal();
    return () => {
      if (element.open) element.close();
    };
  }, []);

  return (
    <dialog className="project-dialog" ref={dialog} onCancel={(event) => { event.preventDefault(); onClose(); }} onClick={(event) => { if (event.target === dialog.current) onClose(); }}>
      <div className="dialog-content">
        <button className="dialog-close icon-button" type="button" onClick={onClose} aria-label="Close project details"><X size={19} /></button>
        <div className="dialog-topline"><span>PROJECT / {project.number}</span><span>{project.status}</span></div>
        <ProjectVisual type={project.type} />
        <div className="dialog-copy">
          <p className="eyebrow">{project.subtitle}</p>
          <h2>{project.name}</h2>
          <p className="dialog-overview">{project.overview}</p>
          <div className="dialog-facts">
            {project.problem && <section><h3>Context</h3><p>{project.problem}</p></section>}
            {project.approach && <section><h3>Approach</h3><p>{project.approach}</p></section>}
            {project.role && <section><h3>My role</h3><p>{project.role}</p></section>}
            {project.features.length > 0 && <section><h3>Features</h3><ul>{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></section>}
            <section><h3>Architecture & notes</h3><p>{project.detailNote}</p></section>
          </div>
          <div className="tag-row">{project.technologies.map((technology) => <span className="tech-tag" key={technology}>{technology}</span>)}</div>
          <div className="dialog-actions">
            {project.github && <a className="button button-secondary" href={project.github} target="_blank" rel="noreferrer"><Github size={15} /> GitHub <ExternalLink size={13} /></a>}
            {project.live && <a className="button button-secondary" href={project.live} target="_blank" rel="noreferrer">Live project <ExternalLink size={13} /></a>}
            {!project.github && !project.live && <span className="dialog-note">Links will be added when available.</span>}
          </div>
        </div>
      </div>
    </dialog>
  );
}

function SectionHeading({ id, index, label, title, children }: { id: string; index: string; label: string; title: ReactNode; children?: ReactNode }) {
  return (
    <div className="section-heading reveal-item">
      <div className="section-heading-main"><p className="section-index"><span>{index}</span> / {label}</p><h2 id={id}>{title}</h2></div>
      {children && <div className="section-heading-aside">{children}</div>}
    </div>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formStatus, setFormStatus] = useState('');

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 650);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const header = document.querySelector<HTMLElement>('.site-header');
    if (!header) return;
    const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 24);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    return () => window.removeEventListener('scroll', updateHeader);
  }, []);

  useEffect(() => {
    const sections = navigation.map((item) => document.querySelector(item.href)).filter((section): section is Element => Boolean(section));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id) setActiveSection(visible.target.id);
    }, { rootMargin: '-22% 0px -58% 0px', threshold: [0, 0.15, 0.4, 0.7] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>('.reveal-item');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [selectedProject]);

  const goTo = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = document.querySelector(href);
    if (!target) return;
    event.preventDefault();
    setMenuOpen(false);
    target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    window.history.replaceState(null, '', href);
  };

  const handleContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const subject = `Portfolio inquiry from ${formData.get('name')}`;
    const body = [
      `Name: ${formData.get('name')}`,
      `Email: ${formData.get('email')}`,
      `Project type: ${formData.get('projectType')}`,
      '',
      String(formData.get('message')),
    ].join('\n');
    setFormStatus('Your email draft is ready. Send it from your mail app to complete the message.');
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    event.currentTarget.reset();
  };

  const handleMagnet = (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const target = event.currentTarget;
    const bounds = target.getBoundingClientRect();
    target.style.setProperty('--magnet-x', `${(event.clientX - bounds.left - bounds.width / 2) * 0.08}px`);
    target.style.setProperty('--magnet-y', `${(event.clientY - bounds.top - bounds.height / 2) * 0.08}px`);
  };

  const resetMagnet = (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    event.currentTarget.style.setProperty('--magnet-x', '0px');
    event.currentTarget.style.setProperty('--magnet-y', '0px');
  };

  return (
    <div className="site-shell">
      <div className={`preloader${loading ? ' is-visible' : ''}`} aria-hidden={!loading}>
        <span className="preloader-brand">{profile.brand}</span>
        <span className="preloader-status">INITIALIZING EXPERIENCE<span>...</span></span>
        <span className="preloader-track"><i /></span>
      </div>
      <Cursor />

      <header className="site-header">
        <a className="brand-lockup" href="#home" onClick={(event) => goTo(event, '#home')} aria-label="Samraiz Aziz, home">
          <span className="brand-glyph">S<span>.</span></span><span>{profile.brand}</span>
        </a>
        <button className="menu-toggle icon-button" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={18} /> : <Menu size={19} />}</button>
        <nav className={`main-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
          {navigation.map((item) => <a className={activeSection === item.href.slice(1) ? 'is-active' : ''} href={item.href} key={item.href} onClick={(event) => goTo(event, item.href)}>{item.label}</a>)}
        </nav>
        <a className="header-contact" href="#contact" onClick={(event) => goTo(event, '#contact')}>Let's talk <ArrowUpRight size={14} /></a>
      </header>

      <main>
        <section className="hero-section" id="home" aria-labelledby="hero-title">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow"><span className="status-indicator" /> FLUTTER APPLICATION DEVELOPER <span className="eyebrow-location">/ KARACHI, PK</span></p>
            <h1 id="hero-title">I BUILD APPS<br />THAT FEEL<br /><span>IMPOSSIBLE.</span></h1>
            <p className="hero-summary">Building modern mobile applications, AI-powered experiences, and scalable digital products with Flutter.</p>
            <div className="hero-actions">
              <a className="button button-primary magnetic" href="#projects" onClick={(event) => goTo(event, '#projects')} onMouseMove={handleMagnet} onMouseLeave={resetMagnet}>View my work <ArrowDownRight size={15} /></a>
              <a className="button button-quiet magnetic" href="#contact" onClick={(event) => goTo(event, '#contact')} onMouseMove={handleMagnet} onMouseLeave={resetMagnet}>Let's work together <ArrowUpRight size={15} /></a>
            </div>
            <a className="cv-link" href="/samraiz-aziz-cv.txt" download><ArrowDown size={12} /> Download CV</a>
            <div className="hero-socials" aria-label="Social links">
              <SocialAnchor label="GitHub" href={profile.github}><Github size={15} /></SocialAnchor>
              {profile.linkedin ? <SocialAnchor label="LinkedIn" href={profile.linkedin}><Linkedin size={15} /></SocialAnchor> : <span className="social-placeholder" title="Add your LinkedIn URL in portfolio.ts"><Linkedin size={15} /><i>URL NEEDED</i></span>}
              {profile.instagram ? <SocialAnchor label="Instagram" href={profile.instagram}><span className="instagram-mark">◎</span></SocialAnchor> : <span className="social-placeholder" title="Add your Instagram URL in portfolio.ts"><span className="instagram-mark">◎</span><i>URL NEEDED</i></span>}
              <SocialAnchor label="Email" href={`mailto:${profile.email}`}><Mail size={15} /></SocialAnchor>
            </div>
          </div>

          <div className="hero-visual">
            <div className="scene-aura" />
            <div className="scene-coordinate coordinate-top">DEVICE / 001 <span>·</span> FLUTTER</div>
            <AppScene />
            <div className="floating-tech tech-api"><span className="tech-node-dot" /><span>REST API</span><b>CONNECTED</b></div>
            <div className="floating-tech tech-firebase"><span className="tech-node-dot" /><span>FIREBASE</span><b>REALTIME</b></div>
            <div className="floating-tech tech-ai"><span className="tech-node-dot" /><span>AI LAYER</span><b>INTEGRATED</b></div>
            <div className="scene-coordinate coordinate-bottom">FIG 01 <span>—</span> MOBILE PRODUCT STUDY</div>
          </div>

          <div className="hero-footerline"><span><span className="scroll-wheel" /> SCROLL TO EXPLORE</span><span>PRODUCT THINKING / ENGINEERED WITH CARE</span></div>
          <a className="hero-scroll-cue" href="#about" onClick={(event) => goTo(event, '#about')} aria-label="Scroll to About"><ChevronDown size={15} /></a>
        </section>

        <section className="about-section section-pad" id="about" aria-labelledby="about-title">
          <div className="content-wrap">
            <SectionHeading id="about-title" index="01" label="ABOUT ME" title={<>A developer who builds<br />more than <span>interfaces.</span></>}>
              <p>Flutter first. Thoughtful by design. Built for the real world.</p>
            </SectionHeading>
            <div className="about-grid">
              <div className="about-monogram" aria-hidden="true"><span>SA</span><i>FLUTTER / 01</i><b /></div>
              <div className="about-copy reveal-item">
                <p className="about-lead">I'm a Computer Science graduate and Flutter Application Developer focused on building modern mobile applications with clean architecture, intuitive interfaces, backend integrations, and AI-powered functionality.</p>
                <p>My work spans product interfaces, Firebase and REST API integrations, and practical AI features. I care about software that feels clear to use and dependable underneath.</p>
                <div className="about-meta"><span><i /> BASED IN</span><strong>{profile.location}</strong><span><i /> EDUCATION</span><strong>{education.degree} · {education.graduation}</strong></div>
              </div>
            </div>
          </div>
        </section>

        <section className="skills-section section-pad" id="skills" aria-labelledby="skills-title">
          <div className="content-wrap">
            <SectionHeading id="skills-title" index="02" label="TECH STACK" title={<>Tools for the<br /><span>whole product.</span></>}>
              <p>From the first mobile screen to the backend services that support it.</p>
            </SectionHeading>
            <div className="stack-layout">
              <div className="stack-intro reveal-item"><div className="stack-orbit" aria-hidden="true"><span>FLUTTER</span><i /><b>DART</b></div><h3>One connected<br />toolkit.</h3><p>Flutter sits at the center of my work. Backend, AI, and web tools support the product around it.</p></div>
              <div className="stack-grid">
                {technologyGroups.map((group) => <article className="stack-card reveal-item" key={group.label}><div className="stack-card-top"><span>{group.index}</span><ArrowUpRight size={14} /></div><h3>{group.label}</h3><div className="stack-chips">{group.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div></article>)}
              </div>
            </div>
          </div>
        </section>

        <section className="projects-section section-pad" id="projects" aria-labelledby="projects-title">
          <div className="content-wrap">
            <SectionHeading id="projects-title" index="03" label="SELECTED WORK" title={<>Applications with<br /><span>a point of view.</span></>}>
              <p>Mobile products and concepts, presented with the details that matter.</p>
            </SectionHeading>
            <div className="projects-grid">
              {projects.map((project) => <button className={`project-card project-${project.type} reveal-item`} type="button" key={project.id} onClick={() => setSelectedProject(project)} aria-label={`Open ${project.name} case study`}>
                <ProjectVisual type={project.type} />
                <div className="project-card-copy"><div className="project-meta"><span>{project.number} / {project.status}</span><ArrowUpRight size={16} /></div><h3>{project.name}</h3><p className="project-subtitle">{project.subtitle}</p><p className="project-description">{project.description}</p><div className="project-tags">{project.technologies.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}{project.technologies.length > 4 && <span>+{project.technologies.length - 4}</span>}</div><span className="project-open">VIEW PROJECT <ArrowRight size={13} /></span></div>
              </button>)}
            </div>
          </div>
        </section>

        <section className="journey-section section-pad" id="journey" aria-labelledby="journey-title">
          <div className="content-wrap">
            <SectionHeading id="journey-title" index="04" label="DEVELOPMENT JOURNEY" title={<>My path is<br /><span>still unfolding.</span></>}>
              <p>Milestones without manufactured dates. The learning is ongoing.</p>
            </SectionHeading>
            <div className="journey-list">
              {journey.map((item, index) => <article className="journey-item reveal-item" key={item.label}><span className="journey-number">0{index + 1}</span><span className="journey-track"><i /></span><div><p>{item.kind}</p><h3>{item.label}</h3><span>{item.note}</span></div><span className="journey-date">DATE / EDITABLE</span></article>)}
            </div>
          </div>
        </section>

        <section className="experience-section section-pad" id="experience" aria-labelledby="experience-title">
          <div className="content-wrap">
            <SectionHeading id="experience-title" index="05" label="EXPERIENCE" title={<>Learning through<br /><span>real work.</span></>}>
              <p>Industry experience and student leadership, grounded in collaboration.</p>
            </SectionHeading>
            <div className="experience-grid">
              {experience.map((item, index) => <article className="experience-card reveal-item" key={item.role}><div className="experience-card-top"><span>{item.category}</span><span>0{index + 1}</span></div><h3>{item.role}</h3><p className="experience-org">{item.organization}</p><p className="experience-details">{item.details}</p><div className="experience-line"><i /></div></article>)}
            </div>
          </div>
        </section>

        <section className="services-section section-pad" id="services" aria-labelledby="services-title">
          <div className="content-wrap">
            <SectionHeading id="services-title" index="06" label="WHAT I BUILD" title={<>From idea to<br /><span>working product.</span></>}>
              <p>Flutter is the specialty. These are the connected parts of the work.</p>
            </SectionHeading>
            <div className="services-list">
              {services.map((service) => <article className="service-row reveal-item" key={service.number}><span className="service-number">{service.number}</span><h3>{service.title}</h3><p>{service.description}</p><div className="service-tags">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><ArrowUpRight className="service-arrow" size={17} /></article>)}
            </div>
          </div>
        </section>

        <section className="terminal-section section-pad" aria-labelledby="terminal-title">
          <div className="content-wrap terminal-wrap">
            <SectionHeading id="terminal-title" index="07" label="A QUICK SYSTEM CHECK" title={<>One line at<br /><span>a time.</span></>}>
              <p>A little less mystery about who is behind the keyboard.</p>
            </SectionHeading>
            <div className="terminal-window reveal-item"><div className="terminal-chrome"><span /><span /><span /><p>samraiz@dev-machine ~</p><Braces size={14} /></div><div className="terminal-content"><p><i>$</i> whoami</p><strong>Samraiz Aziz</strong><p><i>$</i> role</p><strong>Flutter Application Developer</strong><p><i>$</i> focus</p><strong>Mobile Apps <b>+</b> AI <b>+</b> Backend</strong><p><i>$</i> status</p><strong className="terminal-status">Building something meaningful<span className="terminal-cursor">_</span></strong></div><span className="terminal-index">SESSION / 001</span></div>
          </div>
        </section>

        <section className="github-section section-pad" aria-labelledby="github-title">
          <div className="content-wrap github-content reveal-item"><div className="github-icon"><Github size={23} /></div><div className="github-copy"><p className="section-index"><span>08</span> / OPEN SOURCE & CODE</p><h2 id="github-title">The code is<br /><span>part of the story.</span></h2><p>Explore my public work on GitHub. No activity numbers here, just the projects and code that are actually available.</p><a className="button button-secondary" href={profile.github} target="_blank" rel="noreferrer"><Github size={15} /> Visit GitHub <ExternalLink size={13} /></a></div><a className="repo-card" href={profile.outfitOracleRepo} target="_blank" rel="noreferrer"><div className="repo-heading"><Code2 size={16} /><span>SELECTED REPOSITORY</span><ArrowUpRight size={15} /></div><h3>outfit_oracle</h3><p>AI-focused fashion recommendation app repository.</p><span className="repo-language"><i /> Public repository</span></a></div>
        </section>

        <section className="contact-section section-pad" id="contact" aria-labelledby="contact-title">
          <div className="content-wrap">
            <SectionHeading id="contact-title" index="09" label="CONTACT" title={<>Let's build<br /><span>something real.</span></>}>
              <p>Have an idea, product, or application in mind? Let's turn it into something real.</p>
            </SectionHeading>
            <div className="contact-layout">
              <form className="contact-form reveal-item" onSubmit={handleContact}>
                <div className="form-topline"><span>PROJECT INQUIRY</span><span>REPLY VIA EMAIL</span></div>
                <div className="form-grid"><label>Name<input name="name" autoComplete="name" placeholder="Your name" required /></label><label>Email<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label></div>
                <label>Project type<select name="projectType" defaultValue="" required><option value="" disabled>Select one</option><option>Flutter mobile application</option><option>AI integration</option><option>Backend integration</option><option>Web experience</option><option>Other</option></select></label>
                <label>Message<textarea name="message" rows={4} placeholder="A little about what you are hoping to build..." required /></label>
                <button className="button button-primary" type="submit">Start a conversation <ArrowUpRight size={15} /></button>
                {formStatus && <p className="form-status" role="status"><Check size={14} /> {formStatus}</p>}
                <p className="form-note">This opens your email app with a draft. Nothing is submitted to a server.</p>
              </form>
              <aside className="contact-aside reveal-item"><p className="section-index"><span>DIRECT LINE</span></p><h3>Open to thoughtful<br />work and good people.</h3><a className="contact-email" href={`mailto:${profile.email}`}>{profile.email} <ArrowUpRight size={15} /></a><a className="contact-phone" href={`tel:${profile.phone.replaceAll('-', '')}`}>{profile.phone}</a><div className="contact-social-list"><a href={profile.github} target="_blank" rel="noreferrer"><Github size={15} /> GitHub <ArrowUpRight size={13} /></a>{profile.linkedin ? <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={15} /> LinkedIn <ArrowUpRight size={13} /></a> : <span><Linkedin size={15} /> LinkedIn <i>URL NEEDED</i></span>}</div><p className="contact-location">{profile.location}</p></aside>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer"><a className="brand-lockup" href="#home" onClick={(event) => goTo(event, '#home')}><span className="brand-glyph">S<span>.</span></span><span>{profile.brand}</span></a><span>FLUTTER APPLICATION DEVELOPER / KARACHI</span><a href="#home" onClick={(event) => goTo(event, '#home')}>BACK TO TOP <ArrowUpRight size={12} /></a></footer>

      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </div>
  );
}

function SocialAnchor({ label, href, children }: { label: string; href: string; children: ReactNode }) {
  return <a className="hero-social-link" aria-label={label} href={href} target={href.startsWith('mailto:') ? undefined : '_blank'} rel={href.startsWith('mailto:') ? undefined : 'noreferrer'}>{children}</a>;
}

export default App;