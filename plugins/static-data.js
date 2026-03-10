/**
 * Plugin that provides $staticData() for reading JSON from static/data/.
 * During generate (server-side): reads from filesystem.
 * During client-side navigation: fetches via HTTP.
 *
 * Also provides $chunkedData(type, id) for hash-bucketed data
 * (artists, tracks) where individual files are bundled into chunks.
 */

function hashBucket(id, numBuckets) {
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = ((hash << 5) - hash) + id.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash) % numBuckets
}

const CHUNK_CONFIG = {
  artists: 100,
  tracks: 200,
}

export default (context, inject) => {
  const fetchData = async (filePath) => {
    if (process.server) {
      const fs = eval('require')('fs')
      const path = eval('require')('path')
      const fullPath = path.resolve(process.cwd(), 'static', filePath)
      return JSON.parse(fs.readFileSync(fullPath, 'utf-8'))
    }
    const resp = await fetch(`/${filePath}`)
    if (!resp.ok) {
      throw new Error(`Failed to fetch ${filePath}: ${resp.status}`)
    }
    return resp.json()
  }

  const fetchChunked = async (type, id) => {
    const numBuckets = CHUNK_CONFIG[type]
    if (!numBuckets) {
      throw new Error(`Unknown chunked type: ${type}`)
    }
    const bucket = hashBucket(id, numBuckets)
    const chunk = await fetchData(`data/${type}/chunks/${bucket}.json`)
    if (!(id in chunk)) {
      throw new Error(`ID ${id} not found in ${type} chunk ${bucket}`)
    }
    return chunk[id]
  }

  inject('staticData', fetchData)
  inject('chunkedData', fetchChunked)
}
