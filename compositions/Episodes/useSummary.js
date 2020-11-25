export default function useSummary({ $i18n }, sessions = []) {
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
