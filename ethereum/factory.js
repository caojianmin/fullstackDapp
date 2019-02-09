import web3 from './web3';
import CompaignFactory from './build/CompaignFactory.json';
const instance = new web3.eth.Contract(
  JSON.parse(CompaignFactory.interface),
  '0xcBAe3a6D690FB07Fc53697813576508C7EB97F5f'
);
export default instance;
