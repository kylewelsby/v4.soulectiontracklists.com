export function absoulteUrlForPath(path, ctx) {
  try {
    const url = new URL(ctx.$config.baseURL || window.location.origin)
    const route = ctx.$router.resolve(path).route
    if (route) {
      url.pathname = route.fullPath
    }
    return url.href
  } catch (err) {
    ctx.$sentry.captureException(err)
  }
}
