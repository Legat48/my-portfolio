import filterCountries from './filterCountries'
export default (arr, oldFilter) => {
  const newArr = []
  const addCountries = (country) => {
    newArr.push(country)
    if (country.children && country.children.length) {
      for (const children of country.children) {
        addCountries(children)
      }
    }
  }
  arr.forEach((e) => {
    addCountries(e)
  })
  if (oldFilter) {
    return filterCountries(newArr, oldFilter)
  }
  return newArr
}
