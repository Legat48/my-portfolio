export default function filterCountries (countries, oldFilter) {
  if (oldFilter) {
    const filter = oldFilter.trim().toLowerCase()
    return countries.filter((country) => {
      const { name, nameRus, children, childrenInCustom } = country
      const isMatch = name.toLowerCase().includes(filter) || nameRus.toLowerCase().includes(filter)

      if (isMatch) {
        return true
      }

      if (children && children.length) {
        // Фильтрация дочерних элементов, чтобы сохранить дочерние элементы,
        // которые проходят фильтр, даже если родительский элемент не проходит
        country.children = filterCountries(children, filter)
        return country.children.length > 0
      }

      if (childrenInCustom && childrenInCustom.length) {
        // Фильтрация элементов в childrenInCustom, чтобы сохранить дочерние элементы,
        // которые проходят фильтр, даже если Northern America Others не проходит
        country.childrenInCustom = filterCountries(childrenInCustom, filter)
        return country.childrenInCustom.length > 0
      }

      return false
    })
  } else {
    return false
  }
}
