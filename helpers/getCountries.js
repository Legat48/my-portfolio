export default function getCountries (countries, filter) {
  if (filter) {
    const normalizedFilter = filter.toLowerCase()
    let foundCountry = null

    for (const country of countries) {
      const { name, nameRus, children } = country
      const isMatch = name.toLowerCase() === normalizedFilter || nameRus.toLowerCase() === normalizedFilter

      if (isMatch) {
        foundCountry = country
        break
      }

      if (children && children.length) {
        const filteredCountry = getCountries(children, filter)

        if (filteredCountry) {
          foundCountry = filteredCountry
          break
        }
      }
    }

    return foundCountry
  }

  return null
}
