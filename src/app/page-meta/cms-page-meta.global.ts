import { applyCmsPageMeta, fetchCmsPage } from '~/shared/api'
import { DEFAULT_LOCALE, LOCALES } from '~/shared/config'
import { localPageChrome } from './local-page-chrome'

/**
 * Шапка и отступ футера статических страниц (`index.vue`, `mts.vue` и др.) живут в CMS, а лейаут читает их
 * из `route.meta` до рендера страницы, поэтому подставляем их здесь. Страницы из CMS (`[...slug].vue`)
 * делают то же в своём middleware и отвечают 404, если страницы нет.
 * При ошибке CMS используются локальные настройки и блоки страницы.
 */
export default defineNuxtRouteMiddleware(async (to) => {
  if (to.meta.layout === false || to.params.slug !== undefined) return

  // CMS отдаёт только язык по умолчанию: у остальных языков шапка задана в `definePageMeta` страницы.
  const foreignLocale = LOCALES.some(
    (locale) =>
      locale !== DEFAULT_LOCALE && (to.path === `/${locale}` || to.path.startsWith(`/${locale}/`)),
  )
  if (foreignLocale) return

  const path = to.path.replace(/(.)\/+$/, '$1')
  if (useRuntimeConfig().public.staticDemo) {
    const local = localPageChrome(path)
    if (local) {
      to.meta.header = local.header
      to.meta.footer = local.footer
    }
    return
  }
  try {
    applyCmsPageMeta(to.meta, await fetchCmsPage(path))
  } catch {
    const local = localPageChrome(path)
    if (local) {
      to.meta.header = local.header
      to.meta.footer = local.footer
    }
  }
})
