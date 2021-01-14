export default function artworkUrl(path) {
  if (!path) {
    return null
  } else if (path.startsWith('http')) {
    return path
  } else {
    return `https://firebase.soulectiontracklists.com/cdn/image/${path}`
  }
}
