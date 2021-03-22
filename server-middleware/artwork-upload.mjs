import express from 'express'
import cookieParser from 'cookie-parser'
import { Storage } from '@google-cloud/storage'
import Busboy from 'busboy'
import { createClient } from '@supabase/supabase-js'
import * as Sentry from '@sentry/node'
import config from '../nuxt.config'

Sentry.init(config.sentry)

const storage = new Storage()

const URL = process.env.SUPABASE_URL
const KEY = process.env.SUPABASE_KEY

const supabase = createClient(URL, KEY)
const bucket = storage.bucket('soulection-tracklists')

const middleware = {
  async requireAuth(req, res, next) {
    const resp = await supabase.auth.api.getUserByCookie(req)
    if (!resp.user) {
      return res.status(403).end()
    }
    next()
  },
  fileUpload(req, res, next) {
    const busboy = new Busboy({
      headers: req.headers,
      limits: {
        fileSize: 10 * 1024 * 1024,
      },
    })

    const uploadedFiles = []
    busboy.on('field', function (fieldname, val) {
      req.body[fieldname] = val
    })
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      const bucketFile = bucket.file(`__test__/${filename}`)
      const stream = bucketFile.createWriteStream({
        metadata: {
          contentType: mimetype,
        },
      })
      file.pipe(stream)
      const promise = new Promise((resolve, reject) => {
        file.on('end', () => stream.end())
        stream.on('finish', () => {
          resolve(bucketFile.name)
        })
        stream.on('error', reject)
      })
      uploadedFiles.push(promise)
    })
    busboy.on('finish', () => {
      Promise.all(uploadedFiles)
        .then((ids) => {
          res.status(201).send(ids[0])
        })
        .catch((err) => {
          req.status(500)
        })
    })
    req.pipe(busboy)
  },
}

const app = express()

app.use(cookieParser())

app.post('/', [express.json(), middleware.requireAuth, middleware.fileUpload])
app.delete('/', [express.text(), middleware.requireAuth], (req, res) => {
  const file = bucket.file(req.body)
  if (file.exists() && req.body.length > 0) {
    file.delete()
    res.status(204).end()
  } else {
    res.status(400).end()
  }
})
export default app
