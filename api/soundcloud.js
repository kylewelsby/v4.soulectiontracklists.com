/* eslint-disable */
import crypto from 'crypto'

import soundcloud from '../api/soundcloud-client-id.js'
import { readFileSync, existsSync, writeFileSync } from 'fs'
import path from 'path'
import axios from 'axios'
export default async function (req, res, _next) {
  console.log('parsing', req.url)
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`)
  if (!parsedUrl.searchParams.has('permalink')) {
    res.status = 400
    res.end()
    return
  }
  const permalink = parsedUrl.searchParams.get('permalink')
  res.status = 200
  console.log(req.headers['user-agent'])

  try {
    const filename = crypto.createHash('md5').update(permalink).digest('hex')
    const filepath = path.join(__dirname, `../__fixtures__/${filename}.json`)
    res.setHeader('Content-Type', 'application/json')
    let data = {}
    if (existsSync(filepath)) {
      // local cache
      console.log('localcache')
      data = readFileSync(filepath)
    } else {
      console.log('fetched file')
      data = await soundcloud(permalink)
      console.log(data.media.transcodings)
      // data.streamUrl = `${data.uri}/stream?client_id=${data.client_id}`
      let transcoding = data.media.transcodings.find((t) => {
        console.log(t)
        return t.preset === 'mp3_0_0' && t.url.endsWith('progressive')
      })
      console.log(transcoding.url)
      await axios.get(transcoding.url, {
        params: {
          client_id: data.client_id
        },
        headers: {
          'User-Agent': null,//req.headers['User-Agent']
        }
      }).then(res => {
        console.log(res.data.url)
        data.streamUrl = res.data.url
      })
      data = JSON.stringify(data)
      writeFileSync(filepath, data, 'utf-8')
    }
    res.end(data)
  } catch (err) {
    res.status = 500
    console.error(err)
    res.end('error')
  }
}
