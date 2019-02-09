import React,{Component} from 'react';
import Layout from '../../components/Layout';
import Compaign from '../../ethereum/compaign';
import { Card,Grid,Button } from 'semantic-ui-react';
import ContributeForm from '../../components/contributeForm';
import web3 from '../../ethereum/web3';
import {Link} from '../../routes';
class CompaignShow extends Component{
  static async getInitialProps(props){
    //console.log(props.query.address);
    const compaign = Compaign(props.query.address);
    const summary = await compaign.methods.getSummary().call();
    return{
      address:props.query.address,
      minimumContribute:summary[0],
      balance:summary[1],
      requestcount:summary[2],
      approvalCount:summary[3],
      manager:summary[4]
    };
  }
  renderCards(){
    const{
      address,
      minimumContribute,
      balance,
      requestcount,
      approvalCount,
      manager
    }=this.props;
    const items = [
      {
        header:manager,
        meta:'管理者地址',
        description:'当前管理者创建了众筹列表，并且是众筹的受益人',
        style:{overflowWrap:'break-word'}
      },
      {
        header:minimumContribute,
        meta:'最小贡献量',
        description:'如果你想对此众筹投资，你就需要至少大于当前的金额',
        style:{overflowWrap:'break-word'}
      },
      {
        header:requestcount,
        meta:'请求数量',
        description:'当前的管理者创建请求从合约中提钱，必须要大于50%的投资人同意',
        style:{overflowWrap:'break-word'}
      },
      {
        header:approvalCount,
        meta:'投资人的数量',
        description:'参与当前众筹投资的投资人数量',
        style:{overflowWrap:'break-word'}
      },
      {
        header:web3.utils.fromWei(balance,'ether'),
        meta:'当前众筹总金额(ether)',
        description:'当前众筹中，还剩下多少的金额',
        style:{overflowWrap:'break-word'}
      }
    ];
    return <Card.Group items={items}/>
  }

  render(){
    const summary = this.props.summary;
    const{
      address,
      minimumContribute,
      balance,
      requestcount,
      approvalCount,
      manager
    }=this.props;
    return (
      <Layout>
        <h1>众筹显示</h1>
          <Grid>
            <Grid.Row>
              <Grid.Column width={10}>
                {this.renderCards()}
              </Grid.Column>
              <Grid.Column width={6}>
                <ContributeForm address={this.props.address}/>
              </Grid.Column>
           </Grid.Row>
           <Grid.Row>
            <Grid.Column>
              <Link route={`/compaigns/${this.props.address}/requests`}>
                <a>
                  <Button primary>查看请求</Button>
                </a>
              </Link>
           </Grid.Column>
          </Grid.Row>
          </Grid>
      </Layout>
    );
  }
}
export default CompaignShow;
