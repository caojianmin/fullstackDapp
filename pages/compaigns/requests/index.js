import React,{Component} from 'react';
import {Link} from '../../../routes';
import { Button,Table } from 'semantic-ui-react';
import Layout from '../../../components/Layout';
import Compaign from '../../../ethereum/compaign';
import RequestRow from '../../../components/RequestRow';



class CompaignRequest extends Component{
  static async getInitialProps(props){
    const {address} = props.query;
    const compaign = Compaign(address);
    const requestCount = await compaign.methods.getRequestCount().call();
    const approversCount = await compaign.methods.approversCount().call();
    const requests = await Promise.all(
      Array(parseInt(requestCount)).fill().map((element,index)=>{
        return compaign.methods.requests(index).call();
      })
    )


    return {address,requests,approversCount};
  }



  renderRow(){
    return this.props.requests.map((request,index)=>{
      return (
        <RequestRow
        key={index}
        id={index}
        request={request}
        address={this.props.address}
        approversCount={this.props.approversCount}
        ></RequestRow>
      );
    });
  }


  render(){
    //console.log(this.props.requests);
    const {HeaderCell,Row,Header} = Table;
    return (
      <Layout>
      <h1>
        请求列表
      </h1>
      <Link route={`/compaigns/${this.props.address}/requests/new`}>
        <Button primary>增加请求</Button>
      </Link>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>描述</Table.HeaderCell>
            <Table.HeaderCell>总的金额</Table.HeaderCell>
            <Table.HeaderCell>受益人地址</Table.HeaderCell>
            <Table.HeaderCell>同意人的数量</Table.HeaderCell>
            <Table.HeaderCell>是否同意</Table.HeaderCell>
            <Table.HeaderCell>是否完成</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          { this.renderRow() }
        </Table.Body>
      </Table>

      </Layout>
    );
  }
}
export default CompaignRequest;
