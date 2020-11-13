export function timeToSeconds(string) {
  return (string || '00:00:00')
    .split(':')
    .map((v) => parseInt(v))
    .reduce((acc, time) => 60 * acc + time, 0)
}
