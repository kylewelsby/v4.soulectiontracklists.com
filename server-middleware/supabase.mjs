import cookieParser from 'cookie-parser'
import express from 'express'
import { createClient } from '@supabase/supabase-js'

const app = express()

const URL = process.env.SUPABASE_URL
const KEY = process.env.SUPABASE_KEY

const supabase = createClient(URL, KEY)

app.use(express.json())
app.use(cookieParser())

app.post('/auth', async (req, res) => {
  try {
    await supabase.auth.api.setAuthCookie(req, res)
  } catch (error) {
    if (error.message === 'Auth event missing!') {
      res.status(422).send('Auth event missing!')
      return
    }
    // eslint-disable-next-line no-console
    console.error('Error: ', error)
    res.status(500).send('Failed to get user')
  }
})

app.get('/user', async (req, res) => {
  try {
    const user = await supabase.auth.api.getUserByCookie(req)
    res.json(user)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error: ', error)
    res.status(500).send('Failed to get user')
  }
})

app.all('*', (req, res) => {
  console.log(req)
  res.status(418).send("I'm a teapot")
})

export default app
