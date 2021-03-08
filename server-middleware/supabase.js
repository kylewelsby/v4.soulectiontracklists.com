import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import express from 'express'
import { createClient } from '@supabase/supabase-js'

const app = express()

const URL = process.env.SUPABASE_URL
const KEY = process.env.SUPABASE_KEY

const supabase = createClient(URL, KEY)

app.use(bodyParser.json())
app.use(cookieParser())

app.post('/auth', async (req, res) => {
  await supabase.auth.api.setAuthCookie(req, res)
})

app.get('/user', async (req, res) => {
  try {
    const user = await supabase.auth.api.getUserByCookie(req)
    res.json(user)
  } catch (error) {
    console.error('Error: ', error)
    res.status(500).send('Failed to get user')
  }
})

module.exports = app
