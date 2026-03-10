/**
 * Bundles individual JSON data files into hash-based chunk files.
 * Reduces ~28k individual files to ~300 chunk files to stay under
 * Cloudflare Pages' 20k file deployment limit.
 *
 * Run before `nuxt generate`: node scripts/bundle-chunks.js
 */
const fs = require('fs')
const path = require('path')

function hashBucket(id, numBuckets) {
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = ((hash << 5) - hash) + id.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash) % numBuckets
}

function bundleDir(dirPath, numBuckets) {
  const files = fs.readdirSync(dirPath).filter(f =>
    f.endsWith('.json') && f !== 'index.json' && f !== 'chunks'
  )

  if (files.length === 0) {
    console.log(`No files to bundle in ${dirPath}`)
    return
  }

  // Check if already bundled (chunks dir exists with files, no individual files)
  const chunksDir = path.join(dirPath, 'chunks')
  if (fs.existsSync(chunksDir)) {
    const existingChunks = fs.readdirSync(chunksDir).filter(f => f.endsWith('.json'))
    if (existingChunks.length > 0 && files.length <= 1) {
      console.log(`Already bundled: ${chunksDir} (${existingChunks.length} chunks)`)
      return
    }
    // Remove old chunks if re-bundling
    existingChunks.forEach(f => fs.unlinkSync(path.join(chunksDir, f)))
  }

  const buckets = {}

  for (const file of files) {
    const id = file.replace('.json', '')
    const bucket = hashBucket(id, numBuckets)
    if (!buckets[bucket]) buckets[bucket] = {}
    buckets[bucket][id] = JSON.parse(fs.readFileSync(path.join(dirPath, file), 'utf-8'))
  }

  fs.mkdirSync(chunksDir, { recursive: true })

  for (const [bucket, data] of Object.entries(buckets)) {
    fs.writeFileSync(
      path.join(chunksDir, `${bucket}.json`),
      JSON.stringify(data)
    )
  }

  // Delete individual files
  for (const file of files) {
    fs.unlinkSync(path.join(dirPath, file))
  }

  const sizes = Object.entries(buckets).map(([b, d]) => JSON.stringify(d).length)
  const avgSize = Math.round(sizes.reduce((a, b) => a + b, 0) / sizes.length / 1024)
  console.log(`Bundled ${files.length} files → ${Object.keys(buckets).length} chunks in ${chunksDir} (avg ${avgSize}KB)`)
}

const dataDir = path.resolve(__dirname, '..', 'static', 'data')

console.log('Bundling artists...')
bundleDir(path.join(dataDir, 'artists'), 100)

console.log('Bundling tracks...')
bundleDir(path.join(dataDir, 'tracks'), 200)

console.log('Done.')
