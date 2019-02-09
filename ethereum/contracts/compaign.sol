pragma solidity ^0.4.24;


contract CompaignFactory{
  address[] public deployedCompaign;//所有已经部署的智能合约项目
  function createCompaign(uint mininum)public{
    address newCompaign = new Compaign(mininum,msg.sender);
    deployedCompaign.push(newCompaign);
  }
  function getDeployedCompaign() public view returns(address[]){
    return deployedCompaign;
  }
}

contract Compaign{
  //结构体
  struct Request{
    string description;//描述
    uint value;//申请总金额
    address recipients;//受益人地址
    bool compelte;//项目是否完成
    uint approvalCount;//同意项目捐献总人数
    mapping(address=>bool) approvers;//投资人是否投票
  }


  Request[] public requests;//存储请求
  address public manager;//管理者地址
  uint public minimumContribute;//最小的贡献量
  mapping(address=>bool) public approvers;//投资人是否投资
  uint public approversCount;//投资人数量

  modifier restricted{
    require(msg.sender == manager);
    _;
  }

  //构造函数
  constructor(uint minimum,address _address) public{
    manager = _address;
    minimumContribute = minimum;
  }
  /*投资人投资*/
  function contribute() public payable{
    require(msg.value>minimumContribute);
    approvers[msg.sender] = true;
    approversCount++;
  }
  /*管理者创建一个请求*/
  function createRequest(string _description,uint _value,address _recipients) public restricted{
    Request memory newRequest = Request({
        description:_description,
        value:_value,
        recipients:_recipients,
        compelte:false,
        approvalCount:0
      });
      requests.push(newRequest);
  }
  /*投资人是否支持请求*/
  function approvalRequest(uint index) public{
    Request storage request= requests[index];
    require(approvers[msg.sender]);
    require(!request.approvers[msg.sender]);
    request.approvers[msg.sender] = true;
    request.approvalCount++;
  }
    /*是否进行转账判断*/
  function finalizeRequest(uint index) public restricted payable{
      Request storage request= requests[index];
      require(request.approvalCount > approversCount/2);
      request.recipients.transfer(request.value);//转账操作
      request.compelte = true;
  }

  function getSummary() public view returns(uint,uint,uint,uint,address){
    return (minimumContribute,address(this).balance,requests.length,approversCount,manager);
  }

  function getRequestCount() public view returns(uint){
    return requests.length;
  }










}
