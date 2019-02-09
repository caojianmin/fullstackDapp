const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compileFactory = require('../ethereum/build/CompaignFactory.json');
const compileComoaign = require('../ethereum/build/Compaign.json');


var accounts;
var factory;
var compainAddress;
var compaign;

//初始化
beforeEach(async()=>{
  //获取账号信息
  accounts = await web3.eth.getAccounts();
  //构建合约工厂实例
  factory = await new web3.eth.Contract(JSON.parse(compileFactory.interface)).deploy({data:'0x'+compileFactory.bytecode})
  .send({from:accounts[0],gas:'1000000'});
  await factory.methods.createCompaign('100').send({from:accounts[0],gas:'1000000'});
  [compainAddress] = await factory.methods.getDeployedCompaign().call();
  //构建合约实例
  compaign = await new web3.eth.Contract(JSON.parse(compileComoaign.interface),compainAddress);
})


describe('compaign',()=>{
  it('deploy a factory and compaign',()=>{
    assert.ok(factory.options.address);
    assert.ok(compaign.options.address);
  })

  it('manager address',async()=>{
    const manager = await compaign.methods.manager().call();
    assert(manager,accounts[0]);
  })

  it('allow people to contribute',async()=>{
    await compaign.methods.contribute().send({
      from:accounts[1],
      value:'200'
    });
    //不消耗gas的静态函数后面必须加call函数
    const isContribute = await compaign.methods.approvers(accounts[1]).call();
    assert(isContribute);
  })


  it('require a minimum contribute',async()=>{
    try{
      await compaign.methods.contribute().send({
        from:accounts[1],
        value:'5'
      });
      const isContribute = await compaign.methods.approvers(accounts[1]).call();
      assert(isContribute);
    }catch(err){
      assert(err);
    }
  })

  it('allows a manager to make request',async()=>{
    await compaign.methods.createRequest('buy a cat','100',accounts[1]).send({
      from:accounts[0],
      gas:'1000000'
    });
    const request = await compaign.methods.requests(0).call();
    assert.equal('buy a cat',request.description);
  })








})
