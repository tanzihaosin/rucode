import { beforeEach, describe, expect, it, vi } from 'vitest'

const { fetchPage } = vi.hoisted(() => ({ fetchPage: vi.fn() }))
vi.mock('~/shared/api', async (importOriginal) => ({
  ...(await importOriginal<typeof import('~/shared/api')>()),
  fetchCmsPage: fetchPage,
  applyCmsPageMeta: (meta: Record<string, unknown>, page: Record<string, unknown>) => {
    if (page.header) meta.header = page.header
    if (page.footer) meta.footer = page.footer
  },
}))

import middleware from './cms-page-meta.global'

describe('резервные шапка и футер', () => {
  beforeEach(() => fetchPage.mockReset())

  it('использует локальные данные при ошибке CMS', async () => {
    fetchPage.mockRejectedValueOnce(new Error('CMS недоступна'))
    const to = { path: '/aitesting/', params: {}, meta: {} }
    await middleware(to as never, {} as never)
    expect(to.meta).toMatchObject({
      header: { links: expect.arrayContaining([{ href: '#format', title: 'Формат' }]) },
      footer: { contacts: { site: { href: 'https://rucode.net/' } } },
    })
  })

  it('сохраняет данные CMS при успешном запросе', async () => {
    const header = { links: [{ href: '#cms', title: 'CMS' }] }
    const footer = { links: [] }
    fetchPage.mockResolvedValueOnce({ header, footer })
    const to = { path: '/aitesting', params: {}, meta: {} }
    await middleware(to as never, {} as never)
    expect(to.meta).toEqual({ header, footer })
  })

  it('сохраняет локальные метаданные чемпионата при ошибке', async () => {
    fetchPage.mockRejectedValueOnce(new Error('CMS недоступна'))
    const header = { links: [{ href: '#about', titleKey: 'nav.champ.about' }] }
    const to = { path: '/champ', params: {}, meta: { header } }
    await middleware(to as never, {} as never)
    expect(to.meta.header).toBe(header)
  })
})
