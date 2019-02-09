import Web3 from 'web3';
var web3;
if(typeof window != 'undefined' && window.web3 !='undefined'){
   web3 = new Web3(window.web3.currentProvider);
}else{
  const provider = new Web3.providers.HttpProvider(
    'https://ropsten.infura.io/v3/abf106df064d47299d4f0a42574dc4db'
  );
  web3 = new Web3(provider);
}
export default web3;
