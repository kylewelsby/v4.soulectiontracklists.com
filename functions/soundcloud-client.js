const puppeteer = require('puppeteer')
// const USER_AGENT = 'Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3'
const USER_AGENT = `Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.1 Mobile/15E148 Safari/604.1`

module.exports.soundcloud = async function (soundcloudPermalink) {
  if (!soundcloudPermalink) {
    return new Error('no soundcloud link')
  }
  console.debug('Launching Browser')
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--disable-gpu',
      // '--disable-dev-shm-usage',
      // '--disable-setuid-sandbox',
      '--no-first-run',
      '--no-sandbox',
      // '--no-zygote',
      // '--single-process',
      // "--proxy-server='direct://'",
      // '--proxy-bypass-list=*',
      '--deterministic-fetch',
    ],
  })
  const context = await browser.createIncognitoBrowserContext()
  const page = await context.newPage()
  await page.setCacheEnabled(false)
  await page.setUserAgent(USER_AGENT)
  const promise = new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error('timeout'))
    }, 5000)
    console.debug('Waiting for XHR')
    page.on('response', async (response) => {
      const url = await response.url()
      if (url.startsWith('https://api-mobi.soundcloud.com/resolve')) {
        console.debug('Found XHR')
        const parsedUrl = new URL(url)
        const clientId = parsedUrl.searchParams.get('client_id')
        const data = await response.json()

        clearTimeout(timeout)
        const responseData = Object.assign({}, data, {
          client_id: clientId,
        })
        resolve(responseData)
      }
    })
  })
  console.debug('Loading Page')
  await page.goto(soundcloudPermalink, {
    waitUntil: 'networkidle2',
  })
  return promise.then(async (data) => {
    await browser.close()
    return data
  })
}
