export default {
  title: 'Site Icon',
}
const ICONS = [
  'arrow-left',
  'arrow-right',
  'badge-check',
  'chevron-down',
  'chevron-up',
  'menu',
  'search',
  'share',
].sort()
export const All = () => {
  const all = ICONS.map((i) => `<SiteIcon icon="${i}" class="w-12"/>`).join('')
  return `<div class="grid grid-cols-6 gap-2">${all}</div>`
}

export const Button = () => '<SiteIconButton icon="search" />'
