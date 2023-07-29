export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  seatsUrl:
    'https://my.laphil.com/en/rest-proxy/TXN/Packages/{eventId}/Seats?constituentId=0&modeOfSaleId=26&packageId={eventId}',
  pricesUrl:
    'https://my.laphil.com/en/rest-proxy/TXN/Packages/{eventId}/Prices?expandPerformancePriceType=&includeOnlyBasePrice=&modeOfSaleId=26&priceTypeId=&sourceId=30885',
  sectionsUrl:
    'https://my.laphil.com/en/rest-proxy/ReferenceData/Sections?seatMapId=12',
});
