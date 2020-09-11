import puppeteer from 'puppeteer'
const USER_AGENT =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3'

export default async function (soundcloudPermalink) {
  if (!soundcloudPermalink) {
    return new Error('no soundcloud link')
  }
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setCacheEnabled(false)
  await page.setUserAgent(USER_AGENT)
  const promise = new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error('timeout'))
    }, 5000)
    page.on('response', async (response) => {
      const url = await response.url()
      if (url.startsWith('https://api-mobi.soundcloud.com/resolve')) {
        const parsedUrl = new URL(url)
        const clientId = parsedUrl.searchParams.get('client_id')
        const data = await response.json()
        // await browser.close()

        clearTimeout(timeout)
        const responseData = Object.assign({}, data, {
          client_id: clientId,
        })
        resolve(responseData)
      }
    })
  })
  await page.goto(soundcloudPermalink, {
    waitUntil: 'networkidle2',
  })
  return promise.then(async (data) => {
    await browser.close()
    return data
  })

  // return await data
}
