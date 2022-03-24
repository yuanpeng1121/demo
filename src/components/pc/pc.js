import React from 'react';
// 图片本地引入 使用es6模块化思想 默认导入 
// 引入子组件
import Members from '../members/members';
import LetLab from '../letLab/letLab';
import AddO from '../addO/addO';
import HeaderTablet from '../headerTablet/headerTablet';
import HeaderDesktop from '../headerDesktop/headerDesktop';
import store from "../../store";
import {clickMenu} from "../../store/actionCreators"; 
import './pc.scss';
import { Layout, Menu,Input} from 'antd';
const { Search } = Input;
import { AudioOutlined } from '@ant-design/icons';
import {
  PlusOutlined,
} from '@ant-design/icons';


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


class Pc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo:store.getState().userInfo,
      isModalVisible:false, 
      collapsed: false,
      loading: false,//上传图片的loading
      imageUrl:'',//上传图片的地址
      // detailedData:store.getState().detailedData,
      newName:'',
      ltdList: store.getState().ltdList,
    };
    store.subscribe(this.storeChange.bind(this))
  }
  componentWillUnmount() { 
    this.setState = ()=>false;
  }
  storeChange() {
    this.setState(store.getState());
  }
  componentDidMount(){
  }
  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  // 新增组织---开始
  showModal = () => {
    this.setState({
      isModalVisible:true
    })
  };
  // 清空新增弹窗
  clearModal=()=>{
    this.setState({
      newName:'',
      imageUrl:''
    })
  }
  handleCancel = (res) =>{
    this.setState({
      isModalVisible:res
    })
  }
  onSearch = value => console.log(value);
  render() {
    let headerBox=null
    if (store.getState().isDevice=='Desktop') {
      headerBox = <HeaderDesktop />;
    } else if(store.getState().isDevice=='Tablet') {
      headerBox = <HeaderTablet/>;
    }
    return (
      <div className="pc">
        {/* 新增组织弹窗 开始 */}
        <AddO isModalVisible={this.state.isModalVisible}     receiveAddClose={this.handleCancel}></AddO>
        {/* 新增组织弹窗 开始 */}
        <Layout style={{ minHeight: '100vh' }}>
            <Header className="topHeader">
              {headerBox} 
            </Header>
          <Layout >
            <Sider  collapsed={this.state.collapsed} onCollapse={this.onCollapse}
            >
              <div className="identity">
                <img src={this.state.userInfo.icon} />
                <span>{this.state.userInfo.name}</span>
              </div>
              {/* 左侧tab 开始 */}
              <Search placeholder="input search text" onSearch={this.onSearch} style={{ 
                    width: 180,
                    margin:10
                }} />
              
              <LetLab></LetLab>
              {/* 左侧tab 结束 */}
              {/* 左侧新增组织 开始 */}
              <div className="addLtd" onClick={this.showModal}>
                <PlusOutlined/>
                <span>Create new organization</span>
              </div>
              {/* 左侧新增组织 开始 */}
            </Sider>
              <Content>
                {/* 右侧table 开始 */}
                <Members></Members>
                {/* <Members detailedData={this.state.detailedData}></Members> */}

                 {/* 右侧table 结束 */}
              </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}
export default Pc;
