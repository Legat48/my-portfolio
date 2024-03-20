export default (value) => {
  const keyTypeValue = [
    'Company_Common_Name',
    'local_name',
    'Country_of_Headquarters',
    'Issuer_Ticker',
    'gicsIndustryName',
    'gicsSectorName',
    'gicsSectorNameRus',
    'gicsSubIndustryName',
    'gicsSubIndustryNameRus',
    'ISIN'
  ]
  return !!keyTypeValue.find(e => e === value)
}
