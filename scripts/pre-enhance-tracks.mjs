import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import loki from '@lokidb/loki'
import glob from 'glob'
const Loki = loki.Loki

const db = new Loki('content.db')

const episodes = db.addCollection('episodes', { indices: ['episode'] })

const episodeFiles = glob.sync('./content-full/episodes/*.md')
episodeFiles.forEach((filePath) => {
  const file = matter.read(filePath)
  if (file.data.episode) {
    episodes.insert(file.data)
  }
})

const trackFiles = glob.sync('./content-full/artists/**/tracks/*.md')

trackFiles.forEach((filePath) => {
  // console.log(filePath)
  const file = matter.read(filePath)
  // if (!file.data.episodes || file.data.episodes.length === 0) {
  function trackFinder(obj) {
    return obj.sessions.some((s) => {
      if (s.refs) {
        return s.refs.includes(filePath.replace(/(.*\/content-full\/)/, ''))
      }
      return false
    })
  }
  const results = episodes.where(trackFinder)
  const episodesNumbers = results.map((e) => e.episode)
  if (
    file.data.episodes &&
    file.data.episodes.length < episodesNumbers.length
  ) {
    console.log(file.data.episodes, episodesNumbers, filePath)
    file.data.episodes = episodesNumbers.sort()
  }
  // }
  if (!file.data.episodes || file.data.episodes.length === 0) {
    console.log(`Track still missing an episode ${filePath}`)
  }
  if (file.data.episodes && file.data.episodes.length > 0) {
    file.data.episodes = file.data.episodes.map((e) => parseInt(e))
    const lastEpisodeNumber = file.data.episodes.slice().sort().reverse()[0]
    if (!lastEpisodeNumber) {
      console.error(`Track missing episode ${filePath}`)
    } else {
      file.data.lastEpisodeNumber = lastEpisodeNumber
      const result = episodes.findOne({
        episode: { $eq: lastEpisodeNumber },
      })

      try {
        const artistPath = filePath.replace(/\/tracks\/.*/, '/_index.md')

        const artistFile = matter.read(artistPath)
        if (artistFile) {
          file.data.artist = artistFile.data.title
        }
      } catch (err) {
        console.error(`Problem getting artist for ${filePath}`)
      }

      if (result) {
        file.data.lastPlayedAt = new Date(result.date)
        let cue
        for (const s of result.sessions) {
          if (s.refs) {
            const index = s.refs.findIndex((ref) => {
              if (ref)
                return ref.includes(
                  filePath.replace(/(.*\/content-full\/)/, '')
                )
              return false
            })
            cue = s.cue[index]
            break
          }
        }
        if (cue && file.data.lastPlayedAt) {
          const [hours, minutes, seconds] = cue.split(':')
          file.data.lastPlayedAt.setHours(hours)
          file.data.lastPlayedAt.setMinutes(minutes)
          file.data.lastPlayedAt.setSeconds(seconds)
        }
        // if (file.data.lastPlayedAt) {
        //   file.data.lastPlayedAt = file.data.lastPlayedAt.toISOString()
        // }
      } else {
        console.error(
          `Missing Episode date for ${lastEpisodeNumber} ${filePath}`
        )
      }

      try {
        fs.writeFileSync(path.resolve(filePath), file.stringify(), 'utf-8')
      } catch (err) {
        console.error(file)
        throw err
      }
    }
  }
})
