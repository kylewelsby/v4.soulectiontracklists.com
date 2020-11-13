import axios from 'axios'
import { timeToSeconds } from '@/utils/timeToSeconds'

export async function useSoundcloud(soundcloudPermalink) {
  let soundcloudData = null
  try {
    const res = await axios.get(`https://api-mobi.soundcloud.com/resolve`, {
      params: {
        permalink_url: soundcloudPermalink,
        client_id: `iZIs9mchVcX5lhVRyQGGAYlNPVldzAoX`,
      },
    })
    soundcloudData = res.data
  } catch (e) {
    console.error(e)
  }
  return soundcloudData
}

export function useFlatTracklist({ $content }, episode) {
  const promises = []
  episode.sessions.forEach((session) => {
    session.trackPages = []
    session.artistPages = []
    session.refs.forEach((ref, index) => {
      const promise = $content(ref.replace(/\.md$/, ''))
        .limit(1)
        .fetch()
        .then(
          (page) => {
            session.trackPages[index] = page
          },
          () => {
            session.trackPages[index] = null
          }
        )
      promises.push(promise)
      const promise2 = $content(
        'artists',
        ref
          .replace(/^artists\/(.+)\/tracks\/.*\.md$/, '$1')
          .replace(/\.md$/, '')
      )
        .limit(1)
        .fetch()
        .then(
          (page) => {
            session.artistPages[index] = page[0]
          },
          () => {
            session.artistPages[index] = null
          }
        )
      promises.push(promise2)
    })
  })
  return Promise.all(promises).then(() => {
    const flatTracklist = []
    episode.sessions.forEach((session) => {
      session.refs.forEach((ref, index) => {
        const track = {
          position: timeToSeconds(session.cue[index]),
          episodeArtwork: `https://firebase.soulectiontracklists.com/cdn/image/${episode.artwork}`,
          episodeTitle: episode.title,
          sessionTitle: session.title || session.name,
        }
        const [artist, title] = session.tracks[index].split(' - ')
        track.artist = artist
        track.title = title
        if (session.artistPages[index]) {
          track.artist = session.artistPages[index].title
        }
        if (session.trackPages[index]) {
          track.title = session.trackPages[index].title
          track.artwork = `https://firebase.soulectiontracklists.com/cdn/image/${session.trackPages[index].artwork}`
        }
        flatTracklist.push(track)
      })
    })
    return flatTracklist
  })
}

export function useFormattedSummary({ $i18n }, sessions) {
  const options = {
    tracks: sessions.reduce((sum, session) => {
      return sum + session.tracks.length
    }, 0),
    sessions: sessions.length,
    hasInterview: sessions.some((session) =>
      (session.name || '').includes('Interview')
    ),
  }
  let key = 'episode.soloSession'
  if (options.sessions > 1) {
    key = 'episode.multiSession'
  }
  if (options.hasInterview) {
    key = key + 'WithInterview'
  }
  return $i18n.t(key, options)
}
