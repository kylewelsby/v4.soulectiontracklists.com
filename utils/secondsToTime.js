const padZero = (num, size) => {
  let s = String(num)
  while (s.length < size) {
    s = `0${s}`
  }
  return s
}

export default (num) => {
  const hours = padZero(Math.floor(num / 3600), 1)
  const minutes = padZero(Math.floor((num % 3600) / 60), 2)
  const seconds = padZero((Math.round(num) % 3600) % 60, 2)
  return `${hours}:${minutes}:${seconds}`
}
