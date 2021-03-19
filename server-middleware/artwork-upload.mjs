import express from 'express'
const app = express()

const URL = process.env.SUPABASE_URL
const KEY = process.env.SUPABASE_KEY

const supabase = createClient(URL, KEY)

app.use(express.json())

app.post('/', async (req, res) => {
  const { user } = await supabase.auth.api.getUserByCookie(req)
  if (!user) {
    res.status(403).end()
  }
})
