import type { SiteContent } from './types'

export const siteContent: SiteContent = {
  profile: {
    name: 'Matheus Fugisaki',
    title: {
      pt: 'Desenvolvedor Front-end Sênior',
      en: 'Senior Front-end Developer',
    },
    bio: {
      pt: 'Desenvolvedor front-end sênior na Nexgy. Construo interfaces modernas com React, TypeScript e Next.js. Disponível para projetos freelance.',
      en: 'Senior front-end developer at Nexgy. I build modern interfaces with React, TypeScript, and Next.js. Available for freelance work.',
    },
    avatar: 'https://avatars.githubusercontent.com/u/77367287?v=4',
    socials: [
      { platform: 'github', url: 'https://github.com/fugisakimatheus' },
      { platform: 'linkedin', url: 'https://linkedin.com/in/matheus-fugisaki' },
      { platform: 'website', url: 'https://matheusfugisaki.vercel.app' },
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
      company: 'Projetos Freelance',
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
  ],
  projects: [
    {
      id: 'energy-dashboard',
      title: { pt: 'Energy Dashboard', en: 'Energy Dashboard' },
      description: {
        pt: 'Dashboard de dados de energia construído com Next.js e TypeScript.',
        en: 'An energy data dashboard built with Next.js and TypeScript.',
      },
      image: '/projects/energy-dashboard.png',
      repoUrl: 'https://github.com/fugisakimatheus/energy-dashboard',
      tags: ['Next.js', 'TypeScript', 'Dashboard'],
      featured: true,
    },
    {
      id: 'code-hero-angular',
      title: { pt: 'Code Hero', en: 'Code Hero' },
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
      title: { pt: 'Conversor de Moedas', en: 'Currency Converter' },
      description: {
        pt: 'Aplicativo React para conversão de moedas em tempo real.',
        en: 'React app for real-time currency conversion.',
      },
      image: '/projects/currency-converter.png',
      repoUrl: 'https://github.com/fugisakimatheus/currency-converter',
      tags: ['React', 'TypeScript'],
      featured: true,
    },
    {
      id: 'strategy-pattern-example',
      title: { pt: 'Strategy Pattern', en: 'Strategy Pattern' },
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
      id: 'my-rankings',
      title: { pt: 'My Rankings', en: 'My Rankings' },
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
      title: { pt: 'YouTube Clone', en: 'YouTube Clone' },
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
    { name: 'React', category: 'frontend' },
    { name: 'TypeScript', category: 'frontend' },
    { name: 'Next.js', category: 'frontend' },
    { name: 'Angular', category: 'frontend' },
    { name: 'Tailwind CSS', category: 'frontend' },
    { name: 'React Native', category: 'frontend' },
    { name: 'Vite', category: 'tools' },
    { name: 'Git', category: 'tools' },
  ],
  contact: {
    email: 'matheusgfmacieira@gmail.com',
    github: 'https://github.com/fugisakimatheus',
    linkedin: 'https://linkedin.com/in/matheus-fugisaki',
  },
}
