export function filterDataByUniqueCurrency(data) {
    const currencyCounts = {}; 
    const filteredData = [];
  
    for (const item of data) {
      if (item.currency) { 
        const currencies = item.currency.split(","); 
        let hasUniqueCurrency = false;
        for (const currency of currencies) {
          if (!currencyCounts[currency]) {
            hasUniqueCurrency = true;
            currencyCounts[currency] = true; 
          }
        }
          if (hasUniqueCurrency) {
          filteredData.push(item);
        }
      }
    }
  
    return filteredData;
  }