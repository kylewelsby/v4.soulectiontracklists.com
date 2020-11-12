const functions = require('firebase-functions')
const admin = require('firebase-admin')
const axios = require('axios')
admin.initializeApp()
const SOUNDCLOUD_CLIENT_ID = 'iZIs9mchVcX5lhVRyQGGAYlNPVldzAoX'

module.exports.onSoundCloud = functions
  .runWith({
    timeoutSeconds: 540,
    memory: '2GB',
  })
  .https.onRequest(async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    res.setHeader('Content-Type', 'application/json')
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`)
    if (!parsedUrl.searchParams.has('permalink')) {
      res.status = 400
      res.send({ success: false }).end()
      return
    }
    res.status = 200

    const permalink = parsedUrl.searchParams.get('permalink')
    const soundcloudResponse = await axios.get(
      'https://api-mobi.soundcloud.com/resolve',
      {
        params: {
          client_id: SOUNDCLOUD_CLIENT_ID,
          permalink_url: permalink,
          format: 'json',
        },
      }
    )
    const data = soundcloudResponse.data
    data.client_id = SOUNDCLOUD_CLIENT_ID

    const transcoding = data.media.transcodings.find((t) => {
      return t.url.endsWith('/progressive')
    })
    await axios
      .get(transcoding.url, {
        params: {
          client_id: SOUNDCLOUD_CLIENT_ID,
        },
      })
      .then((res) => {
        data.streamUrl = res.data.url
      })
    res.send(JSON.stringify(data)).end()
  })
