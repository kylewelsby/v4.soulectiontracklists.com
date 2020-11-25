import data from 'iso3166-2-db/i18n/dispute/UN/en.json'

export default function useLocationByISOCode(code = '') {
  const [iso1, iso2] = code.split('-')
  const country = data[iso1]
  let region = null
  if (iso2) {
    region = country.regions.find((region) => region.iso === iso2)
  }
  if (region) {
    return `${region.name}, ${country.name}`
  } else {
    return country.name
  }
}
