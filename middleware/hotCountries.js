export default async function ({ store }) {
  await store.dispatch('countries/fetchHotCountries')
}
