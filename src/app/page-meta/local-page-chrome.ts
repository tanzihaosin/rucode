import type { HeaderData } from '~/widgets/header'
import type { FooterData } from '~/widgets/footer'

// Якоря соответствуют локальным блокам страниц и используются только при ошибке CMS.
const pageLinks: Record<string, { href: string; title: string }[]> = {
  '/': [
    { href: '#tracks', title: 'Направления' },
    { href: '#calendar', title: 'Календарь' },
    { href: '#consortium', title: 'Консорциум' },
    { href: '#videos', title: 'Видео' },
  ],
  '/aitesting': [
    { href: '#format', title: 'Формат' },
    { href: '#calendar', title: 'Календарь' },
    { href: '#demo', title: 'Демо' },
    { href: '#partners', title: 'Партнёры' },
  ],
  '/ai_champ': [
    { href: '#leagues', title: 'Лиги' },
    { href: '#stages', title: 'Этапы' },
    { href: '#tasks', title: 'Задачи' },
    { href: '#preparation', title: 'Подготовка' },
  ],
  '/award2025': awardLinks(),
  '/award2026': awardLinks(),
  '/consortium': [
    { href: '#main', title: 'О консорциуме' },
    { href: '#directions', title: 'Направления' },
    { href: '#geography', title: 'География' },
    { href: '#benefits', title: 'Преимущества' },
    { href: '#stages', title: 'Этапы' },
  ],
  '/practikum': [
    { href: '#about', title: 'О практикуме' },
    { href: '#stages', title: 'Этапы' },
    { href: '#content', title: 'Материалы' },
    { href: '#partners', title: 'Партнёры' },
  ],
  '/mws': careerLinks(),
  '/mts': careerLinks(),
  '/final-2024': [
    { href: '#about', title: 'О финале' },
    { href: '#prize', title: 'Призы' },
    { href: '#program', title: 'Программа' },
    { href: '#gallery', title: 'Галерея' },
  ],
  '/capital-2024': [
    { href: '#about', title: 'О мероприятии' },
    { href: '#faces', title: 'Участники' },
    { href: '#program', title: 'Программа' },
    { href: '#gallery', title: 'Галерея' },
  ],
}

function awardLinks() {
  return [
    { href: '#premium', title: 'О премии' },
    { href: '#nominations', title: 'Номинации' },
    { href: '#stages', title: 'Этапы' },
    { href: '#committee', title: 'Комитет' },
    { href: '#partners', title: 'Партнёры' },
  ]
}

function careerLinks() {
  return [
    { href: '#benefits', title: 'Преимущества' },
    { href: '#internship', title: 'Стажировка' },
    { href: '#products', title: 'Продукты' },
    { href: '#faq', title: 'Вопросы' },
    { href: '#contacts', title: 'Контакты' },
  ]
}

export function localPageChrome(
  path: string,
): { header: HeaderData; footer: FooterData } | undefined {
  const links = pageLinks[path]
  if (!links) return undefined
  return {
    header: { links: links.map((link) => ({ ...link })) },
    footer: {
      links: links.map((link) => ({ ...link })),
      contacts: { site: { label: 'rucode.net', href: 'https://rucode.net/' } },
    },
  }
}
