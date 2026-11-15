// Nuxt Fonts вставляет в сгенерированный HTML абсолютные пути /_fonts/.
// На GitHub Pages проект располагается в подпапке, поэтому учитываем base URL.
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const base = process.env.NUXT_APP_BASE_URL || '/'
if (base !== '/') {
  async function updateHtml(dir) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const file = join(dir, entry.name)
      if (entry.isDirectory()) await updateHtml(file)
      else if (entry.isFile() && entry.name.endsWith('.html')) {
        const html = await readFile(file, 'utf8')
        let updated = html
        const repeated = `${base}${base.slice(1)}_fonts/`
        while (updated.includes(repeated)) updated = updated.replaceAll(repeated, `${base}_fonts/`)
        updated = updated.replaceAll('url(/_fonts/', `url(${base}_fonts/`)
        if (updated !== html) await writeFile(file, updated)
      }
    }
  }
  await updateHtml('.output/public')
}
