/**
 * @jest-environment node
 */
import nock from 'nock'
import {
  useSoundcloud,
  useFlatTracklist,
  useFormattedSummary,
} from '../pages/episodes/episode.js'

describe('useSoundcloud', () => {
  beforeEach(() => {
    nock('https://api-mobi.soundcloud.com')
      .get('/resolve')
      .query({
        permalink_url:
          'https://soundcloud.com/soulection/soulection-radio-show-478',
        client_id: 'iZIs9mchVcX5lhVRyQGGAYlNPVldzAoX',
      })
      .replyWithFile(200, `${__dirname}/__fixtures__/soundcloud-resolve.json`)
  })
  test('returns soundcloud data', async () => {
    const soundcloud = await useSoundcloud(
      'https://soundcloud.com/soulection/soulection-radio-show-478'
    )
    expect(soundcloud).toMatchSnapshot()
  })
})

describe('useFlatTracklist', () => {
  test('returns flatterned tracklist', async () => {
    nock.recorder.rec()
    const tracklist = await useFlatTracklist(
      {
        $content: jest.fn((path, slug) => {
          let res = jest.fn().mockResolvedValue({
            title: 'Bad',
            artwork: 'images/michael-jackson/tracks/bad.jpg',
          })
          if (path === 'artists') {
            res = jest.fn().mockResolvedValue([
              {
                title: 'Michael Jackson',
              },
            ])
          }
          return {
            limit: jest.fn().mockReturnThis(),
            fetch: res,
          }
        }),
      },
      {
        artwork: 'images/episodes/478.jpg',
        title: 'Show #478',
        sessions: [
          {
            name: "Joe Kay's Set",
            tracks: ['before - after'],
            refs: ['artists/afta-1/tracks/tvttoo-001-sit-still.md'],
            cue: ['00:03:00'],
          },
        ],
      }
    )
    expect(tracklist).toMatchSnapshot()
  })
})

describe('useFormattedSummary', () => {
  test('does thing', () => {
    const $t = jest.fn().mockImplementation((key, options) => {
      if (key === 'episode.soloSession') {
        return `${options.tracks} tracks`
      } else if (key === 'episode.soloSessionWithInterview') {
        return `${options.tracks} tracks with Interview`
      } else if (key === 'episode.multiSession') {
        return `${options.tracks} tracks across ${options.sessions} sets`
      } else if (key === 'episode.multiSessionWithInterview') {
        return `${options.tracks} tracks across ${options.sessions} sets with Interview`
      } else {
        throw new Error(`unhandled tag ${key}`)
      }
    })
    const soloSummary = useFormattedSummary({ $t }, [
      {
        name: "Joe Kay's Set",
        tracks: ['hello - world'],
      },
    ])
    expect(soloSummary).toMatchSnapshot()

    const multiSessionWithInterview = useFormattedSummary({ $t }, [
      {
        name: "Joe Kay's Set",
        tracks: ['hello - world'],
      },
      {
        name: 'Interview with Set',
        tracks: ['hello - world'],
      },
    ])
    expect(multiSessionWithInterview).toMatchSnapshot()

    const soloSessionWithInterview = useFormattedSummary({ $t }, [
      {
        name: 'Interview with Set',
        tracks: ['hello - world'],
      },
    ])
    expect(soloSessionWithInterview).toMatchSnapshot()

    const multiSession = useFormattedSummary({ $t }, [
      {
        name: '1 Set',
        tracks: ['hello - world'],
      },
      {
        name: '2 Set',
        tracks: ['hello - world'],
      },
    ])
    expect(multiSession).toMatchSnapshot()
  })
})
