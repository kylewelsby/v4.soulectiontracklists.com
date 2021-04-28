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

const PLATFORMS = [
  'amazon-music',
  'apple-music',
  'audiomack',
  'bandcamp',
  'beatport',
  'bing',
  'deezer',
  'discogs',
  'duckduckgo',
  'facebook',
  'google',
  'instagram',
  'lastfm',
  'mixcloud',
  'soundcloud',
  'spotify',
  'tidal',
  'traxsource',
  'twitch',
  'twitter',
  'web',
  'youtube',
  'youtube-music',
].sort()
export const All = () => {
  const all = ICONS.map((i) => `<SiteIcon icon="${i}" class="w-12"/>`).join('')
  return `<div class="grid grid-cols-6 gap-2 dark:text-white">${all}</div>`
}

export const Platforms = () => {
  const all = PLATFORMS.map((i) => `<SiteIcon icon="${i}" class="w-12"/>`).join(
    ''
  )
  return `<div class="grid grid-cols-6 gap-2 dark:text-white">${all}</div>`
}

export const PlatformIconButtons = () => {
  const all = PLATFORMS.map(
    (i) =>
      `<SiteIconButton class="dark:bg-white dark:text-black" icon="${i}" />`
  ).join('')
  return `<div class="grid grid-cols-10 gap-2 items-center place-items-center dark:text-white">${all}</div>`
}

export const Button = () => '<SiteIconButton icon="search" />'
