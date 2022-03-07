import { SalesByPaymentMethod, SalesByStore } from "./types";

export const buildSalesbyStoreChart =  (sales: SalesByStore[]) => {
   const labels = sales.map(sale => sale.storeName);
   const series = sales.map(sale => sale.sum);

   return {
      labels: labels,
      series: series
   }
}

export const buildSalesbyPaymentMethod =  (sales: SalesByPaymentMethod[]) => {
   const labels = sales.map(sale => sale.description);
   const series = sales.map(sale => sale.sum);

   return {
      labels: labels,
      series: series
   }
}
