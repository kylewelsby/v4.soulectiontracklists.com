/**
 * Plugin that provides $staticData() for reading JSON from static/data/.
 * During generate (server-side): reads from filesystem.
 * During client-side navigation: fetches via HTTP.
 */
export default (context, inject) => {
  const fetchData = async (filePath) => {
    if (process.server) {
      // Dynamic require to avoid webpack bundling fs for client
      const fs = eval('require')('fs')
      const path = eval('require')('path')
      const fullPath = path.resolve(process.cwd(), 'static', filePath)
      return JSON.parse(fs.readFileSync(fullPath, 'utf-8'))
    }
    const resp = await fetch(`/${filePath}`)
    if (!resp.ok) {
      throw new Error(`Failed to fetch ${filePath}: ${resp.status}`)
    }
    return resp.json()
  }
  inject('staticData', fetchData)
}
