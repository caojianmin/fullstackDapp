import React ,{Component} from 'react';
import factory from '../ethereum/factory.js';
import Layout from '../components/Layout.js';
import { Card,Button } from 'semantic-ui-react';
import {Link} from '../routes';
//export default ()=>{
//  return <h1>hello index</h1>
//}
class Compaindex extends Component{
  static async getInitialProps(){
    const compaign = await factory.methods.getDeployedCompaign().call();
    return {compaign};
  }
//  async componentDidMount(){
//    const compaign = factory.methods.getDeployedCompaign().call();
//    console.log(compaign);
//  }
  renderCompaign(){
    const items = this.props.compaign.map(address=>{
      return {
        header:address,
        description:<Link route={`/compaigns/${address}`}><a>查看众筹</a></Link>,
        fluid:true
      }
    });
    return <Card.Group items={items} />;
  }
  render(){
    return (
      <Layout>
      <div>
      <h3>众筹列表</h3>
      <Link route="/compaigns/new">
      <a>
        <Button floated='right' content='创建众筹' icon='add' labelPosition='left' primary/>
      </a>
      </Link>
        {this.renderCompaign()}
      </div>
      </Layout>
    );
    }
}
export default Compaindex;
