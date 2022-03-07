import { useEffect, useMemo, useState } from 'react';
import Filter from './components/filter';
import Header from './components/header';
import PieChartCard from './components/pie-chart-card';
import SalesByDate from './components/sales-by-date';
import SalesSummary from './components/sales-summary';
import SalesTable from './components/sales-table';
import { FilterData, SalesByStore, PieChartConfig, SalesByPaymentMethod } from './types';

import './App.css';
import { buildFilterParams, makeRequest } from './utils/request';
import { buildSalesbyPaymentMethod, buildSalesbyStoreChart } from './helpers';

function App() {

   const [filterData, setFilterData] = useState<FilterData>();
   const params = useMemo(() => buildFilterParams(filterData), [filterData]);
   const [salesByStore, setSalesByStore] = useState<PieChartConfig>();
   const [salesByPaymentMethod, setSalesByPaymentMethod] = useState<PieChartConfig>();

   const onFilterChange = (filter: FilterData) => {
      setFilterData(filter);
   }

   useEffect(() => {
      makeRequest
         .get<SalesByStore[]>('/sales/by-store', { params })
         .then((response) => {
            const newSalesByStore = buildSalesbyStoreChart(response.data);
            setSalesByStore(newSalesByStore);
         })
         .catch(() => {
            console.error('Error to fetch sales by store');
         });
   }, [params]);

   useEffect(() => {
      makeRequest
         .get<SalesByPaymentMethod[]>('/sales/by-payment-method', { params })
         .then((response) => {
            const newSalesPaymentMethod = buildSalesbyPaymentMethod(response.data);
            setSalesByPaymentMethod(newSalesPaymentMethod);
         })
         .catch(() => {
            console.error('Error to fetch payment method');
         });
   }, [params]);

   return (
      <>
         <Header />
         <div className="app-container">
            <Filter onFilterChange={onFilterChange}/>
            <SalesByDate filterData={ filterData }/>
            <div className="sales-overview-container">
               <SalesSummary filterData={filterData}/>
               <PieChartCard
                  name="Lojas"
                  labels={salesByStore?.labels}
                  series={salesByStore?.series}
               />
               <PieChartCard
                  name="Pagamento"
                  labels={salesByPaymentMethod?.labels}
                  series={salesByPaymentMethod?.series}
               />
            </div>
            <SalesTable filterData={ filterData }/>
         </div>
      </>
   );
}

export default App;
