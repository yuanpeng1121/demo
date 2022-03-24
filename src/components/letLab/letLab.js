import React from 'react';
import { 
  Table,Select,Alert , Menu, Breadcrumb,List,Space,Modal,Input,Form,Button,Upload, message
} from 'antd';
import './letLab.scss';
const { Option } = Select;
const { Column, ColumnGroup } = Table;
import store from "../../store";
import { clickMenu } from "../../store/actionCreators"; 
import logo from '../../assets/img/Logo.png'
import {
  PlusOutlined,
  LoadingOutlined, 
} from '@ant-design/icons';

class LeftLab extends React.Component {

  constructor(props) {
      super(props);
      this.state ={
        isModalVisible:false,
        ltdList:store.getState().ltdList,//
      }
      store.subscribe(this.storeChange.bind(this))
  }
  // static getDerivedStateFromProps(props, state) {
  //   return {
  //     leftList: props.leftList 
  //   };
  // }
  storeChange() {
    this.setState(store.getState());
  }
  componentWillUnmount() {
    this.setState = ()=>false;
}
  onHandleClick = (e) => {
    const action=clickMenu(this.state.ltdList[e.key])
    store.dispatch(action)
  };
  render(){
    return (
      <React.Fragment> 
        <div className="leftList">
          <Menu  theme="light" defaultSelectedKeys={['0']} mode="inline" onClick={this.onHandleClick}>
          {
              this.state.ltdList.map((item,index) => (
              <Menu.Item
                key={index}
              >
                <div className="identity">
                  <img src={item.icon} />
                  <span>{item.name}</span>
                </div>
              </Menu.Item>
            ))
          }
          </Menu>
      </div>
      </React.Fragment>
    )
  }
}

export default LeftLab;