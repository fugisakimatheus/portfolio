import type { SiteContent } from './types'

export const siteContent: SiteContent = {
  profile: {
    name: 'Matheus Fugisaki',
    title: {
      pt: 'Desenvolvedor Front-end Sênior',
      en: 'Senior Front-end Developer',
    },
    bio: {
      pt: 'Desenvolvedor front-end sênior na Nexgy. Construo interfaces modernas com React, TypeScript e Next.js.',
      en: 'Senior front-end developer at Nexgy. I build modern interfaces with React, TypeScript, and Next.js.',
    },
    avatar: 'https://avatars.githubusercontent.com/u/77367287?v=4',
    socials: [
      { platform: 'github', url: 'https://github.com/fugisakimatheus' },
      { platform: 'linkedin', url: 'https://linkedin.com/in/matheus-fugisaki' },
      { platform: 'instagram', url: 'https://instagram.com/fugisakimatheus' },
    ],
  },
  career: [
    {
      id: 'nexgy',
      company: 'Nexgy',
      role: {
        pt: 'Desenvolvedor Front-end Sênior',
        en: 'Senior Front-end Developer',
      },
      period: { pt: 'Atual', en: 'Present' },
      description: {
        pt: 'Desenvolvimento de interfaces web e produtos digitais com React e TypeScript.',
        en: 'Building web interfaces and digital products with React and TypeScript.',
      },
      technologies: ['React', 'TypeScript', 'Next.js'],
      type: 'job',
    },
    {
      id: 'freelance-mock',
      company: 'Projetos freelance',
      role: {
        pt: 'Desenvolvedor Front-end',
        en: 'Front-end Developer',
      },
      period: { pt: '2021 – 2023', en: '2021 – 2023' },
      description: {
        pt: 'Projetos web para clientes com React, dashboards e landing pages.',
        en: 'Web projects for clients using React, dashboards, and landing pages.',
      },
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
      type: 'freelance',
    },
    {
      id: 'acme-digital-mock',
      company: 'Acme digital', // MOCK
      role: {
        pt: 'Desenvolvedor Front-end Pleno',
        en: 'Mid-level Front-end Developer',
      },
      period: { pt: '2019 – 2021', en: '2019 – 2021' },
      description: {
        pt: 'Desenvolvimento de SPAs e integração com APIs REST em produtos B2B.',
        en: 'Built SPAs and integrated REST APIs for B2B digital products.',
      },
      technologies: ['React', 'JavaScript', 'Styled Components'],
      type: 'job',
    },
    {
      id: 'startup-lab-mock',
      company: 'Startup lab', // MOCK
      role: {
        pt: 'Desenvolvedor Front-end Júnior',
        en: 'Junior Front-end Developer',
      },
      period: { pt: '2018 – 2019', en: '2018 – 2019' },
      description: {
        pt: 'Manutenção de landing pages, componentes reutilizáveis e correções de UI.',
        en: 'Maintained landing pages, reusable components, and UI bug fixes.',
      },
      technologies: ['React', 'CSS', 'Git'],
      type: 'job',
    },
    {
      id: 'techcorp-internship-mock',
      company: 'TechCorp', // MOCK
      role: {
        pt: 'Estagiário de Desenvolvimento Web',
        en: 'Web Development Intern',
      },
      period: { pt: '2017 – 2018', en: '2017 – 2018' },
      description: {
        pt: 'Suporte ao time front-end com HTML, CSS e JavaScript em projetos internos.',
        en: 'Supported the front-end team with HTML, CSS, and JavaScript on internal projects.',
      },
      technologies: ['HTML', 'CSS', 'JavaScript'],
      type: 'internship',
    },
  ],
  projects: [
    {
      id: 'energy-dashboard',
      title: { pt: 'Energy dashboard', en: 'Energy dashboard' },
      description: {
        pt: 'Dashboard de dados de energia construído com Next.js e TypeScript.',
        en: 'An energy data dashboard built with Next.js and TypeScript.',
      },
      image: '/projects/energy-dashboard.png',
      imageAspect: 1686 / 959,
      repoUrl: 'https://github.com/fugisakimatheus/energy-dashboard',
      tags: ['Next.js', 'TypeScript', 'Dashboard'],
      featured: true,
    },
    {
      id: 'code-hero-angular',
      title: { pt: 'Code hero', en: 'Code hero' },
      description: {
        pt: 'Catálogo de personagens Marvel consumindo API pública, feito com Angular.',
        en: 'Marvel characters catalog using a public API, built with Angular.',
      },
      image: '/projects/code-hero-angular.png',
      repoUrl: 'https://github.com/fugisakimatheus/code-hero-angular',
      tags: ['Angular', 'TypeScript', 'API'],
      featured: true,
    },
    {
      id: 'currency-converter',
      title: { pt: 'Conversor de moedas', en: 'Currency converter' },
      description: {
        pt: 'Aplicativo React para conversão de moedas em tempo real.',
        en: 'React app for real-time currency conversion.',
      },
      image: '/projects/currency-converter.png',
      imageAspect: 995 / 953,
      repoUrl: 'https://github.com/fugisakimatheus/currency-converter',
      tags: ['React', 'TypeScript'],
      featured: true,
    },
    {
      id: 'strategy-pattern-example',
      title: { pt: 'Strategy pattern', en: 'Strategy pattern' },
      description: {
        pt: 'Exemplo do padrão Strategy em React com TypeScript.',
        en: 'Strategy design pattern example in React with TypeScript.',
      },
      image: '/projects/strategy-pattern-example.png',
      repoUrl: 'https://github.com/fugisakimatheus/strategy-pattern-example',
      tags: ['React', 'TypeScript', 'Patterns'],
      featured: true,
    },
    {
      id: 'react-anime-calculator',
      title: { pt: 'Calculadora anime', en: 'Anime calculator' },
      description: {
        pt: 'Calculadora temática em React com animações e interface customizada.',
        en: 'Themed React calculator with animations and a custom interface.',
      },
      image: '/projects/react-anime-calculator.jpeg',
      repoUrl: 'https://github.com/fugisakimatheus/react-anime-calculator',
      tags: ['React', 'TypeScript'],
      featured: false,
    },
    {
      id: 'my-rankings',
      title: { pt: 'My rankings', en: 'My rankings' },
      description: {
        pt: 'Plataforma de entretenimento para ranking de partidas.',
        en: 'Entertainment platform for match rankings.',
      },
      image: '/projects/my-rankings.png',
      repoUrl: 'https://github.com/fugisakimatheus/my-rankings',
      tags: ['React', 'TypeScript'],
      featured: false,
    },
    {
      id: 'youtube-clone',
      title: { pt: 'YouTube clone', en: 'YouTube clone' },
      description: {
        pt: 'Clone da interface do YouTube no front-end.',
        en: 'YouTube front-end UI clone.',
      },
      image: '/projects/youtube-clone.png',
      repoUrl: 'https://github.com/fugisakimatheus/youtube-clone',
      tags: ['React', 'CSS'],
      featured: false,
    },
  ],
  skills: [
    { name: 'React', category: 'frontend', icon: 'react' },
    { name: 'TypeScript', category: 'frontend', icon: 'typescript' },
    { name: 'Next.js', category: 'frontend', icon: 'nextdotjs' },
    { name: 'Vue', category: 'frontend', icon: 'vue' },
    { name: 'Angular', category: 'frontend', icon: 'angular' },
    { name: 'Tailwind CSS', category: 'frontend', icon: 'tailwindcss' },
    { name: 'Sass', category: 'frontend', icon: 'sass' },
    { name: 'Zustand', category: 'frontend', icon: 'zustand' },
    { name: 'Vite', category: 'tools', icon: 'vite' },
    { name: 'Bun', category: 'tools', icon: 'bun' },
    { name: 'Node.js', category: 'tools', icon: 'nodedotjs' },
    { name: 'Git', category: 'tools', icon: 'git' },
    { name: 'Vitest', category: 'testing', icon: 'vitest' },
    { name: 'Jest', category: 'testing', icon: 'jest' },
    { name: 'Playwright', category: 'testing', icon: 'playwright' },
  ],
  contact: {
    email: 'matheusgfmaciel@gmail.com',
    github: 'https://github.com/fugisakimatheus',
    linkedin: 'https://linkedin.com/in/matheus-fugisaki',
    instagram: 'https://instagram.com/fugisakimatheus',
  },
}
