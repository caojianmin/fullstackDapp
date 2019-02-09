import React,{Component} from 'react';
import Layout from '../../components/Layout.js';
import { Form,Button,Input,Message } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import factory from '../../ethereum/factory';
import {Router} from '../../routes';

class CompaignNew extends Component{
  state={
    minimum:'',
    errorMessage:'',
    loading:''
  };
  onSubmit = async()=>{
    this.setState({errorMessage:''});
    this.setState({loading:true});
    try{
      event.preventDefault();
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createCompaign(this.state.minimum).send({from:accounts[0]});
      Router.pushRoute('/');
    }catch(err){
      this.setState({errorMessage:err.message});
    }
    this.setState({loading:false});
  }

  render(){
    return(
      <Layout>
        <h3>创建你的众筹项目</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <lable>请输入最小的贡献量</lable>
            <Input label='wei' labelPosition='right'
            value={this.state.minimum}
            onChange={event=>this.setState({minimum:event.target.value})}
            />
          </Form.Field>
          <Message error header="错误!" content={this.state.errorMessage}/>
          <Button loading={this.state.loading} primary>创建众筹</Button>
        </Form>
      </Layout>
    );
  }
}
export default CompaignNew;
