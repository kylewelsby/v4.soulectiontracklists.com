#!/usr/bin/env node

/**
 * Export all data from REST API + Supabase to local JSON files.
 * Run once while APIs are still live:
 *   node scripts/export-data.js
 */

const fs = require('fs')
const path = require('path')

// Load .env
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') })

const { createClient } = require('@supabase/supabase-js')

const API_BASE = 'https://v5-api-soulectiontracklists-com.fly.dev'
const SUPABASE_URL = process.env.NUXT_ENV_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const SUPABASE_KEY = process.env.NUXT_ENV_PUBLIC_SUPABASE_KEY || process.env.SUPABASE_KEY
const PROFILE_ID = 'QiEFFErt688'
const PAGINATE = 50
const TAG_NAMES = ['soulection-radio', 'takeover', 'guest', 'discord']
const HOMEPAGE_TAG_IDS = [15, 19]

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

const DATA_DIR = path.resolve(__dirname, '..', 'static', 'data')

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true })
}

function writeJSON(filePath, data) {
  const fullPath = path.resolve(DATA_DIR, filePath)
  ensureDir(path.dirname(fullPath))
  fs.writeFileSync(fullPath, JSON.stringify(data))
  console.log(`  wrote ${filePath}`)
}

async function apiFetch(urlPath) {
  const url = `${API_BASE}${urlPath}`
  const resp = await fetch(url, {
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  })
  if (!resp.ok) throw new Error(`API ${resp.status}: ${url}`)
  const totalCount = resp.headers.get('total-count')
  const data = await resp.json()
  return { data, totalCount: totalCount ? parseInt(totalCount) : null }
}

// ─── REST API exports ────────────────────────────────────────────

async function exportShowPages() {
  console.log('Exporting show pages...')
  let page = 1
  let allSlugs = []
  // Fetch first page to get totalCount
  const first = await apiFetch(`/shows?page=1`)
  const totalCount = first.totalCount
  const pageSize = first.data.length
  const totalPages = Math.ceil(totalCount / pageSize)
  writeJSON(`shows/page-1.json`, { data: first.data, totalCount })
  allSlugs = allSlugs.concat(first.data.map((s) => s.slug))
  console.log(`  Total shows: ${totalCount}, page size: ${pageSize}, total pages: ${totalPages}`)

  for (page = 2; page <= totalPages; page++) {
    const { data } = await apiFetch(`/shows?page=${page}`)
    if (!data || data.length === 0) break
    writeJSON(`shows/page-${page}.json`, { data, totalCount })
    allSlugs = allSlugs.concat(data.map((s) => s.slug))
  }
  return allSlugs
}

async function exportIndividualShows(slugs) {
  console.log('Exporting individual shows by slug...')
  for (const slug of slugs) {
    try {
      const { data } = await apiFetch(`/shows/${slug}`)
      writeJSON(`shows/${slug}.json`, data)
    } catch (err) {
      console.warn(`  WARN: could not export show ${slug}: ${err.message}`)
    }
  }
}

async function exportHomepageShows() {
  console.log('Exporting homepage shows...')
  const { data } = await apiFetch(`/shows?page=1&tags=${HOMEPAGE_TAG_IDS.join(',')}`)
  writeJSON('homepage-shows.json', data)
}

async function exportHomepageEvents() {
  console.log('Exporting homepage events...')
  const { data } = await apiFetch('/shows?page=1&tags=16&limit=9')
  writeJSON('homepage-events.json', data)
}

// ─── Supabase exports ────────────────────────────────────────────

async function exportAllArtists() {
  console.log('Exporting artists...')
  const artistIndex = []
  let from = 0
  const batchSize = 1000

  while (true) {
    const { data: artists, error } = await supabase
      .from('artists')
      .select('id, slug, title, artwork, tracks(id, title, slug)')
      .range(from, from + batchSize - 1)
    if (error) throw error
    if (!artists || artists.length === 0) break

    for (const artist of artists) {
      // Fetch markers for all tracks
      const trackIds = artist.tracks.map((t) => t.id)
      let markers = []
      if (trackIds.length > 0) {
        const { data: m } = await supabase
          .from('markers')
          .select(
            `id, position, timestamp, rawTrack,
            track(id, title, artwork, slug, path, artist(title, slug)),
            chapter(position, title, show(*))`
          )
          .in('track', trackIds)
        markers = m || []
      }

      // Fetch albums
      const { data: albums } = await supabase
        .from('albums')
        .select('id, title, artist, artwork')
        .eq('state', 'published')
        .eq('artist', artist.id)
        .order('published_at', { ascending: false })

      // Fetch artist links
      const { data: linkedPlatforms } = await supabase
        .from('artist_links')
        .select('*')
        .eq('artist', artist.id)

      writeJSON(`artists/${artist.id}.json`, {
        data: artist,
        markers: markers || [],
        albums: albums || [],
        linkedPlatforms: linkedPlatforms || [],
      })

      artistIndex.push({ id: artist.id, slug: artist.slug, title: artist.title })
    }
    from += batchSize
  }

  writeJSON('artists/index.json', artistIndex)
}

async function exportAllTracks() {
  console.log('Exporting tracks...')
  const trackIndex = []
  let from = 0
  const batchSize = 1000

  while (true) {
    const { data: tracks, error } = await supabase
      .from('tracks')
      .select('*, artist(*)')
      .range(from, from + batchSize - 1)
    if (error) throw error
    if (!tracks || tracks.length === 0) break

    for (const track of tracks) {
      // Appearance count
      const { count: appearanceCount } = await supabase
        .from('markers')
        .select('*', { head: true, count: 'exact' })
        .eq('track', track.id)

      // Markers with chapter/show info
      const { data: markers } = await supabase
        .from('markers')
        .select('chapter(id, show(id, artwork, title, slug, content, published_at))')
        .eq('track', track.id)
        .order('published_at', { foreignTable: 'chapter.show', ascending: false })

      // Track links
      const { data: linkedPlatforms } = await supabase
        .from('track_links')
        .select('*')
        .eq('track', track.id)

      writeJSON(`tracks/${track.id}.json`, {
        data: track,
        appearanceCount: appearanceCount || 0,
        markers: markers || [],
        linkedPlatforms: linkedPlatforms || [],
      })

      trackIndex.push({ id: track.id, title: track.title, slug: track.slug })
    }
    from += batchSize
  }

  writeJSON('tracks/index.json', trackIndex)
}

async function exportAlbums() {
  console.log('Exporting albums...')
  // Index (list of all published albums)
  const { data: albums, error } = await supabase
    .from('albums')
    .select('id, title, artwork, published_at, artist(id, title)')
    .eq('state', 'published')
    .order('published_at', { ascending: false })
  if (error) throw error
  writeJSON('records/index.json', albums)

  // Individual albums
  for (const album of albums) {
    const { data } = await supabase
      .from('albums')
      .select('*, artist(id, title)')
      .eq('id', album.id)
      .single()
    writeJSON(`records/${album.id}.json`, data)
  }

  // Albums by tag type
  const tagTypes = ['single', 'album', 'playlist', 'compilation']
  for (const type of tagTypes) {
    const { data: tagAlbums } = await supabase
      .from('albums')
      .select('id, title, artwork, published_at, artist(id, title)')
      .overlaps('tags', [type])
      .order('published_at', { ascending: false })
    writeJSON(`records/by-type/${type}.json`, tagAlbums || [])
  }
}

async function exportTags() {
  console.log('Exporting tags...')
  const { data: tags } = await supabase
    .from('tags')
    .select('id, name')
    .in('name', TAG_NAMES)

  const tagsWithCounts = await supabase.rpc('tags_counts').select('*')

  writeJSON('tags.json', {
    tags: tags || [],
    tagsWithCounts: tagsWithCounts.data || [],
  })
}

async function exportShowsByTag() {
  console.log('Exporting shows by tag...')
  const { data: tags } = await supabase
    .from('tags')
    .select('id, name')
    .in('name', TAG_NAMES)

  if (!tags) return

  // Total count of all shows
  const { count: totalCount } = await supabase
    .from('shows')
    .select('*', { head: true, count: 'exact' })
    .eq('profile', PROFILE_ID)
    .eq('state', 'published')

  for (const tag of tags) {
    // Count for this tag
    const { count } = await supabase
      .from('shows')
      .select('*', { head: true, count: 'exact' })
      .eq('profile', PROFILE_ID)
      .eq('state', 'published')
      .overlaps('tags', [tag.id])

    // All shows for this tag (paginated into chunks of PAGINATE)
    let allShows = []
    let from = 0
    while (true) {
      const { data } = await supabase
        .from('shows')
        .select('id,title,slug,artwork,content,tags,published_at,links')
        .eq('profile', PROFILE_ID)
        .eq('state', 'published')
        .overlaps('tags', [tag.id])
        .order('published_at', { ascending: false })
        .range(from, from + PAGINATE - 1)
      if (!data || data.length === 0) break
      allShows = allShows.concat(data)
      from += PAGINATE
    }

    writeJSON(`shows-by-tag/${tag.name}.json`, {
      shows: allShows,
      count,
      totalCount,
      tag,
    })
  }

  // Also export the "all tags" filtered shows (overlapping any known tag)
  const tagIds = tags.map((t) => t.id)
  let allFilteredShows = []
  let from = 0
  while (true) {
    const { data } = await supabase
      .from('shows')
      .select('id,title,slug,artwork,content,tags,published_at,links')
      .eq('profile', PROFILE_ID)
      .eq('state', 'published')
      .overlaps('tags', tagIds)
      .order('published_at', { ascending: false })
      .range(from, from + PAGINATE - 1)
    if (!data || data.length === 0) break
    allFilteredShows = allFilteredShows.concat(data)
    from += PAGINATE
  }

  const { count: allCount } = await supabase
    .from('shows')
    .select('*', { head: true, count: 'exact' })
    .eq('profile', PROFILE_ID)
    .eq('state', 'published')
    .overlaps('tags', tagIds)

  writeJSON('shows-by-tag/_all.json', {
    shows: allFilteredShows,
    count: allCount,
    totalCount,
    tags,
  })
}

async function exportEvents() {
  console.log('Exporting events...')
  const { data } = await supabase
    .from('shows')
    .select('*, chapters(*)')
    .eq('profile', PROFILE_ID)
    .overlaps('tags', [16])
    .eq('state', 'published')
    .order('published_at', { ascending: true })
  writeJSON('events.json', data || [])
}

async function exportPlayerShows() {
  console.log('Exporting player show data...')
  // Get all show IDs
  let allShows = []
  let from = 0
  while (true) {
    const { data } = await supabase
      .from('shows')
      .select('id')
      .eq('profile', PROFILE_ID)
      .eq('state', 'published')
      .range(from, from + 1000 - 1)
    if (!data || data.length === 0) break
    allShows = allShows.concat(data)
    from += 1000
  }

  for (const show of allShows) {
    const { data } = await supabase
      .from('shows')
      .select(
        `links, title, artwork, slug, duration,
        chapters(title, artwork, markers(id, timestamp, rawTrack,
          track(id, title, path, artwork, artist(id, title))))`
      )
      .eq('id', show.id)
      .single()
    if (data) {
      writeJSON(`player/${show.id}.json`, data)
    }
  }
}

async function export500PageShows() {
  console.log('Exporting 500 page shows...')
  const { data } = await supabase
    .from('shows')
    .select('id, title, slug, artwork, published_at')
    .ilike('title', 'Soulection Radio%')
    .lte('slug', '500')
    .eq('state', 'published')
    .eq('profile', PROFILE_ID)
    .order('published_at', { ascending: false })
  writeJSON('500-shows.json', data || [])
}

// ─── Main ────────────────────────────────────────────────────────

async function main() {
  console.log('Starting data export...')
  console.log(`  Data dir: ${DATA_DIR}`)
  ensureDir(DATA_DIR)

  // REST API exports
  const slugs = await exportShowPages()
  await exportIndividualShows(slugs)
  await exportHomepageShows()
  await exportHomepageEvents()

  // Supabase exports
  await exportTags()
  await exportShowsByTag()
  await exportEvents()
  await exportAlbums()
  await export500PageShows()
  await exportPlayerShows()
  await exportAllArtists()
  await exportAllTracks()

  console.log('\nExport complete!')
}

main().catch((err) => {
  console.error('Export failed:', err)
  process.exit(1)
})
