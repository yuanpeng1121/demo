import React from 'react';
import { 
  Menu, Dropdown
} from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import './headerTablet.scss';
import store from "../../store";
const menu = (
  <Menu>
    <Menu.Item key='1'>
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item key='2'>
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item key='3'>
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item
      </a>
    </Menu.Item>
  </Menu>
);

class HeaderTablet extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
          
        }
        store.subscribe(this.storeChange.bind(this))
    }
    storeChange() {
      this.setState(store.getState());
    }
    componentWillUnmount() {
      this.setState = ()=>false;
  }
  render(){
    return (
      <React.Fragment>
          <div className="left">dataReachable</div>
          <div className="right">
            <i>YL</i>
            <Dropdown overlay={menu}  placement="bottomLeft">
                <p style={{marginTop:14}}><MenuOutlined style={{color:'#FD6B0B'}} /></p>
            </Dropdown>
          </div>
      </React.Fragment>
    )
  }
}

export default HeaderTablet;