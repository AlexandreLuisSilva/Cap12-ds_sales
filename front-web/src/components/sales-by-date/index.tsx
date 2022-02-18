import './styles.css';
import ReactApexChart from 'react-apexcharts';
import { chartOptions } from './helpers';
import { initialData } from './initialData';

function SalesByDate() {
   return (
      <div className="sales-by-date-container base-card">
         <div>
            <h4 className="sales-by-date-title">Evolução das vendas</h4>
            <span className="sales-by-date-period">01/01/17 a 31/01/17</span>
         </div>
         <div className="sales-by-date-data">
            <div className="sales-by-date-quantity-container">
               <h2 className="sales-by-date-quantity">444.000,98</h2>
               <span className="sales-by-date-quantity-label">Vendas no período</span>
               <span className="sales-by-date-quantity-description">
                  O gráfico mostra as vendas em todas as lojas
               </span>
            </div>
            <div className="sales-by-date-chart">
               <ReactApexChart
                  options={chartOptions}
                  series={[{ name: 'Vendas', data: initialData }]}
                  type="bar"
                  height={240}
                  width="100%"
               />
            </div>
         </div>
      </div>
   );
}

export default SalesByDate;
